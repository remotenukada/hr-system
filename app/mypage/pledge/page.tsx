import Link from "next/link";
import { createHash, randomUUID } from "crypto";
import { mkdir, writeFile } from "fs/promises";
import path from "path";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { sendSystemMailSafely } from "@/lib/mail";

const SAVE_DIR = "/data/hr-system/pledges";
const MAX_FILE_SIZE = 10 * 1024 * 1024;

const ALLOWED_TYPES = new Set([
  "application/pdf",
  "image/jpeg",
  "image/png",
]);

const PLEDGE_VERSION = "2026-09-28";

const PLEDGE_TEXT = `私は、法人の公共的使命を十分に理解し、次の事項を誓約します。

1. 就業規則、諸規程および関係法令を遵守し、職務を誠実に遂行します。
2. 法人の信用を損なう行為、不名誉となる行為を行いません。
3. 規則違反時は、規則に基づく処分に異議を申し立てません。
4. 反社会的勢力の構成員または関係者ではなく、今後も関係を持ちません。
5. 業務上知り得た個人情報および秘密を、退職後も保持します。
6. 防災連絡網への個人電話番号掲載を許可し、他職員の電話番号を第三者へ漏らしません。
7. 身元保証人は、本人が法令・就業規則・諸規程を遵守することを保証します。
8. 身元保証人は、本人が故意または重大な過失により法人へ損害を与えた場合、本人と連帯して責任を負います。`;

async function getEmployee() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const employee = await prisma.employee.findUnique({
    where: {
      userId: session.user.id,
    },
  });

  if (!employee) {
    redirect("/");
  }

  return employee;
}

async function signElectronically(formData: FormData) {
  "use server";

  const employee = await getEmployee();

  const signerName = String(
    formData.get("signerName") ?? "",
  ).trim();

  const guarantorName = String(
    formData.get("guarantorName") ?? "",
  ).trim();

  const guarantorEmail = String(
    formData.get("guarantorEmail") ?? "",
  ).trim();

  const agreed = formData.get("agreed") === "on";

  if (!guarantorName || !guarantorEmail) {
    redirect("/mypage/pledge?error=guarantor");
  }

  const expectedName =
    `${employee.lastName} ${employee.firstName}`.trim();

  const normalizedSignerName =
    signerName.replace(/[ 　]/g, "");

  const normalizedExpectedName =
    expectedName.replace(/[ 　]/g, "");

  if (
    !agreed ||
    normalizedSignerName !== normalizedExpectedName
  ) {
    redirect("/mypage/pledge?error=signature");
  }

  const signedAt = new Date();
  const guarantorToken = randomUUID();
  const guarantorTokenExpiresAt = new Date();
  guarantorTokenExpiresAt.setDate(
    guarantorTokenExpiresAt.getDate() + 14,
  );
  const requestHeaders = await headers();

  const forwardedFor =
    requestHeaders.get("x-forwarded-for") ?? "";

  const ipAddress =
    forwardedFor.split(",")[0]?.trim() ||
    requestHeaders.get("x-real-ip") ||
    null;

  const documentHash = createHash("sha256")
    .update(
      [
        PLEDGE_VERSION,
        PLEDGE_TEXT,
        employee.id,
        signerName,
        signedAt.toISOString(),
      ].join("\n"),
    )
    .digest("hex");

  const pledge = await prisma.employeePledge.create({
    data: {
      employeeId: employee.id,
      submissionMethod: "ELECTRONIC",
      status: "GUARANTOR_PENDING",
      templateVersion: PLEDGE_VERSION,
      documentHash,
      employeeSignerName: signerName,
      employeeSignedAt: signedAt,
      employeeSignedIp: ipAddress,
      guarantorName,
      guarantorEmail,
      guarantorToken,
      guarantorTokenExpiresAt,
    },
  });

  const appUrl = (
    process.env.NEXT_PUBLIC_APP_URL ??
    "http://localhost:3000"
  ).replace(/\/$/, "");

  const confirmationUrl =
    `${appUrl}/guarantor-confirm/${guarantorToken}`;

  await sendSystemMailSafely({
    to: guarantorEmail,
    subject: "【FY Nexus One】身元保証人確認のお願い",
    text: `${guarantorName} 様

${employee.lastName}${employee.firstName}さんの誓約書について、
身元保証人としての確認をお願いいたします。

下記URLから内容をご確認ください。

${confirmationUrl}

このURLの有効期限は14日間です。
第三者へ共有しないでください。

FY Nexus One`,
  });

  revalidatePath(`/guarantor-confirm/${pledge.guarantorToken}`);
  revalidatePath("/mypage/pledge");
  redirect("/mypage/pledge?saved=electronic");
}

async function uploadPaperPledge(formData: FormData) {
  "use server";

  const employee = await getEmployee();
  const file = formData.get("file");

  if (!(file instanceof File) || file.size === 0) {
    redirect("/mypage/pledge?error=file");
  }

  if (
    !ALLOWED_TYPES.has(file.type) ||
    file.size > MAX_FILE_SIZE
  ) {
    redirect("/mypage/pledge?error=file");
  }

  const extension =
    file.type === "application/pdf"
      ? ".pdf"
      : file.type === "image/png"
        ? ".png"
        : ".jpg";

  const storedName = `${randomUUID()}${extension}`;
  const absolutePath = path.join(SAVE_DIR, storedName);

  await mkdir(SAVE_DIR, {
    recursive: true,
  });

  const bytes = Buffer.from(await file.arrayBuffer());

  await writeFile(absolutePath, bytes, {
    flag: "wx",
  });

  const documentHash = createHash("sha256")
    .update(bytes)
    .digest("hex");

  await prisma.employeePledge.create({
    data: {
      employeeId: employee.id,
      submissionMethod: "PAPER",
      status: "PAPER_UPLOADED",
      templateVersion: PLEDGE_VERSION,
      documentHash,
      fileName: file.name,
      filePath: absolutePath,
      fileType: file.type,
      fileSize: file.size,
    },
  });

  revalidatePath("/mypage/pledge");
  redirect("/mypage/pledge?saved=paper");
}

async function updateGuarantorInfo(
  formData: FormData,
) {
  "use server";

  const employee = await getEmployee();

  const guarantorName = String(
    formData.get("guarantorName") ?? "",
  ).trim();

  const guarantorEmail = String(
    formData.get("guarantorEmail") ?? "",
  ).trim();

  if (!guarantorName || !guarantorEmail) {
    redirect("/mypage/pledge?error=guarantor");
  }

  const pledge =
    await prisma.employeePledge.findFirst({
      where: {
        employeeId: employee.id,
        status: "GUARANTOR_PENDING",
      },
      orderBy: {
        createdAt: "desc",
      },
    });

  if (!pledge) {
    redirect("/mypage/pledge");
  }

  const guarantorToken = randomUUID();

  const guarantorTokenExpiresAt =
    new Date();

  guarantorTokenExpiresAt.setDate(
    guarantorTokenExpiresAt.getDate() + 14,
  );

  await prisma.employeePledge.update({
    where: { id: pledge.id },
    data: {
      guarantorName,
      guarantorEmail,
      guarantorToken,
      guarantorTokenExpiresAt,
    },
  });

  const appUrl = (
    process.env.NEXT_PUBLIC_APP_URL ??
    "http://localhost:3000"
  ).replace(/\/$/, "");

  const confirmationUrl =
    `${appUrl}/guarantor-confirm/${guarantorToken}`;

  await sendSystemMailSafely({
    to: guarantorEmail,
    subject: "【FY Nexus One】身元保証人確認のお願い",
    text: `${guarantorName} 様

保証人確認情報が更新されました。

${confirmationUrl}

有効期限は14日間です。`,
  });

  revalidatePath("/mypage/pledge");

  redirect(
    "/mypage/pledge?saved=guarantor"
  );
}


function getPledgeStatusLabel(status: string) {
  switch (status) {
    case "DRAFT":
      return "未提出";
    case "GUARANTOR_PENDING":
      return "身元保証人確認待ち";
    case "GUARANTOR_CONFIRMED":
      return "身元保証人確認済";
    case "COMPLETED":
      return "手続完了";
    case "REJECTED":
      return "差戻し";
    default:
      return status;
  }
}

export default async function PledgePage({
  searchParams,
}: {
  searchParams: Promise<{
    saved?: string;
    error?: string;
  }>;
}) {
  const employee = await getEmployee();
  const query = await searchParams;

  const latest = await prisma.employeePledge.findFirst({
    where: {
      employeeId: employee.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const fullName =
    `${employee.lastName} ${employee.firstName}`.trim();

  return (
    <main className="mx-auto max-w-4xl p-8">
      <h1 className="text-3xl font-bold text-gray-900">
        誓約書
      </h1>

      <p className="mt-2 text-sm text-gray-600">
        電子署名または署名済み紙書類のアップロードを選択できます。
      </p>

            <div className="mt-4 flex flex-wrap gap-3">
        <a
          href="/api/pledges/pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700"
        >
          PDFを出力する
        </a>
        <Link
          href="/"
          className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
        >
          ダッシュボードへ戻る
        </Link>
      </div>

      {query.saved && (
        <div className="mt-5 rounded border border-green-200 bg-green-50 p-3 text-sm text-green-700">
          誓約書を受け付けました。
        </div>
      )}

      {query.error && (
        <div className="mt-5 rounded border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          入力内容またはファイルを確認してください。
        </div>
      )}

      {latest && (
        <section className="mt-6 rounded-lg border bg-white p-5 shadow-sm">
          <h2 className="font-semibold text-gray-900">現在の提出状況</h2>

          <dl className="mt-3 grid gap-3 text-sm md:grid-cols-2">
            <div>
              <dt className="text-gray-500">提出方法</dt>
              <dd className="font-medium text-gray-900">
                {latest.submissionMethod === "ELECTRONIC"
                  ? "電子署名"
                  : "紙署名アップロード"}
              </dd>
            </div>

            <div>
              <dt className="text-gray-500">状態</dt>
              <dd className="font-medium text-gray-900">{getPledgeStatusLabel(latest.status)}</dd>
            </div>
          </dl>
        </section>
      )}

      {latest?.status === "GUARANTOR_PENDING" && (
        <section className="mt-6 rounded-lg border border-blue-200 bg-blue-50 p-5 shadow-sm">
          <h2 className="font-semibold text-gray-900">
            身元保証人情報の修正・メール再送
          </h2>

          <p className="mt-2 text-sm text-gray-600">
            身元保証人の氏名またはメールアドレスに誤りがある場合、
            修正して確認メールを再送できます。
          </p>

          <form action={updateGuarantorInfo} className="mt-4 space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                身元保証人 氏名
              </label>
              <input
                type="text"
                name="guarantorName"
                required
                defaultValue={latest.guarantorName ?? ""}
                className="w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                身元保証人 メールアドレス
              </label>
              <input
                type="email"
                name="guarantorEmail"
                required
                defaultValue={latest.guarantorEmail ?? ""}
                className="w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
              />
              <p className="mt-1 text-xs text-gray-500">
                更新すると、現在の確認URLは無効になり、新しいURLを送信します。
              </p>
            </div>

            <button
              type="submit"
              className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              保証人情報を更新して確認メールを再送
            </button>
          </form>
        </section>
      )}

      <section className="mt-8 rounded-lg border bg-white p-6 shadow-sm">
        <h2 className="text-lg font-bold text-gray-900">誓約内容</h2>
        <div className="mt-4 whitespace-pre-line rounded bg-gray-50 p-4 text-sm text-gray-700 leading-relaxed border">
          {PLEDGE_TEXT}
        </div>
      </section>

      {(!latest || latest.status === "REJECTED") && (
      <div className="mt-8 grid gap-8 md:grid-cols-2">
        {/* 電子署名フォーム */}
        <section className="rounded-lg border bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900">方法1: 電子署名</h2>
          <form action={signElectronically} className="mt-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                署名（本人氏名）
              </label>
              <p className="text-xs text-gray-500 mb-1">
                「{fullName}」と正確に入力してください
              </p>
              <input
                type="text"
                name="signerName"
                required
                className="w-full rounded border border-gray-300 p-2 text-sm focus:border-blue-500 focus:outline-none"
                placeholder={fullName}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                身元保証人 氏名
              </label>
              <input
                type="text"
                name="guarantorName"
                className="w-full rounded border border-gray-300 p-2 text-sm focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                身元保証人 メールアドレス
              </label>
              <p className="mb-1 text-xs text-gray-500">
                保証人確認メールの送信にのみ使用し、帳票には表示しません。
              </p>
              <input
                type="email"
                name="guarantorEmail"
                className="w-full rounded border border-gray-300 p-2 text-sm focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div className="flex items-start space-x-2 pt-2">
              <input
                type="checkbox"
                id="agreed"
                name="agreed"
                required
                className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="agreed" className="text-xs text-gray-700">
                上記誓約事項を確認し、同意したうえで電子署名を行います。
              </label>
            </div>

            <button
              type="submit"
              className="w-full rounded bg-blue-600 py-2.5 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              電子署名して提出
            </button>
          </form>
        </section>

        {/* 紙書類アップロードフォーム */}
        <section className="rounded-lg border bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900">方法2: 紙で提出（画像/PDF）</h2>
          <form action={uploadPaperPledge} className="mt-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                署名済み書類の添付ファイル
              </label>
              <p className="text-xs text-gray-500 mb-2">
                PDF / JPEG / PNG（最大 10MB）
              </p>
              <input
                type="file"
                name="file"
                accept="application/pdf,image/jpeg,image/png"
                required
                className="w-full text-sm text-gray-500 file:mr-4 file:rounded file:border-0 file:bg-gray-100 file:px-4 file:py-2 file:text-sm file:font-medium hover:file:bg-gray-200"
              />
            </div>

            <div className="pt-8">
              <button
                type="submit"
                className="w-full rounded bg-gray-800 py-2.5 text-sm font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                ファイルをアップロードして提出
              </button>
            </div>
          </form>
        </section>
      </div>
      )}
    </main>
  );
}
