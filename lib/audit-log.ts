import { prisma } from "@/lib/prisma";

type LogAuditParams = {
  userId?: string | null;
  userName?: string | null;
  action: string;
  targetType: string;
  targetId?: string | null;
  description?: string | null;
  beforeData?: unknown;
  afterData?: unknown;
};

function toJsonValue(value: unknown) {
  if (value === undefined) {
    return undefined;
  }

  return JSON.parse(JSON.stringify(value));
}

export async function logAudit({
  userId,
  userName,
  action,
  targetType,
  targetId,
  description,
  beforeData,
  afterData,
}: LogAuditParams) {
  await prisma.auditLog.create({
    data: {
      userId,
      userName,
      action,
      targetType,
      targetId,
      description,
      beforeData: toJsonValue(beforeData),
      afterData: toJsonValue(afterData),
    },
  });
}
