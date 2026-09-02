import BackLink from "@/components/BackLink";
import Link from "next/link";

import { prisma } from "@/lib/prisma";

export default async function RetirementManagementPage() {
  const employees = await prisma.employee.findMany({
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
      retirementChecklist: true,
      loanedAssets: {
        where: {
          returned: false,
        },
      },
      retirementCertificate: true,
    },
    orderBy: {
      retirementDate: "asc",
    },
  });

  return (
    <main className="mx-auto max-w-7xl p-6">
      <BackLink href="/" label="ダッシュボードに戻る" />

      <h1 className="mb-6 text-2xl font-bold">退職予定者管理</h1>

      <div className="overflow-x-auto rounded-lg border bg-white">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="border p-2 text-left">社員番号</th>
              <th className="border p-2 text-left">氏名</th>
              <th className="border p-2 text-left">部署</th>
              <th className="border p-2 text-left">退職予定日</th>
              <th className="border p-2 text-center">貸与品</th>
              <th className="border p-2 text-center">チェックリスト</th>
              <th className="border p-2 text-center">証明書</th>
              <th className="border p-2 text-center">詳細</th>
            </tr>
          </thead>

          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id}>
                <td className="border p-2">{employee.employeeNo}</td>

                <td className="border p-2">
                  {employee.lastName} {employee.firstName}
                </td>

                <td className="border p-2">
                  {employee.department?.name ?? "-"}
                </td>

                <td className="border p-2">
                  {employee.retirementDate
                    ? new Date(employee.retirementDate).toLocaleDateString(
                        "ja-JP",
                      )
                    : "-"}
                </td>

                <td className="border p-2 text-center">
                  {employee.loanedAssets.length === 0
                    ? "完了"
                    : `未返却 ${employee.loanedAssets.length}件`}
                </td>

                <td className="border p-2 text-center">
                  {employee.retirementChecklist ? "登録済" : "未登録"}
                </td>

                <td className="border p-2 text-center">
                  {employee.retirementCertificate ? "発行済" : "未発行"}
                </td>

                <td className="border p-2 text-center">
                  <Link
                    href={`/employees/${employee.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    詳細
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
