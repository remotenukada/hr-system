import { randomUUID } from "crypto";
import { mkdir, writeFile } from "fs/promises";
import path from "path";

import JSZip from "jszip";
import "pdf-parse/worker";
import { PDFParse } from "pdf-parse";
import { NextResponse } from "next/server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

const MAX_ZIP_SIZE = 100 * 1024 * 1024;
const MAX_PDF_SIZE = 10 * 1024 * 1024;

const DOCUMENT_TYPES = {
  PAYSLIP: "給与明細",
  WITHHOLDING: "源泉徴収票",
  INSURANCE: "社会保険通知",
} as const;

type DocumentType = keyof typeof DOCUMENT_TYPES;

function isDocumentType(value: string): value is DocumentType {
  return value in DOCUMENT_TYPES;
}

function normalizeName(value: string) {
  return value
    .normalize("NFKC")
    .replace(/\s+/g, "")
    .replace(/殿$/u, "")
    .trim();
}

function normalizeEmployeeNo(value: string) {
  const normalized = value.normalize("NFKC").trim();

  if (/^\d+$/.test(normalized)) {
    return normalized.replace(/^0+(?=\d)/, "");
  }

  return normalized;
}

function extractEmployeeNoFromFileName(fileName: string) {
  const baseName = path.basename(
    fileName,
    path.extname(fileName),
  );

  const exactSixDigits = baseName.match(/(?:^|\D)(\d{6})(?:\D|$)/);

  return exactSixDigits?.[1] ?? null;
}

function extractNameFromFileName(fileName: string) {
  const baseName = path.basename(
    fileName,
    path.extname(fileName),
  );

  const withoutPrefix = baseName.replace(
    /^(?:給与明細書?|源泉徴収票|社会保険通知)[_\s]*/u,
    "",
  );

  const personPart =
    withoutPrefix.split(
      /[_\s]*(?:令和|平成|\d{4}年)/u,
    )[0] ?? "";

  const normalized = normalizeName(personPart);

  return normalized || null;
}

async function extractEmployeeNoFromPdf(pdfBuffer: Buffer) {
  const parser = new PDFParse({
    data: pdfBuffer,
  });

  try {
    const result = await parser.getText();
    const normalizedText = result.text.normalize("NFKC");

    const patterns = [
      /社員コード\s*[:：]?\s*(\d{6})/u,
      /職員コード\s*[:：]?\s*(\d{6})/u,
      /社員番号\s*[:：]?\s*(\d{6})/u,
      /職員番号\s*[:：]?\s*(\d{6})/u,
    ];

    for (const pattern of patterns) {
      const match = normalizedText.match(pattern);

      if (match?.[1]) {
        return match[1];
      }
    }

    return null;
  } finally {
    await parser.destroy();
  }
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

    const publishAtRaw = String(formData.get("publishAt") ?? "");
    const requestedTitle = String(formData.get("title") ?? "").trim();

    if (!isDocumentType(documentTypeRaw)) {
      return NextResponse.json(
        { error: "文書区分を選択してください。" },
        { status: 400 },
      );
    }

    const documentType = documentTypeRaw;

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
        documentType === "PAYSLIP" &&
        targetMonth === null
      ) ||
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

    const targetLabel =
      targetMonth === null
        ? `${targetYear}年`
        : `${targetYear}年${targetMonth}月`;

    const title =
      requestedTitle ||
      `${targetLabel} ${DOCUMENT_TYPES[documentType]}`;

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
      targetMonth === null
        ? "annual"
        : String(targetMonth).padStart(2, "0"),
    );

    await mkdir(uploadDir, { recursive: true });

    for (const entry of entries) {
      const originalFileName = path.basename(entry.name);
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
      const fileEmployeeNo =
        extractEmployeeNoFromFileName(originalFileName);

      const pdfEmployeeNo =
        fileEmployeeNo ??
        await extractEmployeeNoFromPdf(pdfBuffer);

      let employee = pdfEmployeeNo
        ? await prisma.employee.findUnique({
            where: {
              employeeNo: pdfEmployeeNo,
            },
            select: {
              id: true,
              employeeNo: true,
            },
          })
        : null;

      if (!employee && pdfEmployeeNo) {
        const normalizedEmployeeNo =
          normalizeEmployeeNo(pdfEmployeeNo);

        const numberCandidates =
          await prisma.employee.findMany({
            select: {
              id: true,
              employeeNo: true,
            },
          });

        const numberMatches = numberCandidates.filter(
          (candidate) =>
            normalizeEmployeeNo(candidate.employeeNo) ===
            normalizedEmployeeNo,
        );

        if (numberMatches.length === 1) {
          employee = numberMatches[0];
        } else if (numberMatches.length > 1) {
          failures.push(
            `${originalFileName}: 同一と判断される職員番号が複数あります。`,
          );
          continue;
        }
      }

      if (!employee) {
        const fileNamePerson =
          extractNameFromFileName(originalFileName);

        if (fileNamePerson) {
          const candidates = await prisma.employee.findMany({
            select: {
              id: true,
              employeeNo: true,
              lastName: true,
              firstName: true,
            },
          });

          const matched = candidates.filter((candidate) =>
            normalizeName(
              `${candidate.lastName}${candidate.firstName}`,
            ) === fileNamePerson
          );

          if (matched.length === 1) {
            employee = {
              id: matched[0].id,
              employeeNo: matched[0].employeeNo,
            };
          } else if (matched.length > 1) {
            failures.push(
              `${originalFileName}: 同姓同名の職員が複数います。`,
            );
            continue;
          }
        }
      }

      if (!employee) {
        failures.push(
          `${originalFileName}: 職員番号または氏名を照合できません。`,
        );
        continue;
      }

      const existing = await prisma.personalDocument.findFirst({
        where: {
          employeeId: employee.id,
          documentType,
          targetYear,
          targetMonth,
        },
      });

      if (existing) {
        failures.push(
          `${originalFileName}: 同じ文書区分・対象年月の文書が登録済みです。`,
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
          documentType,
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
      message: "個人文書の振り分け処理が完了しました。",
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
