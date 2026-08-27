import BackLink from "@/components/BackLink";
import Link from "next/link";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireHRManager } from "@/lib/auth-guard";
import { logAudit } from "@/lib/audit-log";
import { resolveNextAnnualGrantEvent } from "@/lib/annual-leave-rule-resolver";

function formatEmploymentType(type: string | null) {
  const labels: Record<string, string> = {
    FULL_TIME: "常勤",
    CONTRACT: "契約",
    PART_TIME: "非常勤",
    TEMPORARY: "派遣",
  };

  return type ? (labels[type] ?? type) : "-";
}

async function grantPendingLeave() {
  "use server";

  const session = await requireHRManager();

  const annualType = await prisma.leaveType.findUnique({
    where: { code: "ANNUAL" },
  });

  if (!annualType) {
    throw new Error("年次有給休暇マスタが見つかりません。");
  }

  const employees = await prisma.employee.findMany({
    where: {
      hireDate: { not: null },
      status: "ACTIVE",
      employmentType: "FULL_TIME",
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

    const histories = [...employee.leaveGrantHistories];

    for (let count = 0; count < 10; count += 1) {
      const event = await resolveNextAnnualGrantEvent(
        new Date(employee.hireDate),
        employee.employmentType,
        histories,
      );

      if (!event || event.days <= 0) {
        break;
      }

      const legalDays =
        "legalDays" in event
          ? Math.min(event.legalDays ?? 0, event.days)
          : event.grantType === "LEGAL"
            ? event.days
            : 0;

      const specialDays =
        "specialDays" in event
          ? Math.max(0, event.days - legalDays)
          : event.grantType === "SPECIAL"
            ? event.days
            : 0;

      const grantRows = [
        ...(legalDays > 0
          ? [
              {
                employeeId: employee.id,
                leaveTypeId: annualType.id,
                grantDate: event.grantDate,
                expiresAt: new Date(
                  new Date(event.grantDate).setMonth(
                    event.grantDate.getMonth() +
                      (annualType.expirationMonths ?? 24),
                  ),
                ),
                grantedDays: legalDays,
                grantType: "LEGAL" as const,
                note: event.note,
              },
            ]
          : []),
        ...(specialDays > 0
          ? [
              {
                employeeId: employee.id,
                leaveTypeId: annualType.id,
                grantDate: event.grantDate,
                expiresAt: new Date(
                  new Date(event.grantDate).setMonth(
                    event.grantDate.getMonth() +
                      (annualType.expirationMonths ?? 24),
                  ),
                ),
                grantedDays: specialDays,
                grantType: "SPECIAL" as const,
                note:
                  event.category === "定期付与"
                    ? "年次有給休暇 定期付与 特別休暇"
                    : event.note,
              },
            ]
          : []),
      ];

      const beforeBalance = await prisma.leaveBalance.findUnique({
        where: { employeeId: employee.id },
      });

      const result = await prisma.$transaction(async (tx) => {
        await tx.leaveGrantHistory.createMany({
          data: grantRows,
        });

        const annualBalance = await tx.leaveBalance.upsert({
          where: { employeeId: employee.id },
          update: {
            grantedDays: {
              increment: event.days,
            },
          },
          create: {
            employeeId: employee.id,
            grantedDays: event.days,
            usedDays: 0,
          },
        });

        await tx.leaveTypeBalance.upsert({
          where: {
            employeeId_leaveTypeId: {
              employeeId: employee.id,
              leaveTypeId: annualType.id,
            },
          },
          update: {
            grantedDays: {
              increment: event.days,
            },
          },
          create: {
            employeeId: employee.id,
            leaveTypeId: annualType.id,
            grantedDays: event.days,
            usedDays: 0,
          },
        });

        return annualBalance;
      });

      await logAudit({
        userId: session.user.id,
        userName: session.user.name,
        action: "LEAVE_GRANTED",
        targetType: "Employee",
        targetId: employee.id,
        description:
          `${employee.employeeNo} に年次有給休暇 ` +
          `${event.days}日を${event.category}として付与`,
        beforeData: beforeBalance,
        afterData: {
          balance: result,
          grants: grantRows,
        },
      });

      histories.push(
        ...grantRows.map((row, index) => ({
          id: `temporary-${count}-${index}`,
          employeeId: row.employeeId,
          leaveTypeId: row.leaveTypeId,
          grantDate: row.grantDate,
          expiresAt: row.expiresAt,
          grantedDays: row.grantedDays,
          grantType: row.grantType,
          note: row.note,
          createdAt: new Date(),
        })),
      );
    }
  }

  revalidatePath("/leave-grants/pending");
  revalidatePath("/leave-grants");
  revalidatePath("/leave-balances");
  revalidatePath("/leave-type-balances");
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

  const candidates = await Promise.all(
    employees.map(async (employee) => {
      if (!employee.hireDate || employee.employmentType !== "FULL_TIME") {
        return null;
      }

      const event = await resolveNextAnnualGrantEvent(
        new Date(employee.hireDate),
        employee.employmentType,
        employee.leaveGrantHistories,
      );

      if (!event || event.days <= 0) {
        return null;
      }

      return {
        employee,
        event,
      };
    }),
  );

  const targets = candidates.filter(
    (target): target is NonNullable<typeof target> => target !== null,
  );

  return (
    <main className="p-8">
      <BackLink href="/" label="ダッシュボードへ戻る" />
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">有給付与対象者一覧</h1>

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
                <td colSpan={9} className="p-8 text-center text-gray-500">
                  付与対象者はいません。
                </td>
              </tr>
            ) : (
              targets.map(({ employee, event }) => {
                const nextGrantDate = event.grantDate;

                const legalDays =
                  "legalDays" in event
                    ? Math.min(event.legalDays ?? 0, event.days)
                    : event.grantType === "LEGAL"
                      ? event.days
                      : 0;

                const specialDays =
                  "specialDays" in event
                    ? Math.max(0, event.days - legalDays)
                    : event.grantType === "SPECIAL"
                      ? event.days
                      : 0;

                const breakdown = {
                  legalDays,
                  specialDays,
                  totalDays: event.days,
                };

                const category = event.category;

                return (
                  <tr key={employee.id} className="border-b hover:bg-gray-50">
                    <td className="p-3">{employee.employeeNo}</td>

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
                      {breakdown ? `${breakdown.legalDays}日` : "-"}
                    </td>

                    <td className="p-3">
                      {breakdown ? `${breakdown.specialDays}日` : "-"}
                    </td>

                    <td className="p-3 font-medium text-green-700">
                      {breakdown ? `${breakdown.totalDays}日` : "-"}
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
