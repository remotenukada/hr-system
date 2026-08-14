import Link from "next/link";

import { prisma } from "@/lib/prisma";

export default async function EmploymentContractsPage() {
  const contracts = await prisma.employmentContract.findMany({
    include: {
      employee: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          雇用条件書一覧
        </h1>

        <Link
          href="/employee-contracts/new"
          className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          新規作成
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="border p-2 text-left">社員番号</th>
              <th className="border p-2 text-left">氏名</th>
              <th className="border p-2 text-left">契約区分</th>
              <th className="border p-2 text-left">開始日</th>
              <th className="border p-2 text-left">終了日</th>
            </tr>
          </thead>

          <tbody>
            {contracts.map((contract) => (
              <tr key={contract.id}>
                <td className="border p-2">
                  {contract.employee.employeeNo}
                </td>

                <td className="border p-2">
                  {contract.employee.lastName}
                  {" "}
                  {contract.employee.firstName}
                </td>

                <td className="border p-2">
                  {contract.contractType}
                </td>

                <td className="border p-2">
                  {new Date(
                    contract.startDate,
                  ).toLocaleDateString("ja-JP")}
                </td>

                <td className="border p-2">
                  {contract.endDate
                    ? new Date(
                        contract.endDate,
                      ).toLocaleDateString("ja-JP")
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
