import fs from "fs";
import fontkit from "@pdf-lib/fontkit";
import { PDFDocument, rgb } from "pdf-lib";
import { cookies } from "next/headers";

import { prisma } from "@/lib/prisma";
import { requireHRManager } from "@/lib/auth-guard";
import { logAudit } from "@/lib/audit-log";

export const runtime = "nodejs";

const FONT_PATH =
  "/usr/share/fonts/opentype/ipafont-mincho/ipam.ttf";

type RouteContext = {
  params: Promise<{ id: string }>;
};

const residenceTypeLabels: Record<string, string> = {
  RENTAL: "賃貸",
  CORPORATE_HOUSING: "法人契約住宅",
  OWNED: "持家",
};

const notificationTypeLabels: Record<string, string> = {
  NEW: "新規",
  ADDRESS_CHANGE: "住所変更",
  CONTENT_CHANGE: "内容変更",
};

const ownershipTypeLabels: Record<string, string> = {
  SELF: "本人名義",
  JOINT: "共同名義",
  FAMILY: "家族名義",
};

const statusLabels: Record<string, string> = {
  PENDING: "承認待ち",
  APPROVED: "承認済み",
  REJECTED: "差戻し",
  CANCELLED: "取消済み",
};

function formatDate(value: Date | null | undefined) {
  return value
    ? new Intl.DateTimeFormat("ja-JP", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(value)
    : "-";
}

function formatMoney(value: number | null | undefined) {
  return value != null
    ? `${value.toLocaleString("ja-JP")}円`
    : "-";
}

export async function GET(
  _request: Request,
  { params }: RouteContext,
) {
  const session = await requireHRManager();
  const { id } = await params;

  const cookieStore = await cookies();
  const facilityScope =
    cookieStore.get("facilityScope")?.value ?? "ALL";

  const request = await prisma.residenceRequest.findFirst({
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
        include: {
          facility: true,
          department: true,
        },
      },
      attachments: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!request) {
    return new Response("Not Found", { status: 404 });
  }

  const pdfDoc = await PDFDocument.create();
  pdfDoc.registerFontkit(fontkit);

  const fontBytes = fs.readFileSync(FONT_PATH);
  const font = await pdfDoc.embedFont(fontBytes);

  const page = pdfDoc.addPage([595.28, 841.89]);
  const width = page.getWidth();
  const height = page.getHeight();

  const left = 38;
  const right = width - 38;
  const tableWidth = right - left;

  function drawText(
    value: string,
    x: number,
    y: number,
    size = 8.5,
  ) {
    page.drawText(value || "-", {
      x,
      y,
      size,
      font,
      color: rgb(0, 0, 0),
    });
  }

  function centered(value: string, y: number, size: number) {
    const textWidth = font.widthOfTextAtSize(value, size);
    drawText(value, (width - textWidth) / 2, y, size);
  }

  function box(
    x: number,
    y: number,
    boxWidth: number,
    boxHeight: number,
  ) {
    page.drawRectangle({
      x,
      y,
      width: boxWidth,
      height: boxHeight,
      borderWidth: 0.7,
      borderColor: rgb(0, 0, 0),
    });
  }

  function line(
    x1: number,
    y1: number,
    x2: number,
    y2: number,
  ) {
    page.drawLine({
      start: { x: x1, y: y1 },
      end: { x: x2, y: y2 },
      thickness: 0.7,
    });
  }

  function row(
    y: number,
    label: string,
    value: string,
    rowHeight = 25,
    labelWidth = 112,
  ) {
    box(left, y, tableWidth, rowHeight);
    line(left + labelWidth, y, left + labelWidth, y + rowHeight);
    drawText(label, left + 6, y + 8, 8.5);
    drawText(value || "-", left + labelWidth + 7, y + 8, 8.5);
  }

  centered("住 居 届 （新規・変更）", height - 49, 18);

  drawText(
    `提出日：${formatDate(request.createdAt)}`,
    right - 145,
    height - 75,
    8.5,
  );

  drawText(
    "医療法人財団 額田記念会 理事長 様",
    left,
    height - 96,
    9,
  );

  drawText(
    "住居の状況について次のとおり届け出ます。",
    left,
    height - 116,
    8.5,
  );

  let y = height - 153;

  box(left, y, tableWidth, 31);
  line(left + 82, y, left + 82, y + 31);
  line(left + 250, y, left + 250, y + 31);
  line(left + 312, y, left + 312, y + 31);
  line(left + 410, y, left + 410, y + 31);

  drawText("事業所名", left + 7, y + 11);
  drawText(
    request.employee.facility?.name ?? "-",
    left + 89,
    y + 11,
  );
  drawText("所属", left + 257, y + 11);
  drawText(
    request.employee.department?.name ?? "-",
    left + 319,
    y + 11,
  );
  drawText("氏名", left + 417, y + 11);
  drawText(
    `${request.employee.lastName} ${request.employee.firstName}`,
    left + 453,
    y + 11,
  );

  y -= 28;

  row(y, "住所", request.address ?? "-", 28);
  y -= 28;

  const notification =
    notificationTypeLabels[request.notificationType] ??
    request.notificationType;

  const notificationOptions = [
    "新規",
    "住所変更",
    "内容変更",
  ]
    .map((item) => item === notification ? `■ ${item}` : `□ ${item}`)
    .join("    ");

  row(
    y,
    "届出の事由",
    `${notificationOptions}${
      request.note ? `  （${request.note.slice(0, 28)}）` : ""
    }`,
    34,
  );
  y -= 34;

  row(
    y,
    "事実の発生年月日",
    formatDate(request.changeDate),
    27,
  );
  y -= 27;

  const isRental = request.residenceType === "RENTAL";
  const isCorporate =
    request.residenceType === "CORPORATE_HOUSING";
  const isOwned = request.residenceType === "OWNED";

  box(left, y - 123, tableWidth, 123);
  line(left + 112, y - 123, left + 112, y);

  drawText(
    `${isRental ? "■" : "□"} 1 借家・借間`,
    left + 8,
    y - 20,
    9,
  );
  drawText("借家居住者", left + 20, y - 39, 8);

  const rentalX = left + 112;
  const rentalLabelWidth = 118;

  for (let i = 1; i < 5; i += 1) {
    line(
      rentalX,
      y - i * 24.6,
      right,
      y - i * 24.6,
    );
  }

  line(
    rentalX + rentalLabelWidth,
    y - 123,
    rentalX + rentalLabelWidth,
    y,
  );

  const rentalRows = [
    ["貸主の氏名", request.landlordName ?? "-"],
    ["貸主の住所", request.landlordAddress ?? "-"],
    ["名義上の借主", request.contractHolderName ?? "-"],
    [
      "借主との続柄",
      request.contractHolderRelationship ?? "-",
    ],
    [
      "家賃等",
      `家賃 ${formatMoney(request.monthlyRent)}  共益費 ${formatMoney(
        request.commonServiceFee,
      )}`,
    ],
  ];

  rentalRows.forEach(([label, value], index) => {
    const baseline = y - 17 - index * 24.6;
    drawText(label, rentalX + 6, baseline, 8);
    drawText(value, rentalX + rentalLabelWidth + 7, baseline, 8);
  });

  y -= 123;

  row(
    y,
    `${isCorporate ? "■" : "□"} 2 法人が指定する住居`,
    `${request.housingName ?? "-"} ${
      request.roomNumber ? `  部屋番号：${request.roomNumber}` : ""
    }`,
    31,
    180,
  );
  y -= 31;

  const ownershipLabel = request.ownershipType
    ? ownershipTypeLabels[request.ownershipType] ??
      request.ownershipType
    : "-";

  row(
    y,
    `${isOwned ? "■" : "□"} 3 持家`,
    `所有区分：${ownershipLabel}  名義人：${
      request.ownerName1 ?? "-"
    } ${request.ownerName2 ?? ""}`,
    34,
    112,
  );
  y -= 34;

  row(
    y,
    "取得年月日",
    formatDate(request.acquisitionDate),
    27,
  );
  y -= 27;

  const attachmentNames =
    request.attachments.length > 0
      ? request.attachments
          .map((item) => item.fileName)
          .join("、")
          .slice(0, 62)
      : "-";

  row(
    y,
    "添付書類",
    attachmentNames,
    34,
  );
  y -= 34;

  box(left, y - 76, tableWidth, 76);
  line(left + 112, y - 76, left + 112, y);

  drawText("事務使用欄", left + 25, y - 26, 9);
  drawText("人事担当記入", left + 22, y - 45, 8);

  drawText(
    `状態：${statusLabels[request.status] ?? request.status}`,
    left + 124,
    y - 19,
    8.5,
  );
  drawText(
    `確認日：${formatDate(request.reviewedAt)}`,
    left + 124,
    y - 38,
    8.5,
  );
  drawText(
    `確認者：${request.reviewedBy ?? "-"}`,
    left + 124,
    y - 57,
    8.5,
  );

  if (request.reviewComment) {
    drawText(
      `確認コメント：${request.reviewComment.slice(0, 35)}`,
      left + 305,
      y - 38,
      7.5,
    );
  }

  y -= 76;

  box(left, y - 42, tableWidth, 42);
  line(left + 112, y - 42, left + 112, y);

  drawText("処理確認", left + 33, y - 25, 9);
  drawText(
    `申請ID：${request.id}`,
    left + 124,
    y - 17,
    7,
  );
  drawText(
    `職員番号：${request.employee.employeeNo}`,
    left + 124,
    y - 31,
    7.5,
  );

  await logAudit({
    userId: session.user.id,
    userName: session.user.name,
    action: "RESIDENCE_REQUEST_PDF_DOWNLOADED",
    targetType: "ResidenceRequest",
    targetId: request.id,
    description: `${request.employee.employeeNo} の住居届PDFを出力`,
  });

  const pdfBytes = await pdfDoc.save();

  return new Response(pdfBytes.buffer as ArrayBuffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="residence_request_${request.id}.pdf"`,
    },
  });
}
