import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import ExcelJS from "exceljs";

export async function GET() {
  const session = await auth();

  if (!session?.user) {
    return new Response("Unauthorized", { status: 401 });
  }

  if (!["ADMIN","HR_MANAGER"].includes(session.user.role)) {
    return new Response("Forbidden", { status: 403 });
  }

  const employees = await prisma.employee.findMany({
    include: {
      department: true,
    },
    orderBy: {
      employeeNo: "asc",
    },
  });

  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("社員台帳");

  worksheet.columns = [
    { header: "社員番号", key: "employeeNo", width: 15 },
    { header: "氏名", key: "name", width: 20 },
    { header: "メール", key: "email", width: 30 },
    { header: "部署", key: "department", width: 20 },
    { header: "職種", key: "occupation", width: 20 },
    { header: "役職", key: "position", width: 20 },
    { header: "ステータス", key: "status", width: 15 },
  ];

  employees.forEach((e) => {
    worksheet.addRow({
      employeeNo: e.employeeNo,
      name: `${e.lastName} ${e.firstName}`,
      email: e.email,
      department: e.department?.name ?? "",
      occupation: e.occupation ?? "",
      position: e.position ?? "",
      status: e.status,
    });
  });

  const buffer = await workbook.xlsx.writeBuffer();

  return new Response(buffer, {
    headers: {
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition":
        'attachment; filename="employees.xlsx"',
    },
  });
}
