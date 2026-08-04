import { prisma } from "@/lib/prisma";
import { requireManager } from "@/lib/auth-guard";
import ExcelJS from "exceljs";

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

  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("年5日取得義務管理");

  worksheet.columns = [
    { header: "社員番号", key: "employeeNo", width: 15 },
    { header: "社員名", key: "employeeName", width: 25 },
    { header: "付与日", key: "grantDate", width: 15 },
    { header: "期限日", key: "dueDate", width: 15 },
    { header: "付与日数", key: "grantedDays", width: 12 },
    { header: "取得済日数", key: "acquiredDays", width: 14 },
    { header: "残必要日数", key: "remainingRequiredDays", width: 14 },
    { header: "経過日数", key: "elapsedDays", width: 12 },
    { header: "期限まで", key: "daysUntilDue", width: 15 },
    { header: "状態", key: "status", width: 12 },
  ];

  grants.forEach((grant) => {
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

    worksheet.addRow({
      employeeNo: grant.employee?.employeeNo ?? "",
      employeeName: grant.employee
        ? `${grant.employee.lastName} ${grant.employee.firstName}`
        : "",
      grantDate: grant.grantDate.toLocaleDateString("ja-JP"),
      dueDate: dueDate.toLocaleDateString("ja-JP"),
      grantedDays: grant.grantedDays.toFixed(1),
      acquiredDays: acquiredDays.toFixed(1),
      remainingRequiredDays: remainingRequiredDays.toFixed(1),
      elapsedDays: `${getDaysBetween(grant.grantDate, today)}日`,
      daysUntilDue:
        daysUntilDue < 0
          ? `${Math.abs(daysUntilDue)}日経過`
          : `${daysUntilDue}日`,
      status,
    });
  });

  worksheet.getRow(1).font = {
    bold: true,
  };

  const buffer = await workbook.xlsx.writeBuffer();

  return new Response(buffer, {
    headers: {
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition":
        'attachment; filename="leave_compliance.xlsx"',
    },
  });
}
