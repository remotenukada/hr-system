"use server";

import { revalidatePath } from "next/cache";

import { requireHRManager } from "@/lib/auth-guard";
import { logAudit } from "@/lib/audit-log";
import { prisma } from "@/lib/prisma";

async function findOrCreateLeaveType(
  code: string,
  name: string,
  sortOrder: number,
) {
  const existing = await prisma.leaveType.findFirst({
    where: {
      OR: [{ code }, { name }],
    },
  });

  if (existing) {
    return existing;
  }

  return prisma.leaveType.create({
    data: {
      code,
      name,
      isPaid: true,
      allowRequest: true,
      manageBalance: true,
      allowDay: true,
      allowAmHalf: true,
      allowPmHalf: true,
      allowHourly: false,
      allowDateRange: false,
      isActive: true,
      sortOrder,
    },
  });
}

async function grantSeasonalLeave(params: {
  leaveTypeId: string;
  leaveTypeName: string;
  employeeId: string;
  employeeNo: string;
  grantDate: Date;
  days: number;
  noteKey: string;
  actorId?: string;
  actorName?: string | null;
}) {
  const alreadyGranted = await prisma.leaveGrantHistory.findFirst({
    where: {
      employeeId: params.employeeId,
      leaveTypeId: params.leaveTypeId,
      note: {
        contains: params.noteKey,
      },
    },
  });

  if (alreadyGranted) {
    return false;
  }

  await prisma.$transaction(async (tx) => {
    await tx.leaveGrantHistory.create({
      data: {
        employeeId: params.employeeId,
        leaveTypeId: params.leaveTypeId,
        grantDate: params.grantDate,
        grantedDays: params.days,
        grantType: "MANUAL",
        note: `${params.noteKey} ${params.leaveTypeName}自動付与`,
      },
    });

    await tx.leaveTypeBalance.upsert({
      where: {
        employeeId_leaveTypeId: {
          employeeId: params.employeeId,
          leaveTypeId: params.leaveTypeId,
        },
      },
      update: {
        grantedDays: {
          increment: params.days,
        },
      },
      create: {
        employeeId: params.employeeId,
        leaveTypeId: params.leaveTypeId,
        grantedDays: params.days,
        usedDays: 0,
      },
    });
  });

  await logAudit({
    userId: params.actorId,
    userName: params.actorName ?? "管理者",
    action: "SEASONAL_LEAVE_GRANTED",
    targetType: "LeaveTypeBalance",
    targetId: params.employeeId,
    description:
      `${params.employeeNo}へ${params.leaveTypeName}` +
      `${params.days}日を自動付与`,
    afterData: {
      leaveTypeId: params.leaveTypeId,
      grantDate: params.grantDate,
      grantedDays: params.days,
    },
  });

  return true;
}

export async function grantSummerLeave() {
  const session = await requireHRManager();

  const today = new Date();
  const year = today.getFullYear();
  const baseDate = new Date(year, 4, 31);

  const leaveType = await findOrCreateLeaveType("SUMMER", "夏季休暇", 100);

  const employees = await prisma.employee.findMany({
    where: {
      status: "ACTIVE",
      employmentType: "FULL_TIME",
      hireDate: {
        not: null,
        lte: baseDate,
      },
    },
    select: {
      id: true,
      employeeNo: true,
      hireDate: true,
    },
  });

  let grantedCount = 0;

  for (const employee of employees) {
    if (!employee.hireDate) {
      continue;
    }

    const oneYearDate = new Date(employee.hireDate);
    oneYearDate.setFullYear(oneYearDate.getFullYear() + 1);

    const days = oneYearDate <= baseDate ? 4 : 2;

    const granted = await grantSeasonalLeave({
      leaveTypeId: leaveType.id,
      leaveTypeName: leaveType.name,
      employeeId: employee.id,
      employeeNo: employee.employeeNo,
      grantDate: baseDate,
      days,
      noteKey: `AUTO_SUMMER:${year}`,
      actorId: session.user.id,
      actorName: session.user.name,
    });

    if (granted) {
      grantedCount++;
    }
  }

  revalidatePath("/leave-grants");
  revalidatePath("/leave-grants/seasonal-preview");
  revalidatePath("/leave-type-balances");

  void grantedCount;
}

export async function grantWinterLeave() {
  const session = await requireHRManager();

  const today = new Date();
  const year = today.getFullYear();

  const leaveType = await findOrCreateLeaveType("WINTER", "冬季休暇", 110);

  const employees = await prisma.employee.findMany({
    where: {
      status: "ACTIVE",
      employmentType: "FULL_TIME",
    },
    select: {
      id: true,
      employeeNo: true,
    },
  });

  let grantedCount = 0;

  for (const employee of employees) {
    const granted = await grantSeasonalLeave({
      leaveTypeId: leaveType.id,
      leaveTypeName: leaveType.name,
      employeeId: employee.id,
      employeeNo: employee.employeeNo,
      grantDate: today,
      days: 4,
      noteKey: `AUTO_WINTER:${year}`,
      actorId: session.user.id,
      actorName: session.user.name,
    });

    if (granted) {
      grantedCount++;
    }
  }

  revalidatePath("/leave-grants");
  revalidatePath("/leave-grants/seasonal-preview");
  revalidatePath("/leave-type-balances");

  void grantedCount;
}
