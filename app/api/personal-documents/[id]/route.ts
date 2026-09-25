import { readFile, realpath } from "fs/promises";
import path from "path";

import { NextResponse } from "next/server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(
  request: Request,
  { params }: Props,
) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json(
      { error: "ログインが必要です。" },
      { status: 401 },
    );
  }

  const { id } = await params;
  const isHR =
    session.user.role === "ADMIN" ||
    session.user.role === "HR_MANAGER";

  const document = isHR
    ? await prisma.personalDocument.findUnique({
        where: { id },
      })
    : await prisma.personalDocument.findFirst({
        where: {
          id,
          publishAt: {
            lte: new Date(),
          },
          employee: {
            userId: session.user.id,
          },
        },
      });

  if (!document) {
    return NextResponse.json(
      { error: "文書が見つかりません。" },
      { status: 404 },
    );
  }

  try {
    const storageRoot = await realpath(
      path.join(
        process.cwd(),
        "storage",
        "personal-documents",
      ),
    );

    const resolvedFilePath = await realpath(
      document.filePath,
    );

    if (
      resolvedFilePath !== storageRoot &&
      !resolvedFilePath.startsWith(
        `${storageRoot}${path.sep}`,
      )
    ) {
      return NextResponse.json(
        { error: "不正なファイルパスです。" },
        { status: 403 },
      );
    }

    const file = await readFile(resolvedFilePath);

    const rawFileName =
      document.originalFileName ??
      `${document.title}.pdf`;

    const safeFileName = rawFileName.replace(
      /[\r\n"]/g,
      "",
    );

    return new NextResponse(file, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition":
          `inline; filename*=UTF-8''${encodeURIComponent(safeFileName)}`,
        "Cache-Control":
          "private, no-store, max-age=0",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    console.error(
      "個人文書PDF取得エラー:",
      error,
    );

    return NextResponse.json(
      { error: "PDFファイルを取得できません。" },
      { status: 404 },
    );
  }
}
