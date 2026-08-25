"use server";

import { redirect } from "next/navigation";
import { requireHRManager } from "@/lib/auth-guard";
import { prisma } from "@/lib/prisma";

export async function saveRetirementCertificate(
  formData: FormData,
) {
  await requireHRManager();

  const employeeId = String(
    formData.get("employeeId") ?? "",
  );

  const certificateDate = String(
    formData.get("certificateDate") ?? "",
  );

  const retirementDate = String(
    formData.get("retirementDate") ?? "",
  );

  if (!employeeId || !certificateDate || !retirementDate) {
    throw new Error(
      "社員、発行日、退職日は必須です",
    );
  }

  await prisma.retirementCertificate.upsert({
    where: { employeeId },

    create: {
      employeeId,

      certificateDate: new Date(
        `${certificateDate}T12:00:00`,
      ),

      retirementDate: new Date(
        `${retirementDate}T12:00:00`,
      ),

      showEmploymentPeriod:
        formData.has("showEmploymentPeriod"),

      showJobType:
        formData.has("showJobType"),

      showPosition:
        formData.has("showPosition"),

      showWage:
        formData.has("showWage"),

      showRetirementReason:
        formData.has("showRetirementReason"),

      jobType:
        String(
          formData.get("jobType") ?? "",
        ).trim() || null,

      wageInfo:
        String(
          formData.get("wageInfo") ?? "",
        ).trim() || null,

      retirementReason:
        String(
          formData.get("retirementReason") ?? "",
        ).trim() || null,
    },

    update: {
      certificateDate: new Date(
        `${certificateDate}T12:00:00`,
      ),

      retirementDate: new Date(
        `${retirementDate}T12:00:00`,
      ),

      showEmploymentPeriod:
        formData.has("showEmploymentPeriod"),

      showJobType:
        formData.has("showJobType"),

      showPosition:
        formData.has("showPosition"),

      showWage:
        formData.has("showWage"),

      showRetirementReason:
        formData.has("showRetirementReason"),

      jobType:
        String(
          formData.get("jobType") ?? "",
        ).trim() || null,

      wageInfo:
        String(
          formData.get("wageInfo") ?? "",
        ).trim() || null,

      retirementReason:
        String(
          formData.get("retirementReason") ?? "",
        ).trim() || null,
    },
  });

  redirect(`/retirement-management/${employeeId}/certificate`);
}
