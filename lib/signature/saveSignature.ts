import fs from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";

export async function saveSignature(
  contractId: string,
  base64Image: string,
) {
  const dir = path.join(
    "/data/hr-system/signatures/contracts",
    contractId,
  );

  await fs.mkdir(dir, { recursive: true });

  const fileName = `${randomUUID()}.png`;
  const filePath = path.join(dir, fileName);

  const buffer = Buffer.from(
    base64Image.replace(/^data:image\/png;base64,/, ""),
    "base64",
  );

  await fs.writeFile(filePath, buffer);

  return {
    fileName,
    filePath,
    publicPath: `/signatures/contracts/${contractId}/${fileName}`,
  };
}
