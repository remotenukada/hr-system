import BackLink from "@/components/BackLink";
import { prisma } from "@/lib/prisma";
import { requireHRManager } from "@/lib/auth-guard";

export default async function LeaveTypeBalancesPage() {
  await requireHRManager();

  const balances = await prisma.leaveTypeBalance.findMany({
    include: {
      employee: true,
      leaveType: true,
    },
    orderBy: [
      {
        employee: {
          employeeNo: "asc",
        },
      },
      {
        leaveType: {
          sortOrder: "asc",
        },
      },
    ],
  });

  return (
    <main className="p-8">
      <BackLink href="/" label="ダッシュボードへ戻る" />

      <h1 className="mb-6 text-3xl font-bold">休暇別残高一覧</h1>

      <div className="overflow-x-auto rounded border bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50">
              <th className="p-3 text-left">社員番号</th>
              <th className="p-3 text-left">氏名</th>
              <th className="p-3 text-left">休暇種別</th>
              <th className="p-3 text-right">付与</th>
              <th className="p-3 text-right">使用</th>
              <th className="p-3 text-right">残数</th>
            </tr>
          </thead>

          <tbody>
            {balances.map((row) => (
              <tr key={row.id} className="border-t">
                <td className="p-3">{row.employee.employeeNo}</td>

                <td className="p-3">
                  {row.employee.lastName} {row.employee.firstName}
                </td>

                <td className="p-3">{row.leaveType.name}</td>

                <td className="p-3 text-right">{row.grantedDays}</td>

                <td className="p-3 text-right">{row.usedDays}</td>

                <td className="p-3 text-right font-bold">
                  {row.grantedDays - row.usedDays}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
