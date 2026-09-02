import { logAudit } from "@/lib/audit-log";
import { prisma } from "@/lib/prisma";

const EXPIRABLE_TYPES = ["LEGAL", "SPECIAL", "MANUAL"] as const;

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

function addYears(date: Date, years: number) {
  const result = new Date(date);
  result.setFullYear(result.getFullYear() + years);
  return result;
}

export async function expireEligibleLeaves(actorName = "system-cron") {
  const grants = await prisma.leaveGrantHistory.findMany({
    where: {
      grantType: {
        in: [...EXPIRABLE_TYPES, "EXPIRED"],
      },
      employee: {
        status: "ACTIVE",
      },
    },
    include: {
      employee: true,
      leaveType: true,
    },
    orderBy: [{ employeeId: "asc" }, { grantDate: "asc" }],
  });

  const annualType = await prisma.leaveType.findUnique({
    where: {
      code: "ANNUAL",
    },
  });

  const expiredSourceIds = new Set(
    grants
      .filter((grant) => grant.grantType === "EXPIRED")
      .map((grant) => getExpiredSourceId(grant.note))
      .filter((id): id is string => Boolean(id)),
  );

  const today = getTodayOnly();

  const sourceGrants = grants.filter((grant) =>
    EXPIRABLE_TYPES.includes(
      grant.grantType as (typeof EXPIRABLE_TYPES)[number],
    ),
  );

  const groupMap = new Map<string, typeof sourceGrants>();

  for (const grant of sourceGrants) {
    const leaveTypeId = grant.leaveTypeId ?? annualType?.id;

    if (!leaveTypeId) {
      continue;
    }

    const key = `${grant.employeeId}:${leaveTypeId}`;
    const group = groupMap.get(key) ?? [];

    group.push(grant);
    groupMap.set(key, group);
  }

  let processedCount = 0;
  let expiredDaysTotal = 0;

  for (const [key, groupedGrants] of groupMap) {
    const [employeeId, leaveTypeId] = key.split(":");

    const currentBalance = await prisma.leaveTypeBalance.findUnique({
      where: {
        employeeId_leaveTypeId: {
          employeeId,
          leaveTypeId,
        },
      },
    });

    let remainingUsedDays = currentBalance?.usedDays ?? 0;
    let remainingAvailableDays = Math.max(
      0,
      (currentBalance?.grantedDays ?? 0) - (currentBalance?.usedDays ?? 0),
    );

    for (const grant of groupedGrants) {
      /*
       * 使用日数は古い付与分から順に充当する。
       * これにより、付与済み日数全体ではなく、
       * 各付与履歴の未使用分だけを失効対象にする。
       */
      const usedFromGrant = Math.min(grant.grantedDays, remainingUsedDays);

      remainingUsedDays = Math.max(0, remainingUsedDays - usedFromGrant);

      if (expiredSourceIds.has(grant.id)) {
        continue;
      }

      const expirationDate = grant.expiresAt ?? addYears(grant.grantDate, 2);

      if (expirationDate >= today) {
        continue;
      }

      const unusedGrantDays = Math.max(0, grant.grantedDays - usedFromGrant);

      const expiredDays = Math.min(unusedGrantDays, remainingAvailableDays);

      const result = await prisma.$transaction(async (tx) => {
        /*
         * 同時実行時にも同じ付与履歴を二重処理しない。
         */
        const existingExpiration = await tx.leaveGrantHistory.findFirst({
          where: {
            grantType: "EXPIRED",
            note: {
              contains: `失効元:${grant.id} `,
            },
          },
        });

        if (existingExpiration) {
          return null;
        }

        const balance = await tx.leaveTypeBalance.findUnique({
          where: {
            employeeId_leaveTypeId: {
              employeeId,
              leaveTypeId,
            },
          },
        });

        const availableNow = Math.max(
          0,
          (balance?.grantedDays ?? 0) - (balance?.usedDays ?? 0),
        );

        const actualExpiredDays = Math.min(expiredDays, availableNow);

        let updatedBalance = balance;

        if (actualExpiredDays > 0 && balance) {
          updatedBalance = await tx.leaveTypeBalance.update({
            where: {
              employeeId_leaveTypeId: {
                employeeId,
                leaveTypeId,
              },
            },
            data: {
              grantedDays: {
                decrement: actualExpiredDays,
              },
            },
          });

          if (
            (grant.leaveType?.code ??
              (leaveTypeId === annualType?.id ? "ANNUAL" : null)) === "ANNUAL"
          ) {
            const annualBalance = await tx.leaveBalance.findUnique({
              where: {
                employeeId,
              },
            });

            if (annualBalance) {
              await tx.leaveBalance.update({
                where: {
                  employeeId,
                },
                data: {
                  grantedDays: Math.max(
                    annualBalance.usedDays,
                    annualBalance.grantedDays - actualExpiredDays,
                  ),
                },
              });
            }
          }
        }

        await tx.leaveGrantHistory.create({
          data: {
            employeeId,
            leaveTypeId,
            grantDate: today,
            grantedDays: actualExpiredDays,
            grantType: "EXPIRED",
            note:
              `失効元:${grant.id} ` +
              `${grant.leaveType?.name ?? "年次有給休暇"} ` +
              `自動失効処理`,
          },
        });

        return {
          actualExpiredDays,
          updatedBalance,
        };
      });

      if (!result) {
        continue;
      }

      remainingAvailableDays = Math.max(
        0,
        remainingAvailableDays - result.actualExpiredDays,
      );

      await logAudit({
        userName: actorName,
        action: "AUTO_EXPIRE_LEAVE",
        targetType: "LEAVE_GRANT_HISTORY",
        targetId: grant.id,
        afterData: {
          employeeId,
          leaveTypeId,
          expirationDate,
          expiredDays: result.actualExpiredDays,
          remainingGrantedDays: result.updatedBalance?.grantedDays ?? 0,
        },
      });

      processedCount++;
      expiredDaysTotal += result.actualExpiredDays;
    }
  }

  return {
    processedCount,
    expiredDaysTotal,
  };
}
