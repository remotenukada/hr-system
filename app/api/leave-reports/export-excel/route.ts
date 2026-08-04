import { prisma } from "@/lib/prisma";
import { requireManager } from "@/lib/auth-guard";
import ExcelJS from "exceljs";

export async function GET() {
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

  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("有給取得レポート");

  worksheet.columns = [
    { header: "社員番号", key: "employeeNo", width: 15 },
    { header: "社員名", key: "employeeName", width: 25 },
    { header: "部署", key: "departmentName", width: 25 },
    { header: "付与日数", key: "grantedDays", width: 15 },
    { header: "使用日数", key: "usedDays", width: 15 },
    { header: "残日数", key: "remainingDays", width: 15 },
    { header: "取得率", key: "rate", width: 15 },
  ];

  balances.forEach((balance) => {
    const grantedDays = balance.grantedDays;
    const usedDays = balance.usedDays;
    const remainingDays = grantedDays - usedDays;

    const rate =
      grantedDays > 0
        ? `${((usedDays / grantedDays) * 100).toFixed(1)}%`
        : "0.0%";

    worksheet.addRow({
      employeeNo: balance.employee?.employeeNo ?? "",
      employeeName: balance.employee
        ? `${balance.employee.lastName} ${balance.employee.firstName}`
        : "",
      departmentName: balance.employee?.department?.name ?? "未所属",
      grantedDays: grantedDays.toFixed(1),
      usedDays: usedDays.toFixed(1),
      remainingDays: remainingDays.toFixed(1),
      rate,
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
        'attachment; filename="leave_reports.xlsx"',
    },
  });
}
