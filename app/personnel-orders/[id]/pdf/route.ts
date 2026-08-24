import fs from "fs";
import fontkit from "@pdf-lib/fontkit";
import { PDFDocument, rgb } from "pdf-lib";

import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

const FONT_PATH =
  "/usr/share/fonts/opentype/ipafont-mincho/ipam.ttf";

type RouteContext = {
  params: Promise<{ id: string }>;
};

function getActionLabel(action: string) {
  const labels: Record<string, string> = {
    HIRED: "採用辞令",
    TRANSFER: "異動辞令",
    POSITION_CHANGE: "役職変更辞令",
    LEAVE_STARTED: "休職辞令",
    RETURNED: "復職辞令",
    RETIRED: "退職辞令",
  };

  return labels[action] ?? "人事辞令";
}

function formatJapaneseDate(date: Date) {
  return new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

export async function GET(
  _request: Request,
  { params }: RouteContext,
) {
  const { id } = await params;

  const history = await prisma.employmentHistory.findUnique({
    where: { id },
    include: { employee: true },
  });

  if (!history) {
    return new Response("Personnel order not found", {
      status: 404,
    });
  }

  if (!fs.existsSync(FONT_PATH)) {
    return new Response("Japanese font not found", {
      status: 500,
    });
  }

  const company = await prisma.companySetting.findFirst();

  const pdfDoc = await PDFDocument.create();
  pdfDoc.registerFontkit(fontkit);

  const fontBytes = fs.readFileSync(FONT_PATH);
  const font = await pdfDoc.embedFont(fontBytes, {
    subset: false,
  });

  const page = pdfDoc.addPage([595.28, 841.89]);
  const { width, height } = page.getSize();

  function drawCentered(
    text: string,
    y: number,
    size: number,
  ) {
    const textWidth = font.widthOfTextAtSize(text, size);

    page.drawText(text, {
      x: (width - textWidth) / 2,
      y,
      size,
      font,
      color: rgb(0.05, 0.05, 0.05),
    });
  }

  drawCentered("辞令", height - 100, 24);
  drawCentered(
    getActionLabel(history.action),
    height - 145,
    14,
  );

  page.drawText(
    `社員番号 ${history.employee.employeeNo}`,
    {
      x: 80,
      y: height - 225,
      size: 12,
      font,
    },
  );

  page.drawText(
    `氏名 ${history.employee.lastName} ${history.employee.firstName} 殿`,
    {
      x: 80,
      y: height - 260,
      size: 14,
      font,
    },
  );

  drawCentered(
    formatJapaneseDate(history.effectiveDate),
    height - 330,
    12,
  );

  const content = history.reason ?? "人事発令を命ずる。";
  const lines = content.match(/.{1,28}/g) ?? [content];

  lines.forEach((line, index) => {
    drawCentered(line, height - 390 - index * 24, 13);
  });

  drawCentered("以上", height - 500, 12);

  const companyName = company?.companyName ?? "";
  const representative = company?.representativeName ?? "";

  page.drawText(companyName, {
    x: 330,
    y: 150,
    size: 11,
    font,
  });

  page.drawText(`代表 ${representative}`, {
    x: 330,
    y: 120,
    size: 11,
    font,
  });

  const bytes = await pdfDoc.save();
  const fileName =
    `personnel-order-${history.employee.employeeNo}-${history.id}.pdf`;

  return new Response(bytes.buffer as ArrayBuffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition":
        `inline; filename="${fileName}"`,
    },
  });
}
