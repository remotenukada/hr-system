import BackLink from "@/components/BackLink";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function AnnualLeaveEntryRulesPage() {
  const rules = await prisma.annualLeaveEntryRule.findMany({
    orderBy: [{ entryMonth: "asc" }, { dayFrom: "asc" }],
  });

  return (
    <main className="mx-auto max-w-7xl p-6">
      <BackLink href="/masters" label="マスタ一覧へ戻る" />

      <h1 className="mb-6 text-2xl font-bold">入職月別有給付与ルール</h1>

      <div className="overflow-x-auto rounded-lg border bg-white">
        <table className="min-w-full text-sm">
          <thead>
            <tr>
              <th className="p-3">入職月</th>
              <th className="p-3">期間</th>
              <th className="p-3">初年度合計</th>
              <th className="p-3">翌年度4月</th>
              <th className="p-3">特別①</th>
              <th className="p-3">特別②</th>
              <th className="p-3">特別③</th>
              <th className="p-3">編集</th>
            </tr>
          </thead>

          <tbody>
            {rules.map((rule) => (
              <tr key={rule.id}>
                <td className="border-t p-3">{rule.entryMonth}月</td>

                <td className="border-t p-3">
                  {rule.dayFrom}〜{rule.dayTo}日
                </td>

                <td className="border-t p-3">{rule.firstYearTotalDays}</td>

                <td className="border-t p-3">{rule.nextAprilDays}</td>

                <td className="border-t p-3">{rule.specialGrant1Days}</td>

                <td className="border-t p-3">{rule.specialGrant2Days}</td>

                <td className="border-t p-3">{rule.specialGrant3Days}</td>

                <td className="border-t p-3">
                  <Link
                    href={`/annual-leave-entry-rules/${rule.id}/edit`}
                    className="text-blue-600 hover:underline"
                  >
                    編集
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
