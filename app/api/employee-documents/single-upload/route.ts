import { randomUUID } from "crypto";
import { mkdir, writeFile } from "fs/promises";
import path from "path";

import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

const MAX_FILE_SIZE = 10 * 1024 * 1024;

const DOCUMENT_TYPES = {
  PAYSLIP: "給与明細",
  WITHHOLDING: "源泉徴収票",
  INSURANCE: "社会保険通知",
} as const;

type DocumentType = keyof typeof DOCUMENT_TYPES;

function isDocumentType(value: string): value is DocumentType {
  return value in DOCUMENT_TYPES;
}

export async function POST(request: Request) {
  const session = await auth();

  if (
    !session?.user ||
    !["ADMIN", "HR_MANAGER"].includes(session.user.role)
  ) {
    return NextResponse.json(
      { error: "この操作を実行する権限がありません。" },
      { status: 403 },
    );
  }

  try {
    const formData = await request.formData();

    const employeeId = String(
      formData.get("employeeId") ?? "",
    ).trim();

    const documentTypeRaw = String(
      formData.get("documentType") ?? "",
    );

    const targetYear = Number(formData.get("targetYear"));
    const targetMonthRaw = String(
      formData.get("targetMonth") ?? "",
    ).trim();

    const targetMonth = targetMonthRaw
      ? Number(targetMonthRaw)
      : null;

    const publishAtRaw = String(
      formData.get("publishAt") ?? "",
    );

    const requestedTitle = String(
      formData.get("title") ?? "",
    ).trim();

    const file = formData.get("file");

    if (!employeeId || !isDocumentType(documentTypeRaw)) {
      return NextResponse.json(
        { error: "職員と文書区分を確認してください。" },
        { status: 400 },
      );
    }

    if (
      !Number.isInteger(targetYear) ||
      targetYear < 2000 ||
      targetYear > 2100 ||
      (
        targetMonth !== null &&
        (
          !Number.isInteger(targetMonth) ||
          targetMonth < 1 ||
          targetMonth > 12
        )
      ) ||
      (
        documentTypeRaw === "PAYSLIP" &&
        targetMonth === null
      )
    ) {
      return NextResponse.json(
        { error: "対象年月を確認してください。" },
        { status: 400 },
      );
    }

    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: "PDFファイルを選択してください。" },
        { status: 400 },
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "PDFファイルは10MB以下にしてください。" },
        { status: 400 },
      );
    }

    const pdfBuffer = Buffer.from(await file.arrayBuffer());

    if (pdfBuffer.subarray(0, 4).toString() !== "%PDF") {
      return NextResponse.json(
        { error: "PDF形式を確認できません。" },
        { status: 400 },
      );
    }

    const publishAt = new Date(
      `${publishAtRaw}T00:00:00+09:00`,
    );

    if (Number.isNaN(publishAt.getTime())) {
      return NextResponse.json(
        { error: "公開日を確認してください。" },
        { status: 400 },
      );
    }

    const cookieStore = await cookies();
    const facilityScope =
      cookieStore.get("facilityScope")?.value ?? "ALL";

    const employee = await prisma.employee.findFirst({
      where: {
        id: employeeId,
        ...(facilityScope === "ALL"
          ? {}
          : {
              facilityId: facilityScope,
            }),
      },
      select: {
        id: true,
      },
    });

    if (!employee) {
      return NextResponse.json(
        { error: "選択した職員が見つかりません。" },
        { status: 404 },
      );
    }

    const existing =
      await prisma.personalDocument.findFirst({
        where: {
          employeeId,
          documentType: documentTypeRaw,
          targetYear,
          targetMonth,
        },
      });

    if (existing) {
      return NextResponse.json(
        {
          error:
            "同じ文書区分・対象年月の文書が登録済みです。",
        },
        { status: 409 },
      );
    }

    const targetLabel =
      targetMonth === null
        ? `${targetYear}年`
        : `${targetYear}年${targetMonth}月`;

    const title =
      requestedTitle ||
      `${targetLabel} ${DOCUMENT_TYPES[documentTypeRaw]}`;

    const uploadDir = path.join(
      process.cwd(),
      "storage",
      "personal-documents",
      documentTypeRaw.toLowerCase(),
      String(targetYear),
      targetMonth === null
        ? "annual"
        : String(targetMonth).padStart(2, "0"),
    );

    await mkdir(uploadDir, { recursive: true });

    const storedFileName = `${randomUUID()}.pdf`;
    const absolutePath = path.join(
      uploadDir,
      storedFileName,
    );

    await writeFile(absolutePath, pdfBuffer, {
      flag: "wx",
    });

    await prisma.personalDocument.create({
      data: {
        employeeId,
        documentType: documentTypeRaw,
        title,
        targetYear,
        targetMonth,
        publishAt,
        filePath: absolutePath,
        originalFileName: path.basename(file.name),
      },
    });

    return NextResponse.json({
      message: "個別文書を登録しました。",
    });
  } catch (error) {
    console.error("個別文書登録エラー:", error);

    return NextResponse.json(
      { error: "個別文書の登録に失敗しました。" },
      { status: 500 },
    );
  }
}
