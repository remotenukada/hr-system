import { auth } from "@/auth";
import { mkdir, writeFile } from "fs/promises";
import { randomUUID } from "crypto";
import { extname, join } from "path";

const MAX_FILE_SIZE = 10 * 1024 * 1024;


export async function POST(req: Request) {
  const session = await auth();

  if (!session?.user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!["ADMIN","HR_MANAGER"].includes(session.user.role)) {
    return Response.json({ error: "Forbidden" }, { status: 403 });
  }

  const formData = await req.formData();

  const file = formData.get("file");

  if (!(file instanceof File)) {
    return Response.json(
      { error: "ファイルが選択されていません" },
      { status: 400 }
    );
  }


  if (file.size > MAX_FILE_SIZE) {
    return Response.json(
      { error: "ファイルサイズは10MB以下にしてください" },
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
