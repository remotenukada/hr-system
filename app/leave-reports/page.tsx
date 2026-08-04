import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { requireManager } from "@/lib/auth-guard";

export default async function LeaveReportsPage() {
  await requireManager();

  const balances = await prisma.leaveBalance.findMany({
    include: {
      employee: {
        include: {
          department: true,
        },
      },
    },
    orderBy: {
      employeeId: "asc",
    },
  });

  const rows = balances.map((balance) => {
    const remaining =
      balance.grantedDays - balance.usedDays;

    const rate =
      balance.grantedDays > 0
        ? (
            (balance.usedDays /
              balance.grantedDays) *
            100
          ).toFixed(1)
        : "0.0";

    return {
      ...balance,
      remaining,
      rate,
    };
  });

  const rankingRows = [...rows]
    .filter((row) => row.grantedDays > 0)
    .sort(
      (a, b) =>
        Number(b.rate) - Number(a.rate),
    )
    .slice(0, 5);

  const departmentMap = new Map<
    string,
    {
      departmentName: string;
      grantedDays: number;
      usedDays: number;
    }
  >();

  for (const row of rows) {
    const departmentName =
      row.employee?.department?.name ?? "未所属";

    const current = departmentMap.get(departmentName) ?? {
      departmentName,
      grantedDays: 0,
      usedDays: 0,
    };

    current.grantedDays += row.grantedDays;
    current.usedDays += row.usedDays;

    departmentMap.set(departmentName, current);
  }

  const departmentRows = Array.from(
    departmentMap.values(),
  )
    .map((department) => {
      const remaining =
        department.grantedDays - department.usedDays;

      const rate =
        department.grantedDays > 0
          ? (
              (department.usedDays /
                department.grantedDays) *
              100
            ).toFixed(1)
          : "0.0";

      return {
        ...department,
        remaining,
        rate,
      };
    })
    .sort(
      (a, b) =>
        Number(b.rate) - Number(a.rate),
    );

  return (
    <main className="mx-auto max-w-7xl p-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          有給取得レポート
        </h1>

        <a
          href="/api/leave-reports/export"
          className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          CSV出力
        </a>

        <a
          href="/api/leave-reports/export-excel"
          className="rounded bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
        >
          Excel出力
        </a>
      </div>

      <section className="mb-6 rounded border bg-white p-4">
        <h2 className="mb-3 text-lg font-semibold">
          有給取得率ランキング TOP5
        </h2>

        {rankingRows.length === 0 ? (
          <p className="text-sm text-gray-500">
            データがありません。
          </p>
        ) : (
          <ol className="space-y-2">
            {rankingRows.map((row, index) => (
              <li
                key={row.employeeId}
                className="flex justify-between rounded border p-2"
              >
                <span>
                  {index + 1}位　
                  {row.employee
                    ? `${row.employee.lastName} ${row.employee.firstName}`
                    : "-"}
                </span>

                <span>
                  {row.rate}%
                </span>
              </li>
            ))}
          </ol>
        )}
      </section>

      <section className="mb-6 rounded border bg-white p-4">
        <h2 className="mb-3 text-lg font-semibold">
          部署別有給取得率
        </h2>

        {departmentRows.length === 0 ? (
          <p className="text-sm text-gray-500">
            データがありません。
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="p-3 text-left">部署</th>
                  <th className="p-3 text-right">付与</th>
                  <th className="p-3 text-right">使用</th>
                  <th className="p-3 text-right">残数</th>
                  <th className="p-3 text-right">取得率</th>
                </tr>
              </thead>

              <tbody>
                {departmentRows.map((row) => (
                  <tr
                    key={row.departmentName}
                    className="border-t"
                  >
                    <td className="p-3">
                      {row.departmentName}
                    </td>

                    <td className="p-3 text-right">
                      {row.grantedDays.toFixed(1)}
                    </td>

                    <td className="p-3 text-right">
                      {row.usedDays.toFixed(1)}
                    </td>

                    <td className="p-3 text-right">
                      {row.remaining.toFixed(1)}
                    </td>

                    <td className="p-3 text-right">
                      {row.rate}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <div className="overflow-x-auto rounded border bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50">
              <th className="p-3 text-left">社員名</th>
              <th className="p-3 text-right">付与</th>
              <th className="p-3 text-right">使用</th>
              <th className="p-3 text-right">残数</th>
              <th className="p-3 text-right">取得率</th>
            </tr>
          </thead>

          <tbody>
            {rows.map((row) => (
              <tr
                key={row.employeeId}
                className="border-t"
              >
                <td className="p-3">
                  {row.employee
                    ? `${row.employee.lastName} ${row.employee.firstName}`
                    : "-"}
                </td>

                <td className="p-3 text-right">
                  {row.grantedDays}
                </td>

                <td className="p-3 text-right">
                  {row.usedDays}
                </td>

                <td className="p-3 text-right">
                  {row.remaining}
                </td>

                <td className="p-3 text-right">
                  {row.rate}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6">
        <Link href="/">
          ← ダッシュボードへ戻る
        </Link>
      </div>
    </main>
  );
}
