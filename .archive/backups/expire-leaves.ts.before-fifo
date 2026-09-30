import { logAudit } from "@/lib/audit-log";
import { prisma } from "@/lib/prisma";

function getExpiredSourceId(note: string | null) {
  if (!note?.includes("失効元:")) {
    return null;
  }

  return note.split("失効元:")[1]?.split(" ")[0] ?? null;
}

function getTodayOnly() {
  const today = new Date();

  return new Date(today.getFullYear(), today.getMonth(), today.getDate());
}

export async function expireEligibleLeaves(actorName = "system-cron") {
  const grants = await prisma.leaveGrantHistory.findMany({
    where: {
      grantType: {
        in: ["LEGAL", "SPECIAL", "MANUAL", "EXPIRED"],
      },
      employee: {
        status: "ACTIVE",
      },
    },
    include: {
      employee: true,
      leaveType: true,
    },
    orderBy: {
      grantDate: "asc",
    },
  });

  const expiredSourceIds = new Set(
    grants
      .filter((grant) => grant.grantType === "EXPIRED")
      .map((grant) => getExpiredSourceId(grant.note))
      .filter(Boolean),
  );

  const annualType = await prisma.leaveType.findUnique({
    where: {
      code: "ANNUAL",
    },
  });

  const today = getTodayOnly();

  const targets = grants.filter(
    (grant) =>
      ["LEGAL", "SPECIAL", "MANUAL"].includes(grant.grantType) &&
      !expiredSourceIds.has(grant.id) &&
      grant.expiresAt !== null &&
      grant.expiresAt < today,
  );

  let processedCount = 0;
  let expiredDaysTotal = 0;

  for (const grant of targets) {
    const leaveTypeId = grant.leaveTypeId ?? annualType?.id;

    if (!leaveTypeId) {
      continue;
    }

    const currentBalance = await prisma.leaveTypeBalance.findUnique({
      where: {
        employeeId_leaveTypeId: {
          employeeId: grant.employeeId,
          leaveTypeId,
        },
      },
    });

    const availableDays = Math.max(
      0,
      (currentBalance?.grantedDays ?? 0) - (currentBalance?.usedDays ?? 0),
    );

    const expiredDays = Math.min(grant.grantedDays, availableDays);

    const updatedBalance = await prisma.$transaction(async (tx) => {
      const balance = await tx.leaveTypeBalance.upsert({
        where: {
          employeeId_leaveTypeId: {
            employeeId: grant.employeeId,
            leaveTypeId,
          },
        },
        update: {
          grantedDays: {
            decrement: expiredDays,
          },
        },
        create: {
          employeeId: grant.employeeId,
          leaveTypeId,
          grantedDays: -expiredDays,
          usedDays: 0,
        },
      });

      await tx.leaveGrantHistory.create({
        data: {
          employeeId: grant.employeeId,
          leaveTypeId,
          grantDate: today,
          grantedDays: expiredDays,
          grantType: "EXPIRED",
          note:
            `失効元:${grant.id} ` +
            `${grant.leaveType?.name ?? "年次有給休暇"} 自動失効処理`,
        },
      });

      return balance;
    });

    await logAudit({
      userName: actorName,
      action: "AUTO_EXPIRE_LEAVE",
      targetType: "LEAVE_GRANT_HISTORY",
      targetId: grant.id,
      afterData: {
        employeeId: grant.employeeId,
        leaveTypeId,
        expiredDays,
        remainingGrantedDays: updatedBalance.grantedDays,
      },
    });

    processedCount++;
    expiredDaysTotal += expiredDays;
  }

  return {
    processedCount,
    expiredDaysTotal,
  };
}
