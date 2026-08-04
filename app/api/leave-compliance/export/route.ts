import { prisma } from "@/lib/prisma";
import { requireManager } from "@/lib/auth-guard";

const DAY_MS = 24 * 60 * 60 * 1000;

function getTodayOnly() {
  const today = new Date();

  return new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  );
}

function addYears(date: Date, years: number) {
  const result = new Date(date);
  result.setFullYear(result.getFullYear() + years);
  return result;
}

function getDaysBetween(from: Date, to: Date) {
  const fromOnly = new Date(
    from.getFullYear(),
    from.getMonth(),
    from.getDate(),
  );

  const toOnly = new Date(
    to.getFullYear(),
    to.getMonth(),
    to.getDate(),
  );

  return Math.floor(
    (toOnly.getTime() - fromOnly.getTime()) / DAY_MS,
  );
}

function escapeCsv(value: string | number) {
  const text = String(value);

  if (
    text.includes(",") ||
    text.includes('"') ||
    text.includes("\n")
  ) {
    return `"${text.replace(/"/g, '""')}"`;
  }

  return text;
}

export async function GET() {
  await requireManager();

  const today = getTodayOnly();

  const grants =
    await prisma.leaveGrantHistory.findMany({
      where: {
        grantedDays: {
          gte: 10,
        },
        grantType: {
          in: ["LEGAL", "MANUAL"],
        },
        grantDate: {
          lte: today,
        },
        employee: {
          status: "ACTIVE",
        },
      },
      include: {
        employee: true,
      },
      orderBy: {
        grantDate: "desc",
      },
    });

  const employeeIds = Array.from(
    new Set(grants.map((grant) => grant.employeeId)),
  );

  const approvedLeaveRequests =
    await prisma.employeeRequest.findMany({
      where: {
        type: "PAID_LEAVE",
        status: "APPROVED",
        employeeId: {
          in: employeeIds,
        },
      },
      select: {
        employeeId: true,
        leaveStartDate: true,
        leaveDays: true,
      },
    });

  const header = [
    "社員番号",
    "社員名",
    "付与日",
    "期限日",
    "付与日数",
    "取得済日数",
    "残必要日数",
    "経過日数",
    "期限まで",
    "状態",
  ];

  const rows = grants.map((grant) => {
    const dueDate = addYears(grant.grantDate, 1);

    const acquiredDays = approvedLeaveRequests
      .filter((request) => {
        if (
          !request.employeeId ||
          !request.leaveStartDate ||
          !request.leaveDays
        ) {
          return false;
        }

        return (
          request.employeeId === grant.employeeId &&
          request.leaveStartDate >= grant.grantDate &&
          request.leaveStartDate < dueDate
        );
      })
      .reduce(
        (sum, request) => sum + (request.leaveDays ?? 0),
        0,
      );

    const remainingRequiredDays = Math.max(
      0,
      5 - acquiredDays,
    );

    const daysUntilDue = getDaysBetween(today, dueDate);

    const status =
      acquiredDays >= 5
        ? "達成"
        : daysUntilDue < 0
          ? "期限切れ"
          : "未達";

    return [
      grant.employee?.employeeNo ?? "",
      grant.employee
        ? `${grant.employee.lastName} ${grant.employee.firstName}`
        : "",
      grant.grantDate.toLocaleDateString("ja-JP"),
      dueDate.toLocaleDateString("ja-JP"),
      grant.grantedDays.toFixed(1),
      acquiredDays.toFixed(1),
      remainingRequiredDays.toFixed(1),
      getDaysBetween(grant.grantDate, today),
      daysUntilDue < 0
        ? `${Math.abs(daysUntilDue)}日経過`
        : `${daysUntilDue}日`,
      status,
    ];
  });

  const csv = [
    header.map(escapeCsv).join(","),
    ...rows.map((row) => row.map(escapeCsv).join(",")),
  ].join("\n");

  return new Response(`\uFEFF${csv}`, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition":
        'attachment; filename="leave_compliance.csv"',
    },
  });
}
