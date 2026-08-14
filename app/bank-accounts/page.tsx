import Link from "next/link";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireHRManager } from "@/lib/auth-guard";
import { logAudit } from "@/lib/audit-log";

function getStatusBadge(status: string) {
  if (status === "APPROVED") {
    return (
      <span className="rounded bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
        確認済
      </span>
    );
  }

  if (status === "REJECTED") {
    return (
      <span className="rounded bg-red-100 px-2 py-1 text-xs font-medium text-red-800">
        差戻し
      </span>
    );
  }

  return (
    <span className="rounded bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800">
      未確認
    </span>
  );
}

export default async function BankAccountsPage({
  searchParams,
}: {
  searchParams?: Promise<{
    status?: string;
  }>;
}) {
  await requireHRManager();

  const params = await searchParams;
  const status = params?.status;
  const validStatuses = ["PENDING", "APPROVED", "REJECTED"];
  const statusFilter =
    status && validStatuses.includes(status)
      ? status
      : undefined;

  async function approveBankAccount(formData: FormData) {
    "use server";

    const session = await requireHRManager();

    const bankAccountId = String(
      formData.get("bankAccountId") ?? "",
    ).trim();

    if (!bankAccountId) {
      return;
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


    await logAudit({
      userId: session.user.id,
      userName: session.user.name,
      action: "BANK_ACCOUNT_APPROVED",
      targetType: "EmployeeBankAccount",
      targetId: bankAccountId,
      description: "口座情報確認",
    });

    revalidatePath("/bank-accounts");
    revalidatePath("/");
  }

  async function rejectBankAccount(formData: FormData) {
    "use server";

    const session = await requireHRManager();

    const bankAccountId = String(
      formData.get("bankAccountId") ?? "",
    ).trim();

    const reviewComment = String(
      formData.get("reviewComment") ?? "",
    ).trim();

    if (!bankAccountId || !reviewComment) {
      return;
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


    await logAudit({
      userId: session.user.id,
      userName: session.user.name,
      action: "BANK_ACCOUNT_REJECTED",
      targetType: "EmployeeBankAccount",
      targetId: bankAccountId,
      description: `口座情報差戻し: ${reviewComment}`,
    });

    revalidatePath("/bank-accounts");
    revalidatePath("/");
  }

  const [
    totalCount,
    pendingCount,
    approvedCount,
    rejectedCount,
  ] = await Promise.all([
    prisma.employeeBankAccount.count(),
    prisma.employeeBankAccount.count({
      where: {
        status: "PENDING",
      },
    }),
    prisma.employeeBankAccount.count({
      where: {
        status: "APPROVED",
      },
    }),
    prisma.employeeBankAccount.count({
      where: {
        status: "REJECTED",
      },
    }),
  ]);

  const bankAccounts =
    await prisma.employeeBankAccount.findMany({
      where: statusFilter
        ? {
            status: statusFilter,
          }
        : undefined,
      include: {
        employee: {
          include: {
            department: true,
          },
        },
        attachments: true,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

  return (
    <main className="mx-auto max-w-7xl p-8">
      <h1 className="mb-6 text-3xl font-bold">
        口座情報確認
      </h1>

      <div className="mb-6 flex flex-wrap gap-2">
        <Link
          href="/bank-accounts"
          className={`rounded px-3 py-2 text-sm ${
            !statusFilter
              ? "bg-slate-900 text-white"
              : "border border-gray-300 hover:bg-gray-50"
          }`}
        >
          すべて ({totalCount})
        </Link>

        <Link
          href="/bank-accounts?status=PENDING"
          className={`rounded px-3 py-2 text-sm ${
            statusFilter === "PENDING"
              ? "bg-amber-600 text-white"
              : "border border-gray-300 hover:bg-gray-50"
          }`}
        >
          未確認 ({pendingCount})
        </Link>

        <Link
          href="/bank-accounts?status=APPROVED"
          className={`rounded px-3 py-2 text-sm ${
            statusFilter === "APPROVED"
              ? "bg-emerald-600 text-white"
              : "border border-gray-300 hover:bg-gray-50"
          }`}
        >
          承認済 ({approvedCount})
        </Link>

        <Link
          href="/bank-accounts?status=REJECTED"
          className={`rounded px-3 py-2 text-sm ${
            statusFilter === "REJECTED"
              ? "bg-rose-600 text-white"
              : "border border-gray-300 hover:bg-gray-50"
          }`}
        >
          却下済 ({rejectedCount})
        </Link>
      </div>

      <div className="overflow-x-auto rounded-lg border bg-white">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="border p-2 text-left font-medium">社員番号</th>
              <th className="border p-2 text-left font-medium">氏名</th>
              <th className="border p-2 text-left font-medium">部署</th>
              <th className="border p-2 text-left font-medium">金融機関</th>
              <th className="border p-2 text-left font-medium">支店</th>
              <th className="border p-2 text-left font-medium">種別</th>
              <th className="border p-2 text-left font-medium">口座番号</th>
              <th className="border p-2 text-left font-medium">状態</th>
              <th className="border p-2 text-left font-medium">添付</th>
              <th className="border p-2 text-left font-medium">更新日</th>
              <th className="border p-2 text-left font-medium">操作</th>
              <th className="border p-2 text-left font-medium">詳細</th>
            </tr>
          </thead>

          <tbody>
            {bankAccounts.length === 0 ? (
              <tr>
                <td colSpan={13} className="border p-4 text-center text-gray-500">
                  登録されている口座情報はありません。
                </td>
              </tr>
            ) : (
              bankAccounts.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="border p-2">
                    {item.employee.employeeNo}
                  </td>

                  <td className="border p-2 font-medium">
                    {item.employee.lastName}{" "}
                    {item.employee.firstName}
                  </td>

                  <td className="border p-2">
                    {item.employee.department?.name ?? "-"}
                  </td>

                  <td className="border p-2">
                    {item.bankName}
                  </td>

                  <td className="border p-2">
                    {item.branchName}
                  </td>

                  <td className="border p-2">
                    {item.accountType}
                  </td>

                  <td className="border p-2">
                    {"*".repeat(
                      Math.max(
                        item.accountNumber.length - 4,
                        0,
                      ),
                    )}
                    {item.accountNumber.slice(-4)}
                  </td>

                  <td className="border p-2">
                    {getStatusBadge(item.status)}
                    {item.reviewComment && (
                      <p className="mt-1 text-xs text-red-600">
                        理由: {item.reviewComment}
                      </p>
                    )}
                  </td>

                  <td className="border p-2">
                    {item.attachments.length === 0 ? (
                      "-"
                    ) : (
                      <ul className="space-y-1">
                        {item.attachments.map((a) => (
                          <li key={a.id}>
                            <a
                              href={a.filePath}
                              target="_blank"
                              rel="noreferrer"
                              className="text-blue-600 hover:underline"
                            >
                              {a.fileName}
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </td>

                  <td className="border p-2 text-gray-600">
                    {item.updatedAt.toLocaleDateString(
                      "ja-JP",
                    )}
                  </td>

                  <td className="border p-2">
                    {item.status === "APPROVED" ? (
                      <span className="text-xs text-gray-400">-</span>
                    ) : (
                      <div className="flex flex-col gap-2">
                        <form action={approveBankAccount}>
                          <input
                            type="hidden"
                            name="bankAccountId"
                            value={item.id}
                          />
                          <button
                            type="submit"
                            className="w-full rounded bg-green-600 px-2 py-1 text-xs font-medium text-white hover:bg-green-700"
                          >
                            確認済にする
                          </button>
                        </form>

                        <details className="text-xs">
                          <summary className="cursor-pointer text-red-600 hover:underline">
                            差戻し
                          </summary>
                          <form action={rejectBankAccount} className="mt-2 flex flex-col gap-1">
                            <input
                              type="hidden"
                              name="bankAccountId"
                              value={item.id}
                            />
                            <input
                              type="text"
                              name="reviewComment"
                              placeholder="差戻し理由"
                              required
                              className="rounded border p-1 text-xs"
                            />
                            <button
                              type="submit"
                              className="rounded bg-red-600 px-2 py-1 text-xs font-medium text-white hover:bg-red-700"
                            >
                              送信
                            </button>
                          </form>
                        </details>
                      </div>
                    )}
                  </td>

                  <td className="border p-2">
                    <Link
                      href={`/bank-accounts/${item.id}`}
                      className="text-blue-600 hover:underline"
                    >
                      詳細
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-6">
        <Link
          href="/"
          className="text-sm text-blue-600 hover:underline"
        >
          ← ダッシュボードへ戻る
        </Link>
      </div>
    </main>
  );
}
