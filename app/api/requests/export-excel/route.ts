import { prisma } from "@/lib/prisma";
import ExcelJS from "exceljs";

export async function GET() {
  const requests = await prisma.employeeRequest.findMany({
    include: {
      employee: true,
      user: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("申請一覧");

  worksheet.columns = [
    { header: "タイトル", key: "title", width: 40 },
    { header: "種別", key: "type", width: 20 },
    { header: "対象社員", key: "employee", width: 25 },
    { header: "申請者", key: "user", width: 25 },
    { header: "ステータス", key: "status", width: 15 },
    { header: "作成日", key: "createdAt", width: 20 },
  ];

  requests.forEach((r) => {
    worksheet.addRow({
      title: r.title,
      type: r.type,
      employee: r.employee
        ? `${r.employee.lastName} ${r.employee.firstName}`
        : "",
      user: r.user?.name ?? "",
      status: r.status,
      createdAt: new Date(r.createdAt).toLocaleDateString("ja-JP"),
    });
  });

  const buffer = await workbook.xlsx.writeBuffer();

  return new Response(buffer, {
    headers: {
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition":
        'attachment; filename="requests.xlsx"',
    },
  });
}
