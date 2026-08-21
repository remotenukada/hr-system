import BackLink from "@/components/BackLink";
import Link from "next/link";

import { prisma } from "@/lib/prisma";
import { requireHRManager } from "@/lib/auth-guard";

function formatDate(date: Date | null | undefined) {
  if (!date) return "-";

  return new Date(date).toLocaleDateString("ja-JP");
}

export default async function EmployeeRetirementsPage() {
  await requireHRManager();

  const [plannedRetirements, retiredEmployees] =
    await Promise.all([
      prisma.employee.findMany({
        where: {
          retirementDate: {
            not: null,
          },
          NOT: {
            status: "RETIRED",
          },
        },
        include: {
          department: true,
        },
        orderBy: {
          retirementDate: "asc",
        },
      }),

      prisma.employee.findMany({
        where: {
          status: "RETIRED",
        },
        include: {
          department: true,
        },
        orderBy: {
          retirementDate: "desc",
        },
      }),
    ]);

  return (
    <main className="mx-auto max-w-7xl p-8">
      <BackLink href="/" label="ダッシュボードへ戻る" />
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            退職管理
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            退職予定者および退職済職員を管理します。
          </p>
        </div>

        <Link
          href="/"
          className="rounded border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          ダッシュボードへ戻る
        </Link>
      </div>

      <section className="mb-8 rounded-lg border bg-white p-6 shadow-sm">
        <h2 className="mb-2 text-xl font-semibold text-gray-800">
          退職予定者
        </h2>

        <p className="mb-4 text-sm text-gray-500">
          {plannedRetirements.length}名
        </p>

        {plannedRetirements.length === 0 ? (
          <p className="text-sm text-gray-500">
            退職予定者はいません。
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-left">
                  <th className="border-b p-3">社員番号</th>
                  <th className="border-b p-3">氏名</th>
                  <th className="border-b p-3">部署</th>
                  <th className="border-b p-3">役職</th>
                  <th className="border-b p-3">退職予定日</th>
                </tr>
              </thead>

              <tbody>
                {plannedRetirements.map((employee) => (
                  <tr key={employee.id} className="hover:bg-gray-50">
                    <td className="border-b p-3">
                      {employee.employeeNo}
                    </td>

                    <td className="border-b p-3 font-medium">
                      <Link
                        href={`/employees/${employee.id}`}
                        className="text-blue-600 hover:underline"
                      >
                        {employee.lastName} {employee.firstName}
                      </Link>
                    </td>

                    <td className="border-b p-3">
                      {employee.department?.name ?? "-"}
                    </td>

                    <td className="border-b p-3">
                      {employee.position ?? "-"}
                    </td>

                    <td className="border-b p-3">
                      {formatDate(employee.retirementDate)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className="rounded-lg border bg-white p-6 shadow-sm">
        <h2 className="mb-2 text-xl font-semibold text-gray-800">
          退職済職員
        </h2>

        <p className="mb-4 text-sm text-gray-500">
          {retiredEmployees.length}名
        </p>

        {retiredEmployees.length === 0 ? (
          <p className="text-sm text-gray-500">
            退職済の職員はいません。
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-left">
                  <th className="border-b p-3">社員番号</th>
                  <th className="border-b p-3">氏名</th>
                  <th className="border-b p-3">最終所属部署</th>
                  <th className="border-b p-3">最終役職</th>
                  <th className="border-b p-3">退職日</th>
                </tr>
              </thead>

              <tbody>
                {retiredEmployees.map((employee) => (
                  <tr key={employee.id} className="hover:bg-gray-50">
                    <td className="border-b p-3">
                      {employee.employeeNo}
                    </td>

                    <td className="border-b p-3 font-medium">
                      <Link
                        href={`/employees/${employee.id}`}
                        className="text-blue-600 hover:underline"
                      >
                        {employee.lastName} {employee.firstName}
                      </Link>
                    </td>

                    <td className="border-b p-3">
                      {employee.department?.name ?? "-"}
                    </td>

                    <td className="border-b p-3">
                      {employee.position ?? "-"}
                    </td>

                    <td className="border-b p-3">
                      {formatDate(employee.retirementDate)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}
