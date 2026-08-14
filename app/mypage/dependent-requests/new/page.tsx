import Link from "next/link";
import path from "path";
import { randomUUID } from "crypto";
import { mkdir, writeFile } from "fs/promises";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { logAudit } from "@/lib/audit-log";
import { encryptMyNumber } from "@/lib/mynumber";

const MAX_FILE_SIZE = 10 * 1024 * 1024;

const ALLOWED_MIME_TYPES = new Set([
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/webp",
]);

type AttachmentInput = {
  fileName: string;
  filePath: string;
  fileType: string;
  fileSize: number;
};

async function saveAttachmentFile(file: File): Promise<AttachmentInput> {
  if (file.size > MAX_FILE_SIZE) {
    throw new Error("ファイルサイズは10MB以下にしてください。");
  }

  if (!ALLOWED_MIME_TYPES.has(file.type)) {
    throw new Error("対応していないファイル形式です。");
  }

  const uploadDir = path.join(
    process.cwd(),
    "public",
    "uploads",
    "dependent-requests",
  );

  await mkdir(uploadDir, {
    recursive: true,
  });

  const ext = path.extname(file.name).toLowerCase();
  const storedFileName = `${randomUUID()}${ext}`;
  const fullPath = path.join(uploadDir, storedFileName);

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  await writeFile(fullPath, buffer);

  return {
    fileName: file.name,
    filePath: `/uploads/dependent-requests/${storedFileName}`,
    fileType: file.type,
    fileSize: file.size,
  };
}


async function getCurrentEmployee() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const employee = await prisma.employee.findUnique({
    where: {
      userId: session.user.id,
    },
    include: {
      department: true,
    },
  });

  if (!employee) {
    redirect("/mypage");
  }

  return {
    session,
    employee,
  };
}

export default async function NewDependentRequestPage() {
  const { employee } = await getCurrentEmployee();

  async function createDependentRequest(formData: FormData) {
    "use server";

    const { session, employee: currentEmployee } =
      await getCurrentEmployee();

    const name = String(formData.get("name") ?? "").trim();
    const nameKana = String(formData.get("nameKana") ?? "").trim();
    const relationship = String(
      formData.get("relationship") ?? "",
    ).trim();
    const birthDate = String(
      formData.get("birthDate") ?? "",
    ).trim();
    const annualIncomeRaw = String(
      formData.get("annualIncome") ?? "",
    ).trim();
    const myNumberRaw = String(
      formData.get("myNumber") ?? "",
    ).trim();
    const note = String(formData.get("note") ?? "").trim();

    const cohabiting = formData.get("cohabiting") === "on";
    const healthInsuranceDependent =
      formData.get("healthInsuranceDependent") === "on";

    if (!name || !relationship) {
      throw new Error("氏名と続柄は必須です。");
    }

    const normalizedMyNumber = myNumberRaw.replace(/\D/g, "");

    if (normalizedMyNumber && normalizedMyNumber.length !== 12) {
      throw new Error("マイナンバーは12桁で入力してください。");
    }

    const files = formData
      .getAll("attachments")
      .filter(
        (file): file is File =>
          file instanceof File && file.size > 0,
      );

    const attachments: AttachmentInput[] = [];

    if (files.length === 0) {
      throw new Error("添付資料を1件以上登録してください。");
    }

    for (const file of files) {
      const attachment = await saveAttachmentFile(file);
      attachments.push(attachment);
    }

    const request = await prisma.dependentRequest.create({
      data: {
        employeeId: currentEmployee.id,
        name,
        nameKana: nameKana || null,
        relationship,
        birthDate: birthDate ? new Date(birthDate) : null,
        annualIncome: annualIncomeRaw
          ? Number(annualIncomeRaw)
          : null,
        cohabiting,
        healthInsuranceDependent,
        encryptedMyNumber: normalizedMyNumber
          ? encryptMyNumber(normalizedMyNumber)
          : null,
        note: note || null,
        status: "PENDING",
        attachments:
          attachments.length > 0
            ? {
                create: attachments,
              }
            : undefined,
      },
    });

    await logAudit({
      userId: session.user.id,
      userName: session.user.name,
      action: "DEPENDENT_REQUEST_CREATED",
      targetType: "DependentRequest",
      targetId: request.id,
      description: `${currentEmployee.employeeNo} の扶養家族申請を作成`,
      afterData: {
        employeeId: currentEmployee.id,
        requestId: request.id,
        name,
        relationship,
        hasMyNumber: Boolean(normalizedMyNumber),
        attachmentCount: attachments.length,
      },
    });

    revalidatePath("/");
    revalidatePath("/mypage");
    redirect("/mypage");
  }

  return (
    <main className="mx-auto max-w-4xl p-8">
      <div className="mb-6">
        <Link
          href="/mypage"
          className="text-sm text-blue-600 hover:underline"
        >
          ← マイページへ戻る
        </Link>
      </div>

      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          扶養家族追加申請
        </h1>

        <p className="mt-2 text-sm text-gray-600">
          {employee.lastName} {employee.firstName} さんの扶養家族追加申請を作成します。
        </p>
      </div>

      <form action={createDependentRequest} className="space-y-6">
        <section className="rounded-lg border bg-white p-6 shadow-sm">
          <h2 className="mb-4 border-b pb-2 text-lg font-semibold text-gray-800">
            基本情報
          </h2>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                氏名 <span className="text-red-500">*</span>
              </label>
              <input
                name="name"
                required
                className="w-full rounded border p-2"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                ふりがな
              </label>
              <input
                name="nameKana"
                className="w-full rounded border p-2"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                続柄 <span className="text-red-500">*</span>
              </label>
              <input
                name="relationship"
                required
                placeholder="配偶者、長男、長女など"
                className="w-full rounded border p-2"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                生年月日
              </label>
              <input
                type="date"
                name="birthDate"
                className="w-full rounded border p-2"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                年間収入 (円)
              </label>
              <input
                type="number"
                name="annualIncome"
                min="0"
                className="w-full rounded border p-2"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                個人番号（マイナンバー）
              </label>
              <input
                name="myNumber"
                inputMode="numeric"
                maxLength={12}
                placeholder="12桁の半角数字"
                className="w-full rounded border p-2"
              />
              <p className="mt-1 text-xs text-gray-500">
                入力された番号は暗号化して申請されます。
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-lg border bg-white p-6 shadow-sm">
          <h2 className="mb-4 border-b pb-2 text-lg font-semibold text-gray-800">
            扶養・健保情報
          </h2>

          <div className="space-y-3">
            <label className="flex items-center gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                name="cohabiting"
                defaultChecked
                className="rounded border-gray-300"
              />
              同居している
            </label>

            <label className="flex items-center gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                name="healthInsuranceDependent"
                defaultChecked
                className="rounded border-gray-300"
              />
              健康保険の扶養対象
            </label>
          </div>
        </section>

        <section className="rounded-lg border bg-white p-6 shadow-sm">
          <h2 className="mb-4 border-b pb-2 text-lg font-semibold text-gray-800">
            添付資料
          </h2>

          <input
            type="file"
            name="attachments"
            multiple
            accept=".pdf,image/jpeg,image/png,image/webp"
            className="w-full rounded border p-2"
          />

          <p className="mt-2 text-xs text-gray-500">
            住民票、課税証明書、所得証明書、在学証明書などを添付できます。PDF、JPEG、PNG、WebPに対応しています。1ファイル10MBまでです。
          </p>
        </section>

        <section className="rounded-lg border bg-white p-6 shadow-sm">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            備考
          </label>
          <textarea
            name="note"
            className="h-24 w-full rounded border p-2"
          />
        </section>

        <div className="flex justify-end gap-3">
          <Link
            href="/mypage"
            className="rounded border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            キャンセル
          </Link>

          <button
            type="submit"
            className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            申請する
          </button>
        </div>
      </form>
    </main>
  );
}
