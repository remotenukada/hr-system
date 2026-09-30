import fs from "fs";
import path from "path";

import fontkit from "@pdf-lib/fontkit";
import { PDFDocument, rgb } from "pdf-lib";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

const FONT_CANDIDATES = [
  path.join(process.cwd(), "public/fonts/NotoSansJP-Regular.ttf"),
  path.join(process.cwd(), "public/fonts/NotoSansCJKjp-Regular.otf"),
  "/usr/share/fonts/opentype/noto/NotoSansCJK-Regular.ttc",
];

const pledgeItems = [
  "1. 就業規則、諸規程および関係法令を遵守し、職員としての職務を誠実に遂行します。",
  "2. 法人の信用を損なう行為、または不名誉となる行為は一切行いません。",
  "3. 規則に違反した場合は、規則に基づく処分を受けることに異議を申し立てません。",
  "4. 反社会的勢力の構成員または関係者ではなく、今後も関係を持ちません。",
  "5. 業務上知り得た個人情報および秘密を厳重に保持し、退職後も同様とします。",
  "6. 防災連絡網への個人電話番号掲載を許可し、他職員の電話番号を第三者へ漏らしません。",
  "7. 身元保証人は、本人が法令、就業規則および諸規程を遵守することを保証します。",
  "8. 身元保証人は、本人が故意または重大な過失により法人へ損害を与えた場合、本人と連帯して責任を負います。",
];

function wrapText(
  text: string,
  maxLength: number,
): string[] {
  const lines: string[] = [];

  for (let start = 0; start < text.length; start += maxLength) {
    lines.push(text.slice(start, start + maxLength));
  }

  return lines;
}

export async function GET() {
  const session = await auth();

  if (!session?.user?.id) {
    return new Response("Unauthorized", { status: 401 });
  }

  const employee = await prisma.employee.findUnique({
    where: {
      userId: session.user.id,
    },
  });

  if (!employee) {
    return new Response("Employee not found", {
      status: 404,
    });
  }

  const pledge = await prisma.employeePledge.findFirst({
    where: {
      employeeId: employee.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const fontPath = FONT_CANDIDATES.find((candidate) =>
    fs.existsSync(candidate),
  );

  if (!fontPath) {
    return new Response(
      "Japanese PDF font was not found",
      { status: 500 },
    );
  }

  const company = await prisma.companySetting.findFirst();

  const pdf = await PDFDocument.create();
  pdf.registerFontkit(fontkit);

  const fontBytes = fs.readFileSync(fontPath);
  const font = await pdf.embedFont(fontBytes, {
    subset: true,
  });

  const page = pdf.addPage([595.28, 841.89]);
  const { width, height } = page.getSize();

  const left = 55;
  const right = width - 55;
  let y = height - 55;

  const draw = (
    text: string,
    x: number,
    currentY: number,
    size = 10,
  ) => {
    page.drawText(text, {
      x,
      y: currentY,
      size,
      font,
      color: rgb(0.1, 0.1, 0.1),
    });
  };

  const drawLine = () => {
    page.drawLine({
      start: { x: left, y },
      end: { x: right, y },
      thickness: 0.6,
      color: rgb(0.65, 0.65, 0.65),
    });
  };

  const companyName =
    company?.companyName ?? "法人";

  const title = "誓 約 書";
  const titleWidth = font.widthOfTextAtSize(title, 20);

  draw(companyName, left, y, 10);
  y -= 42;

  draw(
    title,
    (width - titleWidth) / 2,
    y,
    20,
  );

  y -= 38;

  draw(
    "この度、職員として採用されるにあたり、法人の公共的使命を十分に理解し、",
    left,
    y,
    9,
  );

  y -= 17;

  draw(
    "以下の事項について誓約します。",
    left,
    y,
    9,
  );

  y -= 28;

  const recordTitle = "記";
  const recordWidth =
    font.widthOfTextAtSize(recordTitle, 12);

  draw(
    recordTitle,
    (width - recordWidth) / 2,
    y,
    12,
  );

  y -= 27;

  for (const item of pledgeItems) {
    for (const line of wrapText(item, 42)) {
      draw(line, left, y, 8.5);
      y -= 14;
    }

    y -= 5;
  }

  y -= 3;
  draw("以上", right - 25, y, 9);

  y -= 26;
  drawLine();
  y -= 22;

  const signedAt =
    pledge?.employeeSignedAt ??
    pledge?.createdAt ??
    null;

  draw(
    `提出日：${
      signedAt
        ? signedAt.toLocaleDateString("ja-JP")
        : "　　　年　　月　　日"
    }`,
    left,
    y,
    9,
  );

  y -= 24;

  draw(
    `本人住所：${employee.address ?? ""}`,
    left,
    y,
    9,
  );

  y -= 22;

  draw(
    `本人氏名：${
      pledge?.employeeSignerName ??
      `${employee.lastName} ${employee.firstName}`
    }`,
    left,
    y,
    9,
  );

  y -= 22;

  draw(
    `身元保証人氏名：${pledge?.guarantorName ?? ""}`,
    left,
    y,
    9,
  );

  y -= 22;

  draw(
    `身元保証人連絡先：${pledge?.guarantorEmail ?? ""}`,
    left,
    y,
    9,
  );

  y -= 30;
  drawLine();
  y -= 18;

  const method =
    pledge?.submissionMethod === "PAPER"
      ? "紙署名"
      : pledge
        ? "電子署名"
        : "未提出";

  draw(`提出方法：${method}`, left, y, 8);
  y -= 14;

  draw(
    `状態：${pledge?.status ?? "未提出"}`,
    left,
    y,
    8,
  );

  y -= 14;

  if (pledge?.documentHash) {
    const hashLines = wrapText(
      `文書ハッシュ（SHA-256）：${pledge.documentHash}`,
      68,
    );

    for (const line of hashLines) {
      draw(line, left, y, 6.5);
      y -= 10;
    }
  }

  if (pledge?.employeeSignedIp) {
    draw(
      `署名元IP：${pledge.employeeSignedIp}`,
      left,
      y,
      6.5,
    );
  }

  const pdfBytes = await pdf.save();

  const fileName =
    `pledge-${employee.employeeNo}.pdf`;

  return new Response(new Uint8Array(pdfBytes), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition":
        `inline; filename="${fileName}"`,
      "Cache-Control": "private, no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
