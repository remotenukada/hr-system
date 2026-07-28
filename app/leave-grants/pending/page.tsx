import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { requireHRManager } from "@/lib/auth-guard";
import {
  calculateAnnualGrantBreakdown,
  calculateRuleBasedNextGrantDate,
  getLeaveGrantCategory,
} from "@/lib/leave-annual-grant";

function formatEmploymentType(type: string | null) {
  const labels: Record<string, string> = {
    FULL_TIME: "常勤",
    CONTRACT: "契約",
    PART_TIME: "非常勤",
    TEMPORARY: "派遣",
  };

  return type ? labels[type] ?? type : "-";
}

export default async function PendingLeaveGrantPage() {
  await requireHRManager();

  const employees = await prisma.employee.findMany({
    where: {
      hireDate: {
        not: null,
      },
      status: "ACTIVE",
    },
    include: {
      leaveGrantHistories: true,
    },
    orderBy: {
      employeeNo: "asc",
    },
  });

  return (
    <main className="p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            有給付与対象者一覧
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            次回付与予定の職員を確認します。
          </p>
        </div>

        <div className="flex gap-3">
          <Link
            href="/leave-balances"
            className="rounded-md border bg-white px-4 py-2 text-sm hover:bg-gray-50"
          >
            有給管理一覧へ
          </Link>

          <Link
            href="/leave-grants"
            className="rounded-md border bg-white px-4 py-2 text-sm hover:bg-gray-50"
          >
            有給付与履歴へ
          </Link>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 text-left">
              <th className="border-b p-3">社員番号</th>
              <th className="border-b p-3">氏名</th>
              <th className="border-b p-3">雇用形態</th>
              <th className="border-b p-3">次回付与日</th>
              <th className="border-b p-3">法定付与</th>
              <th className="border-b p-3">特別休暇</th>
              <th className="border-b p-3">合計</th>
              <th className="border-b p-3">判定</th>
              <th className="border-b p-3">状態</th>
              <th className="border-b p-3">詳細</th>
            </tr>
          </thead>

          <tbody>
            {employees.length === 0 ? (
              <tr>
                <td
                  colSpan={9}
                  className="p-8 text-center text-gray-500"
                >
                  対象者はいません。
                </td>
              </tr>
            ) : (
              employees.map((employee) => {
                const hireDate = employee.hireDate
                  ? new Date(employee.hireDate)
                  : null;

                const nextGrantDate = hireDate
                  ? calculateRuleBasedNextGrantDate(hireDate)
                  : null;

                const breakdown = hireDate
                  ? calculateAnnualGrantBreakdown(
                      hireDate,
                      employee.employmentType,
                    )
                  : null;

                const category = hireDate
                  ? getLeaveGrantCategory(hireDate)
                  : "-";

                const alreadyGranted =
                  employee.leaveGrantHistories.some(
                    (history) =>
                      nextGrantDate &&
                      new Date(history.grantDate)
                        .toDateString() ===
                      nextGrantDate.toDateString(),
                  );

                return (
                  <tr
                    key={employee.id}
                    className="border-b hover:bg-gray-50"
                  >
                    <td className="p-3">
                      {employee.employeeNo}
                    </td>

                    <td className="p-3 font-medium">
                      {employee.lastName} {employee.firstName}
                    </td>

                    <td className="p-3">
                      {formatEmploymentType(employee.employmentType)}
                    </td>

                    <td className="p-3">
                      {nextGrantDate
                        ? nextGrantDate.toLocaleDateString("ja-JP")
                        : "-"}
                    </td>

                    <td className="p-3">
                      {breakdown
                        ? `${breakdown.legalDays}日`
                        : "-"}
                    </td>

                    <td className="p-3">
                      {breakdown
                        ? `${breakdown.specialDays}日`
                        : "-"}
                    </td>

                    <td className="p-3 font-medium text-green-700">
                      {breakdown
                        ? `${breakdown.totalDays}日`
                        : "-"}
                    </td>

                    <td className="p-3">
                      <span
                        className={
                          category === "初回付与"
                            ? "rounded bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700"
                            : "rounded bg-green-50 px-2 py-1 text-xs font-medium text-green-700"
                        }
                      >
                        {category}
                      </span>
                    </td>

                    <td className="p-3">
                      {alreadyGranted ? (
                        <span className="rounded bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                          付与済
                        </span>
                      ) : (
                        <span className="rounded bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-700">
                          未付与
                        </span>
                      )}
                    </td>

                    <td className="p-3">
                      <Link
                        href={`/employees/${employee.id}`}
                        className="text-blue-600 hover:underline"
                      >
                        社員詳細
                      </Link>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}
