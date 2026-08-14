import Link from "next/link";

import { prisma } from "@/lib/prisma";
import { requireHRManager } from "@/lib/auth-guard";

function formatAction(action: string) {
  switch (action) {
    case "TRANSFER":
      return "異動";
    case "POSITION_CHANGE":
      return "役職変更";
    default:
      return action;
  }
}

export default async function OrganizationHistoryPage() {
  await requireHRManager();

  const histories = await prisma.employmentHistory.findMany({
    where: {
      action: {
        in: ["TRANSFER", "POSITION_CHANGE"],
      },
    },
    include: {
      employee: {
        include: {
          department: true,
        },
      },
    },
    orderBy: {
      effectiveDate: "desc",
    },
  });

  return (
    <main className="mx-auto max-w-7xl p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            組織変更履歴レポート
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            異動および役職変更履歴を一覧表示します。
          </p>
        </div>

        <Link
          href="/"
          className="rounded border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          ダッシュボードへ戻る
        </Link>
      </div>

      <div className="overflow-x-auto rounded-lg border bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 text-left">
              <th className="border-b p-3">日付</th>
              <th className="border-b p-3">社員番号</th>
              <th className="border-b p-3">氏名</th>
              <th className="border-b p-3">部署</th>
              <th className="border-b p-3">区分</th>
              <th className="border-b p-3">内容</th>
            </tr>
          </thead>

          <tbody>
            {histories.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-4 text-center text-gray-500">
                  組織変更履歴はありません。
                </td>
              </tr>
            ) : (
              histories.map((history) => (
                <tr key={history.id} className="hover:bg-gray-50">
                  <td className="border-b p-3">
                    {new Date(history.effectiveDate).toLocaleDateString("ja-JP")}
                  </td>

                  <td className="border-b p-3">
                    {history.employee.employeeNo}
                  </td>

                  <td className="border-b p-3 font-medium">
                    <Link
                      href={`/employees/${history.employee.id}`}
                      className="text-blue-600 hover:underline"
                    >
                      {history.employee.lastName} {history.employee.firstName}
                    </Link>
                  </td>

                  <td className="border-b p-3">
                    {history.employee.department?.name ?? "-"}
                  </td>

                  <td className="border-b p-3 font-medium">
                    {formatAction(history.action)}
                  </td>

                  <td className="border-b p-3">
                    {history.reason ?? "-"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}
