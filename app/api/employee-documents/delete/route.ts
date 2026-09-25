import { unlink } from "fs/promises";
import path from "path";

import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { auth } from "@/auth";
import { logAudit } from "@/lib/audit-log";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const session = await auth();

  if (
    !session?.user?.id ||
    !["ADMIN", "HR_MANAGER"].includes(session.user.role)
  ) {
    return NextResponse.json(
      { error: "削除権限がありません。" },
      { status: 403 },
    );
  }

  try {
    const body = await request.json();
    const id = String(body.id ?? "").trim();

    if (!id) {
      return NextResponse.json(
        { error: "文書IDが指定されていません。" },
        { status: 400 },
      );
    }

    const cookieStore = await cookies();
    const facilityScope =
      cookieStore.get("facilityScope")?.value ?? "ALL";

    const document = await prisma.personalDocument.findFirst({
      where: {
        id,
        ...(facilityScope === "ALL"
          ? {}
          : {
              employee: {
                facilityId: facilityScope,
              },
            }),
      },
      include: {
        employee: {
          select: {
            employeeNo: true,
            lastName: true,
            firstName: true,
          },
        },
      },
    });

    if (!document) {
      return NextResponse.json(
        { error: "文書が見つかりません。" },
        { status: 404 },
      );
    }

    const storageRoot = path.resolve(
      process.cwd(),
      "storage",
      "personal-documents",
    );

    const filePath = path.resolve(document.filePath);

    if (
      filePath !== storageRoot &&
      !filePath.startsWith(`${storageRoot}${path.sep}`)
    ) {
      return NextResponse.json(
        { error: "不正なファイルパスです。" },
        { status: 403 },
      );
    }

    try {
      await unlink(filePath);
    } catch (error) {
      const code =
        error instanceof Error && "code" in error
          ? String(error.code)
          : "";

      if (code !== "ENOENT") {
        console.error("個人文書ファイル削除エラー:", error);

        return NextResponse.json(
          { error: "PDFファイルを削除できませんでした。" },
          { status: 500 },
        );
      }
    }

    await prisma.personalDocument.delete({
      where: {
        id: document.id,
      },
    });

    await logAudit({
      userId: session.user.id,
      userName: session.user.name,
      action: "PERSONAL_DOCUMENT_DELETED",
      targetType: "PersonalDocument",
      targetId: document.id,
      description:
        `個人文書削除: ${document.employee.employeeNo} ` +
        `${document.employee.lastName}${document.employee.firstName} ` +
        `${document.title}`,
      beforeData: {
        employeeNo: document.employee.employeeNo,
        documentType: document.documentType,
        title: document.title,
        targetYear: document.targetYear,
        targetMonth: document.targetMonth,
        publishAt: document.publishAt,
        originalFileName: document.originalFileName,
      },
    });

    return NextResponse.json({
      message: "個人文書を削除しました。",
    });
  } catch (error) {
    console.error("個人文書削除エラー:", error);

    return NextResponse.json(
      { error: "削除に失敗しました。" },
      { status: 500 },
    );
  }
}
