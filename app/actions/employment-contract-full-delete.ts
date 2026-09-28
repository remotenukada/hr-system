'use server'

import path from "path";
import { rm } from "fs/promises";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";
import { logAudit } from "@/lib/audit-log";
import { requireHRManager } from "@/lib/auth-guard";

export async function fullyDeleteEmploymentContract(
  formData: FormData,
) {
  const session = await requireHRManager();

  const id = String(formData.get("id") ?? "").trim();
  const reason = String(formData.get("reason") ?? "").trim();

  if (!id || !reason) {
    throw new Error("削除理由は必須です。");
  }

  const contract = await prisma.employmentContract.findUnique({
    where: { id },
    include: {
      employee: true,
      employmentContractConsents: {
        select: { id: true },
      },
    },
  });

  if (!contract) {
    throw new Error("契約が見つかりません。");
  }

  if (!contract.isCurrent) {
    throw new Error("現行契約ではありません。");
  }

  const contractCount = await prisma.employmentContract.count({
    where: {
      employeeId: contract.employeeId,
    },
  });

  if (contractCount !== 1) {
    throw new Error(
      "複数の契約履歴が存在するため完全削除できません。",
    );
  }

  if (contract.employmentContractConsents.length > 0) {
    throw new Error("同意済み契約は完全削除できません。");
  }

  await prisma.employmentContract.delete({
    where: { id },
  });

  await logAudit({
    userId: session.user.id,
    userName: session.user.name,
    action: "EMPLOYMENT_CONTRACT_FULLY_DELETED",
    targetType: "EmploymentContract",
    targetId: contract.id,
    description:
      `雇用条件書完全削除: ${contract.employee.employeeNo} ` +
      `v${contract.version}、理由: ${reason}`,
    beforeData: contract,
    afterData: {
      deleted: true,
      reason,
    },
  });

  try {
    await rm(
      path.join(
        "/data/hr-system/exports/contracts",
        contract.id,
      ),
      {
        recursive: true,
        force: true,
      },
    );
  } catch (error) {
    console.error("契約PDF削除エラー:", error);
  }

  revalidatePath("/employee-contracts");
  redirect("/employee-contracts");
}
