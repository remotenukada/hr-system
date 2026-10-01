import fs from "fs";

import fontkit from "@pdf-lib/fontkit";
import { PDFDocument, rgb } from "pdf-lib";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

const FONT_PATH = "/usr/share/fonts/opentype/ipafont-gothic/ipag.ttf";

const ITEMS = [
  "貴法人の就業規則、諸規程および関係法令を遵守し、職員としての職務を誠実に遂行いたします。",
  "貴法人の信用を損なう行為、または不名誉となる行為は一切いたしません。",
  "貴法人の規則に違反した場合は、規則に基づく処分を受けることに異議を申し立てません。",
  "反社会的勢力の構成員または関係者ではなく、今後も関係を持たないことを誓約いたします。",
  "業務上知り得た患者およびその家族の個人情報・秘密を厳重に保持し、退職後も同様といたします。",
  "防災連絡網への個人電話番号掲載を許可し、他職員の電話番号を第三者へ漏らしません。",
  "身元保証人は、本人が法令、就業規則および諸規程を遵守することを保証いたします。",
  "身元保証人は、本人が故意または重大な過失により貴法人へ損害を与えた場合、本人と連帯して責任を負います。",
];

function formatJapaneseDate(date?: Date | null) {
  if (!date) return "令和  年  月  日";

  const y = date.getFullYear();
  const eraYear = y - 2018;

  return `令和${eraYear}年${date.getMonth() + 1}月${date.getDate()}日`;
}

function statusLabel(status?: string) {
  switch (status) {
    case "GUARANTOR_PENDING":
      return "保証人確認待ち";
    case "GUARANTOR_CONFIRMED":
      return "保証人確認済";
    case "PAPER_UPLOADED":
      return "紙提出済";
    case "COMPLETED":
      return "手続完了";
    case "REJECTED":
      return "差戻し";
    default:
      return "未提出";
  }
}

export async function GET() {
  const session = await auth();

  if (!session?.user?.id) {
    return new Response("Unauthorized", { status: 401 });
  }

  const employee = await prisma.employee.findUnique({
    where: { userId: session.user.id },
  });

  if (!employee) {
    return new Response("Employee not found", {
      status: 404,
    });
  }

  const pledge = await prisma.employeePledge.findFirst({
    where: { employeeId: employee.id },
    orderBy: { createdAt: "desc" },
  });

  const company = await prisma.companySetting.findFirst();

  if (!fs.existsSync(FONT_PATH)) {
    return new Response(
      "Japanese PDF font was not found",
      { status: 500 },
    );
  }

  const pdf = await PDFDocument.create();
  pdf.registerFontkit(fontkit);

  const font = await pdf.embedFont(
    fs.readFileSync(FONT_PATH),
    { subset: true },
  );

  const page = pdf.addPage([595.28, 841.89]);
  const { width, height } = page.getSize();

  const left = 48;
  const right = width - 48;
  const contentWidth = right - left;
  const black = rgb(0.06, 0.06, 0.06);
  const gray = rgb(0.42, 0.42, 0.42);

  let y = height - 48;

  const draw = (
    text: string,
    x: number,
    currentY: number,
    size = 9,
    color = black,
  ) => {
    page.drawText(text, {
      x,
      y: currentY,
      size,
      font,
      color,
    });
  };

  const center = (
    text: string,
    currentY: number,
    size: number,
  ) => {
    const textWidth = font.widthOfTextAtSize(text, size);
    draw(text, (width - textWidth) / 2, currentY, size);
  };

  const line = (
    startX: number,
    endX: number,
    currentY: number,
  ) => {
    page.drawLine({
      start: { x: startX, y: currentY },
      end: { x: endX, y: currentY },
      thickness: 0.55,
      color: gray,
    });
  };

  const wrap = (
    text: string,
    maxWidth: number,
    size: number,
  ) => {
    const lines: string[] = [];
    let current = "";

    for (const char of text) {
      const candidate = current + char;

      if (
        current &&
        font.widthOfTextAtSize(candidate, size) >
          maxWidth
      ) {
        lines.push(current);
        current = char;
      } else {
        current = candidate;
      }
    }

    if (current) lines.push(current);
    return lines;
  };

  const companyName =
    company?.companyName?.trim() || "法人";

  const representativeTitle =
    company?.representativeTitle?.trim() || "代表者";

  const representativeName =
    company?.representativeName?.trim() || "";

  draw(companyName, left + 8, y, 10);
  y -= 21;

  draw(
    `${representativeName} 殿`,
    left + 8,
    y,
    10,
  );

  y -= 39;

  center("誓 約 書", y, 20);
  y -= 34;

  const introduction =
    "この度、貴法人の職員として勤務するにあたり、貴法人の公共的使命を十分に理解し、下記の事項について保証人と連署のうえ誓約いたします。";

  for (const textLine of wrap(
    introduction,
    contentWidth,
    9,
  )) {
    draw(textLine, left, y, 9);
    y -= 14;
  }

  y -= 10;
  center("記", y, 11);
  y -= 24;

  ITEMS.forEach((item, index) => {
    const numberText = `${index + 1}.`;
    const itemLines = wrap(
      item,
      contentWidth - 27,
      8.4,
    );

    draw(numberText, left + 4, y, 8.4);

    itemLines.forEach((itemLine, lineIndex) => {
      draw(
        itemLine,
        left + 29,
        y - lineIndex * 12,
        8.4,
      );
    });

    y -= itemLines.length * 12 + 5;
  });

  draw("以上", right - 24, y, 8.5);
  y -= 24;

  draw(
    formatJapaneseDate(
      pledge?.employeeSignedAt ?? pledge?.createdAt,
    ),
    left + 8,
    y,
    9,
  );

  y -= 30;

  const labelX = left + 28;
  const valueX = left + 100;
  const markX = right - 62;

  // 本人欄
  draw("本人", left + 8, y, 10);
  y -= 25;

  draw("住 所", labelX, y, 9);
  draw(employee.address ?? "", valueX, y, 9);
  line(valueX - 4, right - 8, y - 5);

  y -= 27;

  draw("氏 名", labelX, y, 9);
  draw(
    pledge?.employeeSignerName ??
      `${employee.lastName} ${employee.firstName}`,
    valueX,
    y,
    9.5,
  );
  line(valueX - 4, markX - 10, y - 5);

  page.drawRectangle({
    x: markX,
    y: y - 10,
    width: 54,
    height: 24,
    borderColor: gray,
    borderWidth: 0.6,
  });

  draw(
    pledge?.submissionMethod === "ELECTRONIC"
      ? "電子署名済"
      : "印",
    markX + 6,
    y - 1,
    7.2,
  );

  y -= 38;

  // 身元保証人欄
  draw("身元保証人", left + 8, y, 10);
  y -= 25;

  draw("住 所", labelX, y, 9);

  const addressLines = wrap(
    pledge?.guarantorAddress ?? "",
    right - valueX - 8,
    8.5,
  );

  if (addressLines.length > 0) {
    draw(addressLines[0], valueX, y, 8.5);
  }

  line(valueX - 4, right - 8, y - 5);

  y -= 27;

  draw("氏 名", labelX, y, 9);
  draw(
    pledge?.guarantorName ?? "",
    valueX,
    y,
    9.5,
  );
  line(valueX - 4, markX - 10, y - 5);

  page.drawRectangle({
    x: markX,
    y: y - 10,
    width: 54,
    height: 24,
    borderColor: gray,
    borderWidth: 0.6,
  });

  draw(
    pledge?.guarantorConfirmedAt
      ? "確認済"
      : "印",
    markX + 12,
    y - 1,
    7.5,
  );

  y -= 27;

  draw("続 柄", labelX, y, 9);
  draw(
    pledge?.guarantorRelation ?? "",
    valueX,
    y,
    9,
  );
  line(valueX - 4, left + 255, y - 5);

  draw("電話番号", left + 275, y, 9);
  draw(
    pledge?.guarantorPhone ?? "",
    left + 345,
    y,
    8.8,
  );
  line(left + 340, right - 8, y - 5);

  y -= 34;

  // 電子管理情報
  line(left, right, y);
  y -= 14;

  const method =
    pledge?.submissionMethod === "PAPER"
      ? "紙署名"
      : pledge
        ? "電子署名"
        : "未提出";

  draw(
    `提出方法：${method}`,
    left,
    y,
    6.5,
    gray,
  );

  draw(
    `状態：${statusLabel(pledge?.status)}`,
    left + 145,
    y,
    6.5,
    gray,
  );

  if (pledge?.guarantorConfirmedAt) {
    draw(
      `保証人確認日時：${pledge.guarantorConfirmedAt.toLocaleString("ja-JP")}`,
      left + 295,
      y,
      6.2,
      gray,
    );
  }

  y -= 12;

  if (pledge?.documentHash) {
    draw(
      `文書番号：${pledge.documentHash.slice(0, 24)}`,
      left,
      y,
      5.8,
      gray,
    );
  }

  const pdfBytes = await pdf.save();

  return new Response(
    new Uint8Array(pdfBytes),
    {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition":
          `inline; filename="pledge_${employee.employeeNo}.pdf"`,
        "Cache-Control": "private, no-store",
        "X-Content-Type-Options": "nosniff",
      },
    },
  );
}
