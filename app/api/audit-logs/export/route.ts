import { prisma } from "@/lib/prisma";

export async function GET() {
  const logs = await prisma.auditLog.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const header = [
    "日時",
    "アクション",
    "対象",
    "対象ID",
    "ユーザー",
    "内容",
  ];

  const rows = logs.map((log) => [
    new Date(log.createdAt).toISOString(),
    log.action,
    log.targetType,
    log.targetId ?? "",
    log.userName ?? "",
    (log.description ?? "").replaceAll(",", " "),
  ]);

  const csv = [
    header.join(","),
    ...rows.map((row) => row.join(",")),
  ].join("\n");

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition":
        'attachment; filename="audit_logs.csv"',
    },
  });
}
