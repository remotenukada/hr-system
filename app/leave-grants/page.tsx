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


async function grantManualLeave(formData: FormData) {
  "use server";

  const session = await requireHRManager();

  const employeeId = String(
    formData.get("employeeId") ?? "",
  );

  const days = Number(
    formData.get("days") ?? 0,
  );

  const adjustType = String(
    formData.get("adjustType") ?? "GRANT",
  );

  const note = String(
    formData.get("note") ?? "",
  );

  if (!employeeId || days <= 0) {
    return;
  }

  const employee =
    await prisma.employee.findUnique({
      where: {
        id: employeeId,
      },
    });

  if (!employee) {
    return;
  }

  const currentBalance =
    await prisma.leaveBalance.findUnique({
      where: {
        employeeId,
      },
    });

  await prisma.leaveGrantHistory.create({
    data: {
      employeeId,
      grantDate: new Date(),
      grantedDays: days,
      grantType:
        adjustType === "DEDUCT"
          ? "MANUAL_DEDUCT"
          : "MANUAL",
      note,
    },
  });

  const updatedBalance =
    await prisma.leaveBalance.upsert({
      where: {
        employeeId,
      },
      update: {
        grantedDays:
          adjustType === "DEDUCT"
            ? Math.max(
                0,
                (currentBalance?.grantedDays ?? 0) -
                  days,
              )
            : (currentBalance?.grantedDays ?? 0) +
              days,
      },
      create: {
        employeeId,
        grantedDays:
          adjustType === "DEDUCT"
            ? 0
            : days,
        usedDays: 0,
      },
    });

  await logAudit({
    userId: session.user.id,
    userName: session.user.name,
    action:
      adjustType === "DEDUCT"
        ? "LEAVE_DEDUCT_MANUAL"
        : "LEAVE_GRANTED_MANUAL",
    targetType: "Employee",
    targetId: employeeId,
    description:
      adjustType === "DEDUCT"
        ? `${employee.employeeNo} の有給を ${days}日 減算`
        : `${employee.employeeNo} に手動付与 ${days}日`,
    beforeData: currentBalance,
    afterData: updatedBalance,
  });

  revalidatePath("/leave-grants");
  revalidatePath("/leave-balances");
}

export default async function LeaveGrantHistoryPage() {
  await requireHRManager();

  const employees =
    await prisma.employee.findMany({
      select: {
        id: true,
        employeeNo: true,
        lastName: true,
        firstName: true,
      },
      orderBy: {
        employeeNo: "asc",
      },
    });

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


      <form
        action={grantManualLeave}
        className="mb-6 rounded border bg-white p-4"
      >
        <h2 className="mb-3 text-lg font-bold">
          手動付与
        </h2>

        <div className="flex flex-wrap gap-3">
          <select
            name="employeeId"
            className="rounded border p-2"
            required
          >
            <option value="">
              社員を選択
            </option>

            {employees.map((employee) => (
              <option
                key={employee.id}
                value={employee.id}
              >
                {employee.employeeNo}
                {" "}
                {employee.lastName}
                {" "}
                {employee.firstName}
              </option>
            ))}
          </select>

          <select
            name="adjustType"
            className="rounded border p-2"
          >
            <option value="GRANT">
              付与
            </option>

            <option value="DEDUCT">
              減算
            </option>
          </select>

          <input
            type="number"
            name="days"
            min="0.5"
            step="0.5"
            placeholder="付与日数"
            className="rounded border p-2"
            required
          />

          <input
            type="text"
            name="note"
            placeholder="理由"
            className="rounded border p-2"
          />

          <button
            type="submit"
            className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700"
          >
            手動付与
          </button>
        </div>
      </form>

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
