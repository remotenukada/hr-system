import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import ExcelJS from "exceljs";

export async function GET(request: Request) {
  const session = await auth();

  if (!session?.user) {
    return new Response("Unauthorized", { status: 401 });
  }

  if (!["ADMIN", "HR_MANAGER"].includes(session.user.role)) {
    return new Response("Forbidden", { status: 403 });
  }

  const { searchParams } = new URL(request.url);

  const q = searchParams.get("q")?.trim() || "";
  const action = searchParams.get("action")?.trim() || "";
  const targetType = searchParams.get("targetType")?.trim() || "";
  const from = searchParams.get("from")?.trim() || "";
  const to = searchParams.get("to")?.trim() || "";

  const logs = await prisma.auditLog.findMany({
    where: {
      AND: [
        action ? { action } : {},
        targetType ? { targetType } : {},
        from || to
          ? {
              createdAt: {
                ...(from
                  ? { gte: new Date(`${from}T00:00:00`) }
                  : {}),
                ...(to
                  ? { lte: new Date(`${to}T23:59:59`) }
                  : {}),
              },
            }
          : {},
        q
          ? {
              OR: [
                {
                  userName: {
                    contains: q,
                    mode: "insensitive",
                  },
                },
                {
                  description: {
                    contains: q,
                    mode: "insensitive",
                  },
                },
                {
                  targetId: {
                    contains: q,
                    mode: "insensitive",
                  },
                },
              ],
            }
          : {},
      ],
    },
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
