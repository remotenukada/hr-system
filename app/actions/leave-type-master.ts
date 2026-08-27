"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const listPath = "/leave-type-masters";

export async function createLeaveTypeMaster(formData: FormData) {
  const code = String(formData.get("code") ?? "")
    .trim()
    .toUpperCase();
  const name = String(formData.get("name") ?? "").trim();
  const isPaid = formData.get("isPaid") === "on";

  const expirationMonths = formData.get("expirationMonths")
    ? Number(formData.get("expirationMonths"))
    : null;

  const allowRequest = formData.get("allowRequest") === "on";

  const manageBalance = formData.get("manageBalance") === "on";

  const description = String(formData.get("description") ?? "").trim() || null;

  const sortOrder = Number(formData.get("sortOrder") ?? 0);

  if (!code || !name) {
    redirect("/leave-type-masters/new");
  }

  await prisma.leaveType.create({
    data: {
      code,
      name,
      isPaid,
      expirationMonths,
      allowRequest,
      manageBalance,
      description,
      sortOrder: Number.isFinite(sortOrder) ? sortOrder : 0,
    },
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
    data: {
      isActive: !current.isActive,
    },
  });

  revalidatePath(listPath);
  redirect(listPath);
}

export async function deleteLeaveTypeMaster(formData: FormData) {
  const id = String(formData.get("id") ?? "");

  await prisma.leaveType.delete({
    where: { id },
  });

  revalidatePath(listPath);
  redirect(listPath);
}

export async function updateLeaveTypeMaster(
  formData: FormData,
) {
  const id =
    String(formData.get("id") ?? "");

  const code =
    String(formData.get("code") ?? "")
      .trim()
      .toUpperCase();

  const name =
    String(formData.get("name") ?? "").trim();

  const isPaid =
    formData.get("isPaid") === "on";

  const expirationMonths =
    formData.get("expirationMonths")
      ? Number(formData.get("expirationMonths"))
      : null;

  const allowRequest =
    formData.get("allowRequest") === "on";

  const manageBalance =
    formData.get("manageBalance") === "on";

  const description =
    String(formData.get("description") ?? "").trim() || null;

  const sortOrder = Number(
    formData.get("sortOrder") ?? 0,
  );

  await prisma.leaveType.update({
    where: { id },
    data: {
      code,
      name,
      isPaid,
      expirationMonths,
      allowRequest,
      manageBalance,
      description,
      sortOrder,
    },
  });

  revalidatePath("/leave-type-masters");

  redirect("/leave-type-masters");
}
