import BackLink from "@/components/BackLink";
import Link from "next/link";

import { requireHRManager } from "@/lib/auth-guard";
import { prisma } from "@/lib/prisma";

const DAY_MS = 24 * 60 * 60 * 1000;

export default async function ContractRenewalsPage() {
  await requireHRManager();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const limitDate = new Date(today);
  limitDate.setDate(limitDate.getDate() + 60);
  limitDate.setHours(23, 59, 59, 999);

  const contracts = await prisma.employmentContract.findMany({
    where: {
      isCurrent: true,
      endDate: {
        lte: limitDate,
      },
    },
    include: {
      employee: true,
    },
    orderBy: {
      endDate: "asc",
    },
  });

  return (
    <main className="mx-auto max-w-6xl p-6">
      <BackLink href="/employee-contracts" label="雇用条件書一覧に戻る" />

      <div className="mb-6">
        <h1 className="text-2xl font-bold">契約更新管理</h1>
        <p className="mt-2 text-sm text-gray-600">
          契約終了日が60日以内の現行雇用条件書を表示します。
        </p>
      </div>

      <div className="overflow-x-auto rounded-lg border bg-white">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="border-b p-3 text-left">社員番号</th>
              <th className="border-b p-3 text-left">氏名</th>
              <th className="border-b p-3 text-left">契約区分</th>
              <th className="border-b p-3 text-center">Version</th>
              <th className="border-b p-3 text-left">契約終了日</th>
              <th className="border-b p-3 text-center">残日数</th>
              <th className="border-b p-3 text-center">操作</th>
            </tr>
          </thead>
          <tbody>
            {contracts.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-6 text-center text-gray-500">
                  更新対象の契約はありません。
                </td>
              </tr>
            ) : (
              contracts.map((contract) => {
                const daysRemaining = Math.ceil(
                  (new Date(contract.endDate!).getTime() - today.getTime()) /
                    DAY_MS,
                );

                return (
                  <tr key={contract.id} className="hover:bg-gray-50 border-b">
                    <td className="p-3">{contract.employee.employeeNo}</td>
                    <td className="p-3">
                      {contract.employee.lastName} {contract.employee.firstName}
                    </td>
                    <td className="p-3">{contract.contractType || "-"}</td>
                    <td className="p-3 text-center">{contract.version}</td>
                    <td className="p-3">
                      {new Date(contract.endDate!).toLocaleDateString("ja-JP")}
                    </td>
                    <td className="p-3 text-center">
                      <span
                        className={`inline-block rounded-full px-2 py-0.5 text-xs font-semibold ${
                          daysRemaining < 0
                            ? "bg-red-700 text-white"
                            : daysRemaining <= 30
                              ? "bg-red-100 text-red-800"
                              : daysRemaining <= 60
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {daysRemaining < 0
                          ? `期限切れ ${Math.abs(daysRemaining)}日`
                          : `あと ${daysRemaining} 日`}
                      </span>
                    </td>
                    <td className="p-3 text-center">
                      <Link
                        href={`/employee-contracts/${contract.id}/edit?mode=renewal`}
                        className="text-blue-600 hover:underline"
                      >
                        契約更新
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
