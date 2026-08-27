import BackLink from "@/components/BackLink";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function AnnualLeaveServiceRulesPage() {
  const rules = await prisma.annualLeaveServiceRule.findMany({
    orderBy: [{ sortOrder: "asc" }, { serviceMonths: "asc" }],
  });

  return (
    <main className="mx-auto max-w-6xl p-6">
      <BackLink href="/masters" label="マスタ一覧へ戻る" />
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">年次有給付与ルール</h1>

        <Link
          href="/annual-leave-service-rules/new"
          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          新規登録
        </Link>
      </div>
      <div className="overflow-x-auto rounded-lg border bg-white">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gray-50 text-left">
              <th className="border-b p-3">勤続月数</th>
              <th className="border-b p-3">法定付与</th>
              <th className="border-b p-3">特別休暇</th>
              <th className="border-b p-3">合計</th>
              <th className="border-b p-3">上限</th>
              <th className="border-b p-3">手動補正</th>
              <th className="border-b p-3">状態</th>
              <th className="border-b p-3">編集</th>
            </tr>
          </thead>

          <tbody>
            {rules.map((rule) => {
              const total = Math.min(
                rule.legalDays + rule.specialDays,
                rule.maxTotalDays,
              );

              return (
                <tr key={rule.id}>
                  <td className="border-b p-3">{rule.serviceMonths}か月</td>
                  <td className="border-b p-3">{rule.legalDays}日</td>
                  <td className="border-b p-3">{rule.specialDays}日</td>
                  <td className="border-b p-3 font-semibold">{total}日</td>
                  <td className="border-b p-3">{rule.maxTotalDays}日</td>
                  <td className="border-b p-3">
                    {rule.allowManualSpecialAdjustment ? "許可" : "不可"}
                  </td>
                  <td className="border-b p-3">
                    {rule.isActive ? "有効" : "無効"}
                  </td>

                  <td className="border-b p-3">
                    <Link
                      href={`/annual-leave-service-rules/${rule.id}/edit`}
                      className="text-blue-600 hover:underline"
                    >
                      編集
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </main>
  );
}
