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

  revalidatePath(
    `/retirement-management/${employeeId}/assets`,
  );
}
