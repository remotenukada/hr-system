import { mkdir, writeFile } from "fs/promises";
import { randomUUID } from "crypto";
import { extname, join } from "path";

export async function POST(req: Request) {
  const formData = await req.formData();

  const file = formData.get("file");

  if (!(file instanceof File)) {
    return Response.json(
      { error: "ファイルが選択されていません" },
      { status: 400 }
    );
  }

  if (!file.type.startsWith("image/")) {
    return Response.json(
      { error: "画像ファイルを選択してください" },
      { status: 400 }
    );
  }

  const uploadDir = join(
    process.cwd(),
    "public",
    "uploads",
    "employees"
  );

  await mkdir(uploadDir, {
    recursive: true,
  });

  const ext = extname(file.name) || ".jpg";
  const fileName = `${randomUUID()}${ext}`;
  const filePath = join(uploadDir, fileName);

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  await writeFile(filePath, buffer);

  return Response.json({
    path: `/uploads/employees/${fileName}`,
  });
}
