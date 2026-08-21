import BackLink from "@/components/BackLink";
import Link from "next/link";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireHRManager } from "@/lib/auth-guard";
import { logAudit } from "@/lib/audit-log";
import {
  calculateAnnualGrantBreakdown,
  calculateRuleBasedNextGrantDate,
  getLeaveGrantCategory,
  toDateKey,
} from "@/lib/leave-annual-grant";

function formatEmploymentType(type: string | null) {
  const labels: Record<string, string> = {
    FULL_TIME: "常勤",
    CONTRACT: "契約",
    PART_TIME: "非常勤",
    TEMPORARY: "派遣",
  };

  return type ? labels[type] ?? type : "-";
}

async function grantPendingLeave() {
  "use server";

  const session = await requireHRManager();

  const employees = await prisma.employee.findMany({
    where: {
      hireDate: {
        not: null,
      },
      status: "ACTIVE",
    },
    include: {
      leaveGrantHistories: true,
      leaveBalance: true,
    },
    orderBy: {
      employeeNo: "asc",
    },
  });

  for (const employee of employees) {
    if (!employee.hireDate) {
      continue;
    }

    const hireDate = new Date(employee.hireDate);
    const nextGrantDate = calculateRuleBasedNextGrantDate(hireDate);
    const nextGrantDateKey = toDateKey(nextGrantDate);

    const alreadyGranted = employee.leaveGrantHistories.some(
      (history) => toDateKey(new Date(history.grantDate)) === nextGrantDateKey,
    );

    if (alreadyGranted) {
      continue;
    }

    const breakdown = calculateAnnualGrantBreakdown(
      hireDate,
      employee.employmentType,
    );

    if (breakdown.totalDays <= 0) {
      continue;
    }

    const grantRows = [
      {
        employeeId: employee.id,
        grantDate: nextGrantDate,
        grantedDays: breakdown.legalDays,
        grantType: "LEGAL" as const,
        note: "年次有給休暇 法定付与",
      },
      ...(breakdown.specialDays > 0
        ? [
            {
              employeeId: employee.id,
              grantDate: nextGrantDate,
              grantedDays: breakdown.specialDays,
              grantType: "SPECIAL" as const,
              note: "年次有給休暇 特別休暇付与",
            },
          ]
        : []),
    ];

    await prisma.leaveGrantHistory.createMany({
      data: grantRows,
    });

    const beforeBalance = employee.leaveBalance;

    const updatedBalance = await prisma.leaveBalance.upsert({
      where: {
        employeeId: employee.id,
      },
      update: {
        grantedDays:
          (employee.leaveBalance?.grantedDays ?? 0) + breakdown.totalDays,
      },
      create: {
        employeeId: employee.id,
        grantedDays: breakdown.totalDays,
        usedDays: 0,
      },
    });

    await logAudit({
      userId: session.user.id,
      userName: session.user.name,
      action: "LEAVE_GRANTED",
      targetType: "Employee",
      targetId: employee.id,
      description: `${employee.employeeNo} に有給 ${breakdown.totalDays}日 を一括付与`,
      beforeData: beforeBalance,
      afterData: {
        balance: updatedBalance,
        grants: grantRows,
      },
    });
  }

  revalidatePath("/leave-grants/pending");
  revalidatePath("/leave-grants");
  revalidatePath("/leave-balances");
}

export default async function PendingLeaveGrantPage() {
  await requireHRManager();

  const employees = await prisma.employee.findMany({
    where: {
      hireDate: {
        not: null,
      },
      status: "ACTIVE",
    },
    include: {
      leaveGrantHistories: true,
    },
    orderBy: {
      employeeNo: "asc",
    },
  });

  const targets = employees.filter((employee) => {
    if (!employee.hireDate) {
      return false;
    }

    const nextGrantDate = calculateRuleBasedNextGrantDate(
      new Date(employee.hireDate),
    );

    const alreadyGranted = employee.leaveGrantHistories.some(
      (history) =>
        toDateKey(new Date(history.grantDate)) === toDateKey(nextGrantDate),
    );

    return !alreadyGranted;
  });

  return (
    <main className="p-8">
      <BackLink href="/" label="ダッシュボードへ戻る" />
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            有給付与対象者一覧
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            次回付与予定の職員を確認し、一括付与します。
          </p>

          <p className="mt-2 font-medium text-blue-700">
            付与対象: {targets.length}件
          </p>
        </div>

        <div className="flex gap-3">
          <form action={grantPendingLeave}>
            <button
              type="submit"
              className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:bg-gray-300"
              disabled={targets.length === 0}
            >
              対象者へ一括付与
            </button>
          </form>

          <Link
            href="/leave-balances"
            className="rounded-md border bg-white px-4 py-2 text-sm hover:bg-gray-50"
          >
            有給管理一覧へ
          </Link>

          <Link
            href="/leave-grants"
            className="rounded-md border bg-white px-4 py-2 text-sm hover:bg-gray-50"
          >
            有給付与履歴へ
          </Link>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 text-left">
              <th className="border-b p-3">社員番号</th>
              <th className="border-b p-3">氏名</th>
              <th className="border-b p-3">雇用形態</th>
              <th className="border-b p-3">次回付与日</th>
              <th className="border-b p-3">法定付与</th>
              <th className="border-b p-3">特別休暇</th>
              <th className="border-b p-3">合計</th>
              <th className="border-b p-3">判定</th>
              <th className="border-b p-3">詳細</th>
            </tr>
          </thead>

          <tbody>
            {targets.length === 0 ? (
              <tr>
                <td
                  colSpan={9}
                  className="p-8 text-center text-gray-500"
                >
                  付与対象者はいません。
                </td>
              </tr>
            ) : (
              targets.map((employee) => {
                const hireDate = employee.hireDate
                  ? new Date(employee.hireDate)
                  : null;

                const nextGrantDate = hireDate
                  ? calculateRuleBasedNextGrantDate(hireDate)
                  : null;

                const breakdown = hireDate
                  ? calculateAnnualGrantBreakdown(
                      hireDate,
                      employee.employmentType,
                    )
                  : null;

                const category = hireDate
                  ? getLeaveGrantCategory(hireDate)
                  : "-";

                return (
                  <tr
                    key={employee.id}
                    className="border-b hover:bg-gray-50"
                  >
                    <td className="p-3">
                      {employee.employeeNo}
                    </td>

                    <td className="p-3 font-medium">
                      {employee.lastName} {employee.firstName}
                    </td>

                    <td className="p-3">
                      {formatEmploymentType(employee.employmentType)}
                    </td>

                    <td className="p-3">
                      {nextGrantDate
                        ? nextGrantDate.toLocaleDateString("ja-JP")
                        : "-"}
                    </td>

                    <td className="p-3">
                      {breakdown
                        ? `${breakdown.legalDays}日`
                        : "-"}
                    </td>

                    <td className="p-3">
                      {breakdown
                        ? `${breakdown.specialDays}日`
                        : "-"}
                    </td>

                    <td className="p-3 font-medium text-green-700">
                      {breakdown
                        ? `${breakdown.totalDays}日`
                        : "-"}
                    </td>

                    <td className="p-3">
                      <span
                        className={
                          category === "初回付与"
                            ? "rounded bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700"
                            : "rounded bg-green-50 px-2 py-1 text-xs font-medium text-green-700"
                        }
                      >
                        {category}
                      </span>
                    </td>

                    <td className="p-3">
                      <Link
                        href={`/employees/${employee.id}`}
                        className="text-blue-600 hover:underline"
                      >
                        社員詳細
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
