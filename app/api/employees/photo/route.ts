import { writeFile } from "fs/promises";
import { randomUUID } from "crypto";

export async function POST(req: Request) {
  const formData = await req.formData();

  const file = formData.get("file");

  if (!(file instanceof File)) {
    return Response.json(
      { error: "ファイル未選択" },
      { status: 400 }
    );
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const fileName =
    randomUUID() + "-" + file.name;

  const path =
    `public/uploads/employees/${fileName}`;

  await writeFile(path, buffer);

  return Response.json({
    path: `/uploads/employees/${fileName}`,
  });
}
