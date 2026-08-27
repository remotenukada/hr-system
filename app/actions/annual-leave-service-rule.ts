"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const listPath = "/annual-leave-service-rules";

export async function createAnnualLeaveServiceRule(formData: FormData) {
  await prisma.annualLeaveServiceRule.create({
    data: {
      serviceMonths: Number(formData.get("serviceMonths")),
      legalDays: Number(formData.get("legalDays")),
      specialDays: Number(formData.get("specialDays")),
      maxTotalDays: Number(formData.get("maxTotalDays")),
      allowManualSpecialAdjustment:
        formData.get("allowManualSpecialAdjustment") === "on",
      isActive: formData.get("isActive") === "on",
    },
  });

  revalidatePath(listPath);
  redirect(listPath);
}

export async function updateAnnualLeaveServiceRule(formData: FormData) {
  const id = String(formData.get("id"));

  await prisma.annualLeaveServiceRule.update({
    where: { id },
    data: {
      serviceMonths: Number(formData.get("serviceMonths")),
      legalDays: Number(formData.get("legalDays")),
      specialDays: Number(formData.get("specialDays")),
      maxTotalDays: Number(formData.get("maxTotalDays")),
      allowManualSpecialAdjustment:
        formData.get("allowManualSpecialAdjustment") === "on",
      isActive: formData.get("isActive") === "on",
    },
  });

  revalidatePath(listPath);
  redirect(listPath);
}
