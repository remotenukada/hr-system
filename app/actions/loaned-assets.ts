"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function saveLoanedAssets(
  formData: FormData,
) {
  const employeeId = String(
    formData.get("employeeId") ?? "",
  );

  const returnedBy = String(
    formData.get("returnedBy") ?? "",
  );

  const memo = String(
    formData.get("memo") ?? "",
  );

  const assets = await prisma.loanedAsset.findMany({
    where: {
      employeeId,
    },
  });

  for (const asset of assets) {
    const returned = formData.has(asset.id);

    await prisma.loanedAsset.update({
      where: {
        id: asset.id,
      },
      data: {
        returned,
        returnedAt: returned ? new Date() : null,
        returnedBy: returned ? returnedBy : null,
        memo: memo || null,
      },
    });
  }

  const remaining = await prisma.loanedAsset.count({
    where: {
      employeeId,
      returned: false,
    },
  });

  if (remaining === 0) {
    await prisma.retirementChecklist.upsert({
      where: {
        employeeId,
      },
      create: {
        employeeId,
        memo: "貸与物返却完了",
      },
      update: {
        memo: "貸与物返却完了",
      },
    });
  }

  revalidatePath(
    `/retirement-management/${employeeId}/assets`,
  );
}
