import BackLink from "@/components/BackLink";
import Link from "next/link";

import { prisma } from "@/lib/prisma";
import { requireHRManager } from "@/lib/auth-guard";

export default async function EmployeeTransfersPage() {
  await requireHRManager();

  const transfers = await prisma.employmentHistory.findMany({
    where: {
      action: "TRANSFER",
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
      <BackLink href="/" label="ダッシュボードへ戻る" />
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            人事異動一覧
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            部署異動の履歴を一覧表示します。
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
              <th className="border-b p-3">異動日</th>
              <th className="border-b p-3">社員番号</th>
              <th className="border-b p-3">氏名</th>
              <th className="border-b p-3">部署</th>
              <th className="border-b p-3">内容</th>
            </tr>
          </thead>

          <tbody>
            {transfers.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-4 text-center text-gray-500">
                  人事異動履歴はありません。
                </td>
              </tr>
            ) : (
              transfers.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="border-b p-3">
                    {new Date(item.effectiveDate).toLocaleDateString("ja-JP")}
                  </td>

                  <td className="border-b p-3">
                    {item.employee.employeeNo}
                  </td>

                  <td className="border-b p-3 font-medium">
                    <Link
                      href={`/employees/${item.employee.id}`}
                      className="text-blue-600 hover:underline"
                    >
                      {item.employee.lastName} {item.employee.firstName}
                    </Link>
                  </td>

                  <td className="border-b p-3">
                    {item.employee.department?.name ?? "-"}
                  </td>

                  <td className="border-b p-3">
                    {item.reason ?? "-"}
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
