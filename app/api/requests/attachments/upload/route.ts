import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";

const MAX_FILE_SIZE = 10 * 1024 * 1024;

const ALLOWED_MIME_TYPES = new Set([
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

function getExtension(fileName: string) {
  return path.extname(fileName).toLowerCase();
}

export async function POST(request: Request) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json(
      { error: "ログインが必要です。" },
      { status: 401 }
    );
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: "ファイルが選択されていません。" },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "ファイルサイズは10MB以下にしてください。" },
        { status: 400 }
      );
    }

    if (!ALLOWED_MIME_TYPES.has(file.type)) {
      return NextResponse.json(
        { error: "対応していないファイル形式です。" },
        { status: 400 }
      );
    }

    const uploadDir = path.join(
      process.cwd(),
      "public",
      "uploads",
      "requests"
    );

    await mkdir(uploadDir, { recursive: true });

    const ext = getExtension(file.name);
    const storedFileName = `${randomUUID()}${ext}`;
    const filePath = path.join(uploadDir, storedFileName);

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    await writeFile(filePath, buffer);

    return NextResponse.json({
      fileName: file.name,
      filePath: `/uploads/requests/${storedFileName}`,
      fileSize: file.size,
      mimeType: file.type,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "ファイルアップロードに失敗しました。" },
      { status: 500 }
    );
  }
}
