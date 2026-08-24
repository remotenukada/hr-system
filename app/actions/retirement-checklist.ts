"use server";

import { revalidatePath } from "next/cache";

import { requireHRManager } from "@/lib/auth-guard";
import { prisma } from "@/lib/prisma";

export async function updateRetirementChecklist(
  formData: FormData,
) {
  await requireHRManager();

  const employeeId = String(
    formData.get("employeeId") ?? "",
  );

  if (!employeeId) {
    throw new Error("社員IDがありません");
  }

  const data = {
    healthInsuranceReturned:
      formData.has("healthInsuranceReturned"),
    employmentInsuranceCompleted:
      formData.has("employmentInsuranceCompleted"),
    pcReturned: formData.has("pcReturned"),
    lockerReturned: formData.has("lockerReturned"),
    nameTagReturned: formData.has("nameTagReturned"),
    uniformReturned: formData.has("uniformReturned"),
    retirementCertificateIssued:
      formData.has("retirementCertificateIssued"),
    memo: String(formData.get("memo") ?? "").trim() || null,
  };

  await prisma.retirementChecklist.upsert({
    where: { employeeId },
    create: {
      employeeId,
      ...data,
    },
    update: data,
  });

  revalidatePath(`/retirement-management/${employeeId}`);
  revalidatePath("/retirement-management");
}
