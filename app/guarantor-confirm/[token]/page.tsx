import { revalidatePath } from "next/cache";
import { notFound, redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";

const PLEDGE_ITEMS = [
  "就業規則、諸規程および関係法令を遵守し、職務を誠実に遂行します。",
  "法人の信用を損なう行為、不名誉となる行為を行いません。",
  "規則違反時は、規則に基づく処分に異議を申し立てません。",
  "反社会的勢力の構成員または関係者ではなく、今後も関係を持ちません。",
  "業務上知り得た個人情報および秘密を、退職後も保持します。",
  "防災連絡網への個人電話番号掲載を許可し、他職員の電話番号を第三者へ漏らしません。",
  "身元保証人は、本人が法令・就業規則・諸規程を遵守することを保証します。",
  "身元保証人は、本人が故意または重大な過失により法人へ損害を与えた場合、本人と連携して責任を負います。",
];

type Props = {
  params: Promise<{
    token: string;
  }>;
  searchParams: Promise<{
    confirmed?: string;
    error?: string;
  }>;
};

async function confirmGuarantor(formData: FormData) {
  "use server";

  const token = String(formData.get("token") ?? "").trim();
  const confirmerName = String(
    formData.get("confirmerName") ?? "",
  ).trim();
  const agreed = formData.get("agreed") === "on";

  const pledge = await prisma.employeePledge.findUnique({
    where: {
      guarantorToken: token,
    },
  });

  if (!pledge) {
    notFound();
  }

  if (pledge.status === "GUARANTOR_CONFIRMED") {
    redirect(`/guarantor-confirm/${token}?confirmed=1`);
  }

  if (
    pledge.status !== "GUARANTOR_PENDING" ||
    !pledge.guarantorTokenExpiresAt ||
    pledge.guarantorTokenExpiresAt < new Date()
  ) {
    redirect(`/guarantor-confirm/${token}?error=expired`);
  }

  const expectedName = (pledge.guarantorName ?? "")
    .replace(/[  ]/g, "");

  const actualName = confirmerName.replace(/[  ]/g, "");

  if (!agreed || !actualName || actualName !== expectedName) {
    redirect(`/guarantor-confirm/${token}?error=confirmation`);
  }

  await prisma.employeePledge.update({
    where: {
      id: pledge.id,
    },
    data: {
      status: "GUARANTOR_CONFIRMED",
      guarantorConfirmedAt: new Date(),
      guarantorToken: null,
      guarantorTokenExpiresAt: null,
    },
  });

  revalidatePath("/pledges");
  revalidatePath("/mypage/pledge");

  redirect(`/guarantor-confirm/${token}?confirmed=1`);
}

export default async function GuarantorConfirmPage({
  params,
  searchParams,
}: Props) {
  const { token } = await params;
  const query = await searchParams;

  if (query.confirmed === "1") {
    return (
      <main className="mx-auto max-w-3xl p-8">
        <section className="rounded-lg border bg-white p-8 text-center shadow-sm">
          <h1 className="text-2xl font-bold text-green-700">
            身元保証人の確認が完了しました
          </h1>
          <p className="mt-3 text-gray-600">
            ご確認ありがとうございました。
            この画面は閉じていただけます。
          </p>
        </section>
      </main>
    );
  }

  const pledge = await prisma.employeePledge.findUnique({
    where: {
      guarantorToken: token,
    },
    include: {
      employee: {
        select: {
          employeeNo: true,
          lastName: true,
          firstName: true,
        },
      },
    },
  });

  if (!pledge) {
    notFound();
  }

  const expired =
    !pledge.guarantorTokenExpiresAt ||
    pledge.guarantorTokenExpiresAt < new Date();

  return (
    <main className="mx-auto max-w-3xl p-8">
      <h1 className="text-3xl font-bold">
        身元保証人確認
      </h1>

      <p className="mt-2 text-sm text-gray-600">
        誓約内容をご確認のうえ、身元保証人として確認してください。
      </p>

      {expired && (
        <div className="mt-6 rounded border border-red-200 bg-red-50 p-4 text-red-700">
          この確認URLは有効期限切れです。
          本人または人事担当へご連絡ください。
        </div>
      )}

      {query.error === "confirmation" && (
        <div className="mt-6 rounded border border-red-200 bg-red-50 p-4 text-red-700">
          氏名と同意内容を確認してください。
        </div>
      )}

      <section className="mt-6 rounded-lg border bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold">対象者</h2>

        <dl className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <dt className="text-sm text-gray-500">氏名</dt>
            <dd className="mt-1 font-medium">
              {pledge.employee.lastName}{" "}
              {pledge.employee.firstName}
            </dd>
          </div>

          <div>
            <dt className="text-sm text-gray-500">職員番号</dt>
            <dd className="mt-1">
              {pledge.employee.employeeNo}
            </dd>
          </div>
        </dl>
      </section>

      <section className="mt-6 rounded-lg border bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold">誓約内容</h2>

        <ol className="mt-4 list-decimal space-y-3 pl-6 text-sm leading-7 text-gray-700">
          {PLEDGE_ITEMS.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      </section>

      {!expired && (
        <form action={confirmGuarantor} className="mt-6 space-y-4 rounded-lg border bg-white p-6 shadow-sm">
          <input type="hidden" name="token" value={token} />

          <div>
            <label className="mb-1 block text-sm font-medium">
              身元保証人氏名
            </label>
            <input
              name="confirmerName"
              required
              defaultValue={pledge.guarantorName ?? ""}
              className="w-full rounded border px-3 py-2"
            />
          </div>

          <label className="flex items-start gap-2 text-sm">
            <input
              type="checkbox"
              name="agreed"
              required
              className="mt-1"
            />
            <span>
              上記の誓約内容を確認し、身元保証人として同意します。
            </span>
          </label>

          <button
            type="submit"
            className="rounded bg-blue-600 px-5 py-2 font-medium text-white hover:bg-blue-700"
          >
            確認する
          </button>
        </form>
      )}
    </main>
  );
}
