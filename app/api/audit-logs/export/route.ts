import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
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
      "Content-Type": "text/csv; charset=utf-8; header=present",
      "Content-Disposition":
        'attachment; filename="audit_logs.csv"',
    },
  });
}
