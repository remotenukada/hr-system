"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

const DEFAULT_ASSETS = [
  "ノートPC",
  "社用スマホ",
  "ICカード",
  "ロッカー鍵",
  "制服",
  "名札",
];

export async function saveLoanedAssets(
  formData: FormData,
) {
  const employeeId = String(
    formData.get("employeeId") ?? "",
  );

  await prisma.loanedAsset.deleteMany({
    where: { employeeId },
  });

  await prisma.loanedAsset.createMany({
    data: DEFAULT_ASSETS.map((assetName) => ({
      employeeId,
      assetName,
      returned: formData.has(assetName),
      returnedAt: formData.has(assetName)
        ? new Date()
        : null,
    })),
  });

  revalidatePath(
    `/retirement-management/${employeeId}/assets`,
  );
}
