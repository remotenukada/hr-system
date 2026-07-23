import { prisma } from "@/lib/prisma";
import ExcelJS from "exceljs";

export async function GET() {
  const logs = await prisma.auditLog.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("監査ログ");

  worksheet.columns = [
    { header: "日時", key: "createdAt", width: 25 },
    { header: "アクション", key: "action", width: 30 },
    { header: "対象", key: "targetType", width: 20 },
    { header: "対象ID", key: "targetId", width: 40 },
    { header: "ユーザー", key: "userName", width: 25 },
    { header: "内容", key: "description", width: 60 },
  ];

  logs.forEach((log) => {
    worksheet.addRow({
      createdAt: new Date(log.createdAt).toLocaleString("ja-JP"),
      action: log.action,
      targetType: log.targetType,
      targetId: log.targetId ?? "",
      userName: log.userName ?? "",
      description: log.description ?? "",
    });
  });

  const buffer = await workbook.xlsx.writeBuffer();

  return new Response(buffer, {
    headers: {
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition":
        'attachment; filename="audit_logs.xlsx"',
    },
  });
}
