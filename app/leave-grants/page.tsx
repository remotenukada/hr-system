import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireHRManager } from "@/lib/auth-guard";
import { logAudit } from "@/lib/audit-log";
import { buildFullTimeInitialLeaveGrantPlan } from "@/lib/leave-grant-rules";

async function grantInitialFullTimeLeave() {
  "use server";

  const session = await requireHRManager();

  const employees = await prisma.employee.findMany({
    where: {
      employmentType: "FULL_TIME",
      hireDate: {
        not: null,
      },
    },
    include: {
      leaveGrantHistories: true,
    },
    orderBy: {
      employeeNo: "asc",
    },
  });

  for (const employee of employees) {
    if (!employee.hireDate) {
      continue;
    }

    if (employee.leaveGrantHistories.length > 0) {
      continue;
    }

    const plan = buildFullTimeInitialLeaveGrantPlan(employee.hireDate);

    if (plan.length === 0) {
      continue;
    }

    const totalGrantedDays = plan.reduce(
      (sum, item) => sum + item.grantedDays,
      0,
    );

    await prisma.leaveGrantHistory.createMany({
      data: plan.map((item) => ({
        employeeId: employee.id,
        grantDate: item.grantDate,
        grantedDays: item.grantedDays,
        grantType: item.grantType,
        note: item.note,
      })),
    });

    const currentBalance = await prisma.leaveBalance.findUnique({
      where: {
        employeeId: employee.id,
      },
    });

    const updatedBalance = await prisma.leaveBalance.upsert({
      where: {
        employeeId: employee.id,
      },
      update: {
        grantedDays:
          (currentBalance?.grantedDays ?? 0) +
          totalGrantedDays,
      },
      create: {
        employeeId: employee.id,
        grantedDays: totalGrantedDays,
        usedDays: 0,
      },
    });

    await logAudit({
      userId: session.user.id,
      userName: session.user.name,
      action: "LEAVE_GRANTED",
      targetType: "Employee",
      targetId: employee.id,
      description: `${employee.employeeNo} に初年度有給を ${totalGrantedDays}日 付与`,
      beforeData: currentBalance,
      afterData: updatedBalance,
    });
  }

  revalidatePath("/leave-grants");
  revalidatePath("/leave-balances");
}

export default async function LeaveGrantHistoryPage() {
  await requireHRManager();

  const grants = await prisma.leaveGrantHistory.findMany({
    include: {
      employee: true,
    },
    orderBy: {
      grantDate: "desc",
    },
  });

  return (
    <main className="p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            有給付与履歴
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            法定付与・特別休暇付与の履歴を確認します。
          </p>
        </div>

        <form action={grantInitialFullTimeLeave}>
          <button
            type="submit"
            className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            常勤初年度付与を実行
          </button>
        </form>
      </div>

      <div className="overflow-x-auto rounded border bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50">
              <th className="p-3 text-left">社員番号</th>
              <th className="p-3 text-left">氏名</th>
              <th className="p-3 text-left">付与日</th>
              <th className="p-3 text-left">日数</th>
              <th className="p-3 text-left">区分</th>
              <th className="p-3 text-left">備考</th>
            </tr>
          </thead>

          <tbody>
            {grants.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="p-8 text-center text-gray-500"
                >
                  有給付与履歴はありません。
                </td>
              </tr>
            ) : (
              grants.map((x) => (
                <tr key={x.id} className="border-t">
                  <td className="p-3">
                    {x.employee.employeeNo}
                  </td>

                  <td className="p-3">
                    {x.employee.lastName} {x.employee.firstName}
                  </td>

                  <td className="p-3">
                    {new Date(x.grantDate).toLocaleDateString("ja-JP")}
                  </td>

                  <td className="p-3">
                    {x.grantedDays}日
                  </td>

                  <td className="p-3">
                    {x.grantType}
                  </td>

                  <td className="p-3">
                    {x.note ?? "-"}
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
