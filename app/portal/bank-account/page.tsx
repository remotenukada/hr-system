import Link from "next/link";
import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

const statusLabels: Record<string, string> = {
  APPROVED: "確認済",
  PENDING: "確認待ち",
  REJECTED: "差戻し",
};

const statusClasses: Record<string, string> = {
  APPROVED: "bg-green-100 text-green-800",
  PENDING: "bg-yellow-100 text-yellow-800",
  REJECTED: "bg-red-100 text-red-800",
};

function InfoItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-lg border bg-white p-4">
      <dt className="text-sm font-medium text-gray-500">{label}</dt>
      <dd className="mt-1 text-gray-900">{value}</dd>
    </div>
  );
}

function maskAccountNumber(value: string) {
  if (!value) {
    return "-";
  }

  const visibleLength = Math.min(4, value.length);

  return (
    "*".repeat(Math.max(value.length - visibleLength, 0)) +
    value.slice(-visibleLength)
  );
}

export default async function CurrentBankAccountPage() {
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

  const bankAccount = await prisma.employeeBankAccount.findUnique({
    where: {
      employeeId: employee.id,
    },
    include: {
      attachments: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  return (
    <main className="mx-auto max-w-5xl p-8">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            現在の口座情報
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            給与振込等に登録されている口座情報を表示しています。
          </p>
        </div>

        <Link
          href="/"
          className="inline-flex items-center rounded border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          ダッシュボードへ戻る
        </Link>
      </div>

      {!bankAccount ? (
        <section className="mt-6 rounded-lg border bg-white p-8 text-center shadow-sm">
          <p className="text-gray-600">
            登録されている口座情報はありません。
          </p>

          <Link
            href="/mypage/bank-account"
            className="mt-4 inline-block rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            口座情報を登録・申請する
          </Link>
        </section>
      ) : (
        <>
          <section className="mt-6 rounded-lg border bg-gray-50 p-6 shadow-sm">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b pb-2">
              <h2 className="text-lg font-semibold">登録内容</h2>

              <span
                className={`rounded px-2 py-1 text-xs font-medium ${
                  statusClasses[bankAccount.status] ??
                  "bg-gray-100 text-gray-800"
                }`}
              >
                {statusLabels[bankAccount.status] ?? bankAccount.status}
              </span>
            </div>

            {bankAccount.status === "REJECTED" && bankAccount.reviewComment && (
              <div className="mb-4 rounded border border-red-200 bg-red-50 p-4">
                <p className="font-semibold text-red-700">差戻し理由</p>
                <p className="mt-1 text-sm text-red-600">
                  {bankAccount.reviewComment}
                </p>
              </div>
            )}

            <dl className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <InfoItem
                label="金融機関名"
                value={bankAccount.bankName || "-"}
              />
              <InfoItem
                label="支店名"
                value={bankAccount.branchName || "-"}
              />
              <InfoItem
                label="口座種別"
                value={bankAccount.accountType || "-"}
              />
              <InfoItem
                label="口座番号"
                value={maskAccountNumber(bankAccount.accountNumber)}
              />
              <InfoItem
                label="口座名義（カナ）"
                value={bankAccount.accountHolder || "-"}
              />
              <InfoItem
                label="金融機関区分"
                value={
                  bankAccount.bankType === "YUCHO"
                    ? "ゆうちょ銀行"
                    : "一般金融機関"
                }
              />

              {bankAccount.bankType === "YUCHO" && (
                <>
                  <InfoItem
                    label="ゆうちょ記号"
                    value={bankAccount.yuchoSymbol || "-"}
                  />
                  <InfoItem
                    label="ゆうちょ番号"
                    value={maskAccountNumber(bankAccount.yuchoNumber ?? "")}
                  />
                </>
              )}
            </dl>
          </section>

          <section className="mt-6 rounded-lg border bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold">確認書類</h2>

            {bankAccount.attachments.length === 0 ? (
              <p className="text-sm text-gray-500">
                登録済みの確認書類はありません。
              </p>
            ) : (
              <ul className="space-y-2">
                {bankAccount.attachments.map((attachment) => (
                  <li
                    key={attachment.id}
                    className="rounded border p-3"
                  >
                    <a
                      href={attachment.filePath}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:underline"
                    >
                      {attachment.fileName}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/mypage/bank-account"
              className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              口座情報を変更する
            </Link>
          </section>
        </>
      )}
    </main>
  );
}
