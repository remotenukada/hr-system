"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const listPath = "/annual-leave-entry-rules";

export async function updateAnnualLeaveEntryRule(formData: FormData) {
  const id = String(formData.get("id") ?? "");

  await prisma.annualLeaveEntryRule.update({
    where: { id },
    data: {
      legalDays: Number(formData.get("legalDays") ?? 10),

      specialGrant1Days: Number(formData.get("specialGrant1Days") ?? 0),
      specialGrant2Days: Number(formData.get("specialGrant2Days") ?? 0),
      specialGrant3Days: Number(formData.get("specialGrant3Days") ?? 0),

      firstYearTotalDays: Number(formData.get("firstYearTotalDays") ?? 0),
      nextAprilDays: Number(formData.get("nextAprilDays") ?? 0),

      allowManualSpecialAdjustment:
        formData.get("allowManualSpecialAdjustment") === "on",

      isActive: formData.get("isActive") === "on",
    },
  });

  revalidatePath(listPath);
  redirect(listPath);
}
