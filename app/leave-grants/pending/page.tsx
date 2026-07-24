import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { requireHRManager } from "@/lib/auth-guard";
import {
  calculateAnnualGrantDays,
  calculateRuleBasedNextGrantDate,
} from "@/lib/leave-annual-grant";

export default async function PendingLeaveGrantPage() {
  await requireHRManager();

  const employees = await prisma.employee.findMany({
    where: {
      hireDate: {
        not: null,
      },
      status: "ACTIVE",
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

        <Link
          href="/leave-grants"
          className="rounded border border-gray-300 bg-white px-4 py-2 text-sm font-medium hover:bg-gray-50"
        >
          有給付与履歴へ
        </Link>
      </div>

      <div className="overflow-x-auto rounded-lg border bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 text-left">
              <th className="border-b p-3">社員番号</th>
              <th className="border-b p-3">氏名</th>
              <th className="border-b p-3">雇用形態</th>
              <th className="border-b p-3">次回付与日</th>
              <th className="border-b p-3">予定付与日数</th>
            </tr>
          </thead>

          <tbody>
            {employees.map((employee) => (
              <tr
                key={employee.id}
                className="border-b"
              >
                <td className="p-3">
                  {employee.employeeNo}
                </td>

                <td className="p-3">
                  {employee.lastName} {employee.firstName}
                </td>

                <td className="p-3">
                  {employee.employmentType ?? "-"}
                </td>

                <td className="p-3">
                  {employee.hireDate
                    ? calculateRuleBasedNextGrantDate(
                        new Date(employee.hireDate),
                      ).toLocaleDateString("ja-JP")
                    : "-"}
                </td>

                <td className="p-3 font-medium text-green-700">
                  {employee.hireDate
                    ? `${calculateAnnualGrantDays(
                        new Date(employee.hireDate),
                      )}日`
                    : "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
