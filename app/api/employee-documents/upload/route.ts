import { randomUUID } from "crypto";
import { mkdir, writeFile } from "fs/promises";
import path from "path";

import JSZip from "jszip";
import { NextResponse } from "next/server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

const MAX_ZIP_SIZE = 100 * 1024 * 1024;
const MAX_PDF_SIZE = 10 * 1024 * 1024;

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
    const zipFile = formData.get("zipFile");

    if (!(zipFile instanceof File)) {
      return NextResponse.json(
        { error: "ZIPファイルを選択してください。" },
        { status: 400 },
      );
    }

    if (zipFile.size > MAX_ZIP_SIZE) {
      return NextResponse.json(
        { error: "ZIPファイルは100MB以下にしてください。" },
        { status: 400 },
      );
    }

    const targetYear = Number(formData.get("targetYear"));
    const targetMonth = Number(formData.get("targetMonth"));
    const publishAtRaw = String(formData.get("publishAt") ?? "");
    const requestedTitle = String(formData.get("title") ?? "").trim();

    if (
      !Number.isInteger(targetYear) ||
      targetYear < 2000 ||
      targetYear > 2100 ||
      !Number.isInteger(targetMonth) ||
      targetMonth < 1 ||
      targetMonth > 12 ||
      !publishAtRaw
    ) {
      return NextResponse.json(
        { error: "対象年月と公開日を確認してください。" },
        { status: 400 },
      );
    }

    const publishAt = new Date(`${publishAtRaw}T00:00:00+09:00`);

    if (Number.isNaN(publishAt.getTime())) {
      return NextResponse.json(
        { error: "公開日の形式が正しくありません。" },
        { status: 400 },
      );
    }

    const title =
      requestedTitle ||
      `${targetYear}年${targetMonth}月 給与明細`;

    const zipBuffer = Buffer.from(await zipFile.arrayBuffer());
    const zip = await JSZip.loadAsync(zipBuffer, {
      checkCRC32: true,
    });

    const entries = Object.values(zip.files).filter(
      (entry) =>
        !entry.dir &&
        path.extname(entry.name).toLowerCase() === ".pdf",
    );

    if (entries.length === 0) {
      return NextResponse.json(
        { error: "ZIP内にPDFファイルがありません。" },
        { status: 400 },
      );
    }

    const failures: string[] = [];
    let successCount = 0;

    const uploadDir = path.join(
      process.cwd(),
      "storage",
      "personal-documents",
      String(targetYear),
      String(targetMonth).padStart(2, "0"),
    );

    await mkdir(uploadDir, { recursive: true });

    for (const entry of entries) {
      const originalFileName = path.basename(entry.name);
      const employeeNo = path.basename(
        originalFileName,
        path.extname(originalFileName),
      ).trim();

      if (!employeeNo) {
        failures.push(`${originalFileName}: 職員番号を判定できません。`);
        continue;
      }

      const employee = await prisma.employee.findUnique({
        where: { employeeNo },
        select: { id: true },
      });

      if (!employee) {
        failures.push(
          `${originalFileName}: 職員番号 ${employeeNo} が見つかりません。`,
        );
        continue;
      }

      const existing = await prisma.personalDocument.findFirst({
        where: {
          employeeId: employee.id,
          documentType: "PAYSLIP",
          targetYear,
          targetMonth,
        },
      });

      if (existing) {
        failures.push(
          `${originalFileName}: 同じ対象年月の給与明細が登録済みです。`,
        );
        continue;
      }

      const pdfBuffer = await entry.async("nodebuffer");

      if (pdfBuffer.length > MAX_PDF_SIZE) {
        failures.push(
          `${originalFileName}: PDFは10MB以下にしてください。`,
        );
        continue;
      }

      if (pdfBuffer.subarray(0, 4).toString() !== "%PDF") {
        failures.push(
          `${originalFileName}: PDF形式を確認できません。`,
        );
        continue;
      }

      const storedFileName = `${randomUUID()}.pdf`;
      const absolutePath = path.join(uploadDir, storedFileName);

      await writeFile(absolutePath, pdfBuffer, {
        flag: "wx",
      });

      await prisma.personalDocument.create({
        data: {
          employeeId: employee.id,
          documentType: "PAYSLIP",
          title,
          targetYear,
          targetMonth,
          publishAt,
          filePath: absolutePath,
          originalFileName,
        },
      });

      successCount += 1;
    }

    return NextResponse.json({
      message: "給与明細の振り分け処理が完了しました。",
      successCount,
      failedCount: failures.length,
      failures,
    });
  } catch (error) {
    console.error("給与明細ZIPアップロードエラー:", error);

    return NextResponse.json(
      { error: "ZIPファイルの処理に失敗しました。" },
      { status: 500 },
    );
  }
}
