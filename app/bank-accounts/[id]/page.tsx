import BackLink from "@/components/BackLink";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { requireHRManager } from "@/lib/auth-guard";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

function getStatusLabel(status: string) {
  if (status === "APPROVED") {
    return "確認済";
  }

  if (status === "REJECTED") {
    return "差戻し";
  }

  return "未確認";
}

function getStatusClass(status: string) {
  if (status === "APPROVED") {
    return "bg-green-100 text-green-800";
  }

  if (status === "REJECTED") {
    return "bg-red-100 text-red-800";
  }

  return "bg-yellow-100 text-yellow-800";
}

export default async function BankAccountDetailPage({ params }: Props) {
  await requireHRManager();

  const cookieStore = await cookies();
  const facilityScope = cookieStore.get("facilityScope")?.value ?? "ALL";

  const { id } = await params;

  const bankAccount = await prisma.employeeBankAccount.findUnique({
    where: {
      id,
    },
    include: {
      employee: {
        include: {
          facility: true,
          department: true,
        },
      },
      attachments: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!bankAccount) {
    redirect("/bank-accounts");
  }

  if (
    facilityScope !== "ALL" &&
    bankAccount.employee.facilityId !== facilityScope
  ) {
    notFound();
  }

  async function approveBankAccount(formData: FormData) {
    "use server";

    const session = await requireHRManager();

    const bankAccountId = String(formData.get("bankAccountId") ?? "").trim();

    if (!bankAccountId) {
      return;
    }

    const actionCookieStore = await cookies();
    const actionFacilityScope =
      actionCookieStore.get("facilityScope")?.value ?? "ALL";

    const targetBankAccount = await prisma.employeeBankAccount.findUnique({
      where: {
        id: bankAccountId,
      },
      include: {
        employee: true,
      },
    });

    if (!targetBankAccount) {
      notFound();
    }

    if (
      actionFacilityScope !== "ALL" &&
      targetBankAccount.employee.facilityId !== actionFacilityScope
    ) {
      notFound();
    }

    await prisma.employeeBankAccount.update({
      where: {
        id: bankAccountId,
      },
      data: {
        status: "APPROVED",
        verifiedAt: new Date(),
        verifiedBy: session.user.id,
        reviewComment: null,
      },
    });

    revalidatePath("/bank-accounts");
    revalidatePath(`/bank-accounts/${bankAccountId}`);
    revalidatePath("/");
  }

  async function rejectBankAccount(formData: FormData) {
    "use server";

    await requireHRManager();

    const bankAccountId = String(formData.get("bankAccountId") ?? "").trim();

    const reviewComment = String(formData.get("reviewComment") ?? "").trim();

    if (!bankAccountId || !reviewComment) {
      return;
    }

    const actionCookieStore = await cookies();
    const actionFacilityScope =
      actionCookieStore.get("facilityScope")?.value ?? "ALL";

    const targetBankAccount = await prisma.employeeBankAccount.findUnique({
      where: {
        id: bankAccountId,
      },
      include: {
        employee: true,
      },
    });

    if (!targetBankAccount) {
      notFound();
    }

    if (
      actionFacilityScope !== "ALL" &&
      targetBankAccount.employee.facilityId !== actionFacilityScope
    ) {
      notFound();
    }

    await prisma.employeeBankAccount.update({
      where: {
        id: bankAccountId,
      },
      data: {
        status: "REJECTED",
        verifiedAt: null,
        verifiedBy: null,
        reviewComment,
      },
    });

    revalidatePath("/bank-accounts");
    revalidatePath(`/bank-accounts/${bankAccountId}`);
    revalidatePath("/");
  }

  const maskedAccountNumber =
    "*".repeat(Math.max(bankAccount.accountNumber.length - 4, 0)) +
    bankAccount.accountNumber.slice(-4);

  return (
    <main className="mx-auto max-w-5xl p-8">
      <BackLink href="/bank-accounts" label="口座情報一覧へ戻る" />

      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold">口座情報詳細</h1>

          <p className="mt-2 text-sm text-gray-600">
            社員の口座情報と確認書類を確認できます。
          </p>
        </div>

        <span
          className={`rounded px-3 py-1 text-sm font-medium ${getStatusClass(
            bankAccount.status,
          )}`}
        >
          {getStatusLabel(bankAccount.status)}
        </span>

        {bankAccount.verifiedAt && (
          <div className="text-right text-sm text-gray-600">
            <div>確認者: {bankAccount.verifiedBy ?? "-"}</div>

            <div>
              確認日時: {bankAccount.verifiedAt.toLocaleString("ja-JP")}
            </div>
          </div>
        )}
      </div>

      <section className="rounded-lg border bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold">社員情報</h2>

        <dl className="grid grid-cols-1 gap-4 text-sm md:grid-cols-2">
          <div>
            <dt className="font-medium text-gray-600">社員番号</dt>
            <dd className="mt-1">{bankAccount.employee.employeeNo}</dd>
          </div>

          <div>
            <dt className="font-medium text-gray-600">氏名</dt>
            <dd className="mt-1">
              {bankAccount.employee.lastName} {bankAccount.employee.firstName}
            </dd>
          </div>

          <div>
            <dt className="font-medium text-gray-600">施設</dt>
            <dd className="mt-1">
              {bankAccount.employee.facility?.name ?? "-"}
            </dd>
          </div>

          <div>
            <dt className="font-medium text-gray-600">部署</dt>
            <dd className="mt-1">
              {bankAccount.employee.department?.name ?? "-"}
            </dd>
          </div>

          <div>
            <dt className="font-medium text-gray-600">メール</dt>
            <dd className="mt-1">{bankAccount.employee.email}</dd>
          </div>
        </dl>
      </section>

      <section className="mt-6 rounded-lg border bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold">口座情報</h2>

        <dl className="grid grid-cols-1 gap-4 text-sm md:grid-cols-2">
          <div>
            <dt className="font-medium text-gray-600">銀行種別</dt>
            <dd className="mt-1">
              {bankAccount.bankType === "YUCHO" ? "ゆうちょ銀行" : "一般銀行"}
            </dd>
          </div>

          <div>
            <dt className="font-medium text-gray-600">金融機関名</dt>
            <dd className="mt-1">{bankAccount.bankName}</dd>
          </div>

          <div>
            <dt className="font-medium text-gray-600">支店名</dt>
            <dd className="mt-1">{bankAccount.branchName}</dd>
          </div>

          <div>
            <dt className="font-medium text-gray-600">口座種別</dt>
            <dd className="mt-1">{bankAccount.accountType}</dd>
          </div>

          <div>
            <dt className="font-medium text-gray-600">口座番号</dt>
            <dd className="mt-1">{maskedAccountNumber}</dd>
          </div>

          <div>
            <dt className="font-medium text-gray-600">口座名義</dt>
            <dd className="mt-1">{bankAccount.accountHolder}</dd>
          </div>

          {bankAccount.bankType === "YUCHO" && (
            <>
              <div>
                <dt className="font-medium text-gray-600">ゆうちょ記号</dt>
                <dd className="mt-1">{bankAccount.yuchoSymbol ?? "-"}</dd>
              </div>

              <div>
                <dt className="font-medium text-gray-600">ゆうちょ番号</dt>
                <dd className="mt-1">{bankAccount.yuchoNumber ?? "-"}</dd>
              </div>
            </>
          )}
        </dl>
      </section>

      <section className="mt-6 rounded-lg border bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold">確認書類</h2>

        {bankAccount.attachments.length === 0 ? (
          <p className="text-sm text-gray-500">添付書類はありません。</p>
        ) : (
          <ul className="space-y-2 text-sm">
            {bankAccount.attachments.map((attachment) => (
              <li key={attachment.id} className="rounded border p-3">
                <a
                  href={attachment.filePath}
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium text-blue-600 hover:underline"
                >
                  {attachment.fileName}
                </a>

                <div className="mt-1 text-xs text-gray-500">
                  {attachment.createdAt.toLocaleDateString("ja-JP")}
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      {bankAccount.reviewComment && (
        <section className="mt-6 rounded-lg border border-red-200 bg-red-50 p-6">
          <h2 className="mb-2 text-lg font-semibold text-red-700">
            差戻しコメント
          </h2>

          <p className="text-sm text-red-700">{bankAccount.reviewComment}</p>
        </section>
      )}

      <section className="mt-6 rounded-lg border bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold">確認操作</h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <form action={approveBankAccount} className="flex flex-col gap-2">
            <input type="hidden" name="bankAccountId" value={bankAccount.id} />

            <button
              type="submit"
              className="rounded bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
            >
              確認済にする
            </button>
          </form>

          <form action={rejectBankAccount} className="flex flex-col gap-2">
            <input type="hidden" name="bankAccountId" value={bankAccount.id} />

            <textarea
              name="reviewComment"
              placeholder="差戻し理由を入力してください"
              className="h-24 w-full rounded border px-3 py-2 text-sm"
              required
            />

            <button
              type="submit"
              className="rounded bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
            >
              差戻し
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
