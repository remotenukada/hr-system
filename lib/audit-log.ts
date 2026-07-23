import { prisma } from "@/lib/prisma";

type LogAuditParams = {
  userId?: string | null;
  userName?: string | null;
  action: string;
  targetType: string;
  targetId?: string | null;
  description?: string | null;
};

export async function logAudit({
  userId,
  userName,
  action,
  targetType,
  targetId,
  description,
}: LogAuditParams) {
  await prisma.auditLog.create({
    data: {
      userId,
      userName,
      action,
      targetType,
      targetId,
      description,
    },
  });
}
