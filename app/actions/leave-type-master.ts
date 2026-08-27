"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const listPath = "/leave-type-masters";

function getData(formData: FormData) {
  const expirationValue = String(formData.get("expirationMonths") ?? "").trim();

  return {
    code: String(formData.get("code") ?? "")
      .trim()
      .toUpperCase(),
    name: String(formData.get("name") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim() || null,
    expirationMonths: expirationValue === "" ? null : Number(expirationValue),
    isPaid: formData.get("isPaid") === "on",
    allowRequest: formData.get("allowRequest") === "on",
    manageBalance: formData.get("manageBalance") === "on",
    sortOrder: Number(formData.get("sortOrder") ?? 0),
  };
}

export async function createLeaveTypeMaster(formData: FormData) {
  const data = getData(formData);

  if (!data.code || !data.name) {
    redirect("/leave-type-masters/new");
  }

  await prisma.leaveType.create({ data });

  revalidatePath(listPath);
  redirect(listPath);
}

export async function updateLeaveTypeMaster(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const data = getData(formData);

  if (!id || !data.code || !data.name) {
    redirect(listPath);
  }

  await prisma.leaveType.update({
    where: { id },
    data,
  });

  revalidatePath(listPath);
  redirect(listPath);
}

export async function toggleLeaveTypeMaster(formData: FormData) {
  const id = String(formData.get("id") ?? "");

  const current = await prisma.leaveType.findUnique({
    where: { id },
  });

  if (!current) {
    redirect(listPath);
  }

  await prisma.leaveType.update({
    where: { id },
    data: { isActive: !current.isActive },
  });

  revalidatePath(listPath);
  redirect(listPath);
}

export async function deleteLeaveTypeMaster(formData: FormData) {
  const id = String(formData.get("id") ?? "");

  if (!id) {
    redirect(listPath);
  }

  const item = await prisma.leaveType.findUnique({
    where: { id },
    select: {
      code: true,
      _count: {
        select: {
          leaveGrantHistories: true,
          leaveTypeBalances: true,
          employeeRequests: true,
        },
      },
    },
  });

  if (!item) {
    redirect(listPath);
  }

  const usageCount =
    item._count.leaveGrantHistories +
    item._count.leaveTypeBalances +
    item._count.employeeRequests;

  if (usageCount > 0) {
    const message =
      `使用中のため削除できません。` +
      `付与履歴:${item._count.leaveGrantHistories}件、` +
      `残高:${item._count.leaveTypeBalances}件、` +
      `申請:${item._count.employeeRequests}件`;

    redirect(`${listPath}?error=${encodeURIComponent(message)}`);
  }

  await prisma.leaveType.delete({
    where: { id },
  });

  revalidatePath(listPath);
  redirect(listPath);
}
