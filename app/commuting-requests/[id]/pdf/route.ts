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

type Context = {
  params: Promise<{ id: string }>;
};

const notificationLabels: Record<string, string> = {
  NEW: "新規",
  ROUTE_CHANGE: "経路変更",
  METHOD_CHANGE: "通勤方法変更",
  AMOUNT_CHANGE: "運賃・手当変更",
};

const commutingLabels: Record<string, string> = {
  PUBLIC_TRANSPORT: "交通機関",
  CAR: "自動車",
  MOTORCYCLE: "バイク",
  BICYCLE: "自転車",
  WALK: "徒歩",
  OTHER: "その他",
};

const statusLabels: Record<string, string> = {
  PENDING: "承認待ち",
  APPROVED: "承認済み",
  REJECTED: "差戻し",
  CANCELLED: "取消済み",
};

function formatDate(value: Date | null | undefined) {
  return value
    ? new Intl.DateTimeFormat("ja-JP").format(value)
    : "-";
}

function formatMoney(value: number | null | undefined) {
  return value != null
    ? `${value.toLocaleString("ja-JP")} 円`
    : "-";
}

export async function GET(
  _request: Request,
  { params }: Context,
) {
  const session = await requireHRManager();
  const { id } = await params;

  const cookieStore = await cookies();
  const facilityScope =
    cookieStore.get("facilityScope")?.value ?? "ALL";

  const request = await prisma.commutingRequest.findFirst({
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
          createdAt: "asc",
        },
      },
      routeSegments: {
        orderBy: {
          sortOrder: "asc",
        },
      },
    },
  });

  if (!request) {
    return new Response("通勤届が見つかりません。", {
      status: 404,
    });
  }

  if (!fs.existsSync(FONT_PATH)) {
    return new Response("日本語フォントが見つかりません。", {
      status: 500,
    });
  }

  const company = await prisma.companySetting.findFirst();

  const pdfDoc = await PDFDocument.create();
  pdfDoc.registerFontkit(fontkit);

  const font = await pdfDoc.embedFont(
    fs.readFileSync(FONT_PATH),
    { subset: false },
  );

  const page = pdfDoc.addPage([595.28, 841.89]);
  const width = page.getWidth();
  const height = page.getHeight();

  const left = 42;
  const right = width - 42;
  const tableWidth = right - left;

  function text(
    value: string,
    x: number,
    y: number,
    size = 9,
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
    const valueWidth = font.widthOfTextAtSize(value, size);

    text(value, (width - valueWidth) / 2, y, size);
  }

  function box(
    x: number,
    y: number,
    w: number,
    h: number,
  ) {
    page.drawRectangle({
      x,
      y,
      width: w,
      height: h,
      borderWidth: 0.7,
      borderColor: rgb(0, 0, 0),
    });
  }

  function row(
    y: number,
    label: string,
    value: string,
    labelWidth = 105,
    rowHeight = 26,
  ) {
    box(left, y, tableWidth, rowHeight);

    page.drawLine({
      start: { x: left + labelWidth, y },
      end: { x: left + labelWidth, y: y + rowHeight },
      thickness: 0.7,
    });

    text(label, left + 6, y + 8, 9);
    text(value || "-", left + labelWidth + 8, y + 8, 9);
  }

  centered("通 勤 届", height - 55, 22);

  text(
    `提出日：${formatDate(request.createdAt)}`,
    right - 150,
    height - 80,
    9,
  );

  text(
    `${company?.companyName ?? "法人"} ${
      company?.representativeName ?? ""
    } 様`,
    left,
    height - 105,
    10,
  );

  text(
    "給与規程の通勤手当規定に基づき、次のとおり届け出ます。",
    left,
    height - 125,
    9,
  );

  let y = height - 165;

  row(y, "職員番号", request.employee.employeeNo);
  y -= 26;

  row(
    y,
    "事業所名",
    request.employee.facility?.name ?? "-",
  );
  y -= 26;

  row(
    y,
    "所属",
    request.employee.department?.name ?? "-",
  );
  y -= 26;

  row(
    y,
    "氏名",
    `${request.employee.lastName} ${request.employee.firstName}`,
  );
  y -= 26;

  const selectedNotification =
    notificationLabels[request.notificationType] ??
    request.notificationType;

  row(
    y,
    "届出区分",
    Object.values(notificationLabels)
      .map((label) =>
        label === selectedNotification
          ? `■ ${label}`
          : `□ ${label}`,
      )
      .join("   "),
  );
  y -= 26;

  row(
    y,
    "事実発生日",
    formatDate(request.effectiveDate),
  );
  y -= 26;

  row(
    y,
    "通勤手段",
    commutingLabels[request.commutingType] ??
      request.commutingType,
  );
  y -= 26;

  if (request.commutingType === "PUBLIC_TRANSPORT") {
    const segmentRows = request.routeSegments.slice(0, 4);
    const segmentRowHeight = 25;
    const segmentHeaderHeight = 27;
    const segmentTableHeight =
      segmentHeaderHeight +
      Math.max(segmentRows.length, 1) * segmentRowHeight +
      27;

    box(
      left,
      y - segmentTableHeight,
      tableWidth,
      segmentTableHeight,
    );

    const columns = [82, 62, 115, 65, 82, 105];
    const columnX = [left];

    for (const columnWidth of columns) {
      columnX.push(
        columnX[columnX.length - 1] + columnWidth,
      );
    }

    for (
      let index = 1;
      index < columnX.length;
      index += 1
    ) {
      page.drawLine({
        start: {
          x: columnX[index],
          y: y - segmentTableHeight,
        },
        end: {
          x: columnX[index],
          y,
        },
        thickness: 0.7,
      });
    }

    page.drawLine({
      start: {
        x: left,
        y: y - segmentHeaderHeight,
      },
      end: {
        x: right,
        y: y - segmentHeaderHeight,
      },
      thickness: 0.7,
    });

    text("交通事業者", left + 4, y - 18, 7.5);
    text("路線名", columnX[1] + 4, y - 18, 7.5);
    text("利用区間", columnX[2] + 4, y - 18, 7.5);
    text("往復運賃", columnX[3] + 4, y - 18, 7.5);
    text("1か月定期", columnX[4] + 4, y - 18, 7.5);
    text("支給対象額", columnX[5] + 4, y - 18, 7.5);

    const rows =
      segmentRows.length > 0
        ? segmentRows
        : [
            {
              id: "empty",
              operatorName: "-",
              lineName: null,
              boardingPoint: request.routeFrom,
              alightingPoint: request.routeTo,
              roundTripFare:
                request.oneWayFare != null
                  ? request.oneWayFare * 2
                  : null,
              monthlyPassAmount: request.monthlyAmount,
              payableAmount: request.monthlyAmount,
            },
          ];

    rows.forEach((segment, index) => {
      const rowTop =
        y -
        segmentHeaderHeight -
        index * segmentRowHeight;
      const baseline = rowTop - 16;

      if (index > 0) {
        page.drawLine({
          start: { x: left, y: rowTop },
          end: { x: right, y: rowTop },
          thickness: 0.7,
        });
      }

      text(
        segment.operatorName.slice(0, 12),
        left + 4,
        baseline,
        7,
      );
      text(
        (segment.lineName ?? "-").slice(0, 10),
        columnX[1] + 4,
        baseline,
        7,
      );
      text(
        `${segment.boardingPoint ?? "-"} - ${
          segment.alightingPoint ?? "-"
        }`.slice(0, 18),
        columnX[2] + 4,
        baseline,
        7,
      );
      text(
        formatMoney(segment.roundTripFare),
        columnX[3] + 4,
        baseline,
        7,
      );
      text(
        formatMoney(segment.monthlyPassAmount),
        columnX[4] + 4,
        baseline,
        7,
      );
      text(
        formatMoney(segment.payableAmount),
        columnX[5] + 4,
        baseline,
        7,
      );
    });

    const totalPayable = request.routeSegments.length
      ? request.routeSegments.reduce(
          (total, segment) =>
            total + (segment.payableAmount ?? 0),
          0,
        )
      : request.monthlyAmount;

    const totalY = y - segmentTableHeight + 9;

    text(
      request.routeSegments.length > 4
        ? `ほか${request.routeSegments.length - 4}件`
        : "",
      left + 5,
      totalY,
      7,
    );

    text(
      `定期代合計：${formatMoney(totalPayable)}`,
      columnX[2] + 5,
      totalY,
      8,
    );

    y -= segmentTableHeight;
  } else if (
    request.commutingType === "CAR" ||
    request.commutingType === "MOTORCYCLE"
  ) {
    row(
      y,
      "車両情報",
      `車種：${request.vehicleName ?? "-"} 色：${
        request.vehicleColor ?? "-"
      } ナンバー：${
        request.vehicleRegistrationNumber ?? "-"
      }`,
      105,
      44,
    );

    y -= 44;

    row(
      y,
      "通勤距離",
      request.oneWayDistanceKm != null
        ? `片道 ${request.oneWayDistanceKm} km`
        : "-",
    );

    y -= 26;
  } else {
    row(
      y,
      "通勤経路",
      `${request.routeFrom ?? "-"} - ${
        request.routeTo ?? "-"
      }`,
    );

    y -= 26;
  }


  y -= 44;

  row(
    y,
    "添付書類",
    request.attachments.length > 0
      ? request.attachments
          .map((item) => item.fileName)
          .join("、")
      : "-",
    105,
    34,
  );
  y -= 34;

  row(
    y,
    "備考・事由",
    request.note ?? "-",
    105,
    40,
  );
  y -= 55;

  centered("事 務 処 理 欄", y + 28, 13);

  box(left, y - 60, tableWidth, 60);

  page.drawLine({
    start: { x: left + 130, y: y - 60 },
    end: { x: left + 130, y },
    thickness: 0.7,
  });

  page.drawLine({
    start: { x: left + 300, y: y - 60 },
    end: { x: left + 300, y },
    thickness: 0.7,
  });

  text("支給決定額", left + 8, y - 35, 10);
  text(
    formatMoney(request.approvedAmount),
    left + 140,
    y - 35,
    11,
  );

  text(
    `状態：${statusLabels[request.status] ?? request.status}`,
    left + 310,
    y - 20,
    9,
  );
  text(
    `確認日：${formatDate(request.reviewedAt)}`,
    left + 310,
    y - 36,
    9,
  );
  text(
    `確認者：${request.reviewedBy ?? "-"}`,
    left + 310,
    y - 52,
    9,
  );

  if (request.reviewComment) {
    text(
      `確認コメント：${request.reviewComment.slice(0, 45)}`,
      left,
      y - 82,
      8,
    );
  }

  const bytes = await pdfDoc.save();

  await logAudit({
    userId: session.user.id,
    userName: session.user.name,
    action: "COMMUTING_REQUEST_PDF_VIEWED",
    targetType: "CommutingRequest",
    targetId: request.id,
    description:
      `${request.employee.employeeNo} の通勤届PDFを出力`,
  });

  const fileName =
    `commuting-request-${request.employee.employeeNo}-${request.id}.pdf`;

  return new Response(bytes.buffer as ArrayBuffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition":
        `inline; filename="${fileName}"`,
      "Cache-Control": "private, no-store, max-age=0",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
