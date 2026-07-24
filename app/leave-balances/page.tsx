import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { requireHRManager } from "@/lib/auth-guard";
import {
  calculateAnnualGrantDays,
  calculateRuleBasedNextGrantDate,
} from "@/lib/leave-annual-grant";

export default async function LeaveBalancesPage() {
  await requireHRManager();

  const balances = await prisma.leaveBalance.findMany({
    include: {
      employee: {
        include: {
          department: true,
        },
      },
    },
    orderBy: {
      employee: {
        employeeNo: "asc",
      },
    },
  });

  return (
    <main className="p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            有給管理一覧
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            職員ごとの有給残数を管理します。
          </p>
        </div>

        <Link
          href="/employees"
          className="rounded bg-gray-100 px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
        >
          社員一覧へ
        </Link>
      </div>

      <div className="overflow-x-auto rounded-lg border bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 text-left">
              <th className="border-b p-3">社員番号</th>
              <th className="border-b p-3">氏名</th>
              <th className="border-b p-3">部署</th>
              <th className="border-b p-3">付与日数</th>
              <th className="border-b p-3">使用日数</th>
              <th className="border-b p-3">残日数</th>
              <th className="border-b p-3">次回付与日</th>
              <th className="border-b p-3">次回付与予定</th>
              <th className="border-b p-3">詳細</th>
            </tr>
          </thead>

          <tbody>
            {balances.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="p-8 text-center text-gray-500"
                >
                  有給情報はまだ登録されていません。
                </td>
              </tr>
            ) : (
              balances.map((row) => (
                <tr
                  key={row.id}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="p-3">
                    {row.employee.employeeNo}
                  </td>

                  <td className="p-3 font-medium">
                    {row.employee.lastName} {row.employee.firstName}
                  </td>

                  <td className="p-3">
                    {row.employee.department?.name ?? "-"}
                  </td>

                  <td className="p-3">
                    {row.grantedDays.toFixed(1)}日
                  </td>

                  <td className="p-3">
                    {row.usedDays.toFixed(1)}日
                  </td>

                  <td className="p-3 font-semibold text-blue-700">
                    {(row.grantedDays - row.usedDays).toFixed(1)}日
                  </td>

                  <td className="p-3">
                    {row.employee.hireDate
                      ? calculateRuleBasedNextGrantDate(
                          new Date(row.employee.hireDate),
                        ).toLocaleDateString("ja-JP")
                      : "-"}
                  </td>

                  <td className="p-3 font-medium text-green-700">
                    {row.employee.hireDate
                      ? `${calculateAnnualGrantDays(
                          new Date(row.employee.hireDate),
                        )}日`
                      : "-"}
                  </td>

                  <td className="p-3">
                    <Link
                      href={`/employees/${row.employee.id}`}
                      className="text-blue-600 hover:underline"
                    >
                      社員詳細
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
          ← ダッシュボードに戻る
        </Link>
      </div>
    </main>
  );
}
