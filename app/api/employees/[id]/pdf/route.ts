import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { PDFDocument, rgb } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";
import fs from "fs";
import path from "path";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

const FONT_PATH = "/usr/share/fonts/opentype/ipafont-gothic/ipag.ttf";

function formatDate(date: Date | null) {
  if (!date) return "-";
  return new Date(date).toLocaleDateString("ja-JP");
}

function formatValue(value: string | null | undefined) {
  return value || "-";
}

function label(value: string | null | undefined) {
  return formatValue(value);
}

export async function GET(
  _request: Request,
  { params }: RouteContext,
) {
  const session = await auth();

  if (!session?.user) {
    return new Response("Unauthorized", { status: 401 });
  }

  if (!["ADMIN", "HR_MANAGER"].includes(session.user.role)) {
    return new Response("Forbidden", { status: 403 });
  }

  const { id } = await params;

  const employee = await prisma.employee.findUnique({
    where: {
      id,
    },
    include: {
      department: true,
    },
  });

  if (!employee) {
    return new Response("Employee not found", {
      status: 404,
    });
  }

  const pdfDoc = await PDFDocument.create();
  pdfDoc.registerFontkit(fontkit);

  const fontBytes = fs.readFileSync(FONT_PATH);
  const font = await pdfDoc.embedFont(fontBytes, {
    subset: false,
  });

  const page = pdfDoc.addPage([595.28, 841.89]);
  const { height } = page.getSize();

  let y = height - 60;

  function drawText(
    text: string,
    x: number,
    currentY: number,
    size = 10,
    color = rgb(0.1, 0.1, 0.1),
  ) {
    page.drawText(text, {
      x,
      y: currentY,
      size,
      font,
      color,
    });
  }

  function sectionTitle(title: string) {
    y -= 34;
    drawText(title, 50, y, 14, rgb(0.15, 0.38, 0.92));

    page.drawLine({
      start: { x: 50, y: y - 8 },
      end: { x: 545, y: y - 8 },
      thickness: 1,
      color: rgb(0.85, 0.9, 1),
    });

    y -= 28;
  }

  function row(name: string, value: string | null | undefined) {
    drawText(name, 60, y, 10, rgb(0.4, 0.4, 0.4));
    drawText(label(value), 180, y, 10, rgb(0.05, 0.05, 0.05));
    y -= 22;
  }

  drawText("社員台帳", 250, y, 22, rgb(0.07, 0.09, 0.15));
  y -= 20;

  if (employee.photoPath) {
    const photoFullPath = path.join(
      process.cwd(),
      "public",
      employee.photoPath.replace(/^\//, ""),
    );

    if (fs.existsSync(photoFullPath)) {
      try {
        const imageBytes = fs.readFileSync(photoFullPath);
        const ext = path.extname(photoFullPath).toLowerCase();

        const image =
          ext === ".png"
            ? await pdfDoc.embedPng(imageBytes)
            : await pdfDoc.embedJpg(imageBytes);

        page.drawImage(image, {
          x: 440,
          y: height - 160,
          width: 80,
          height: 80,
        });
      } catch {
        // 画像形式がPDF非対応の場合は画像なしで出力
      }
    }
  }

  sectionTitle("基本情報");

  row("社員番号", employee.employeeNo);
  row("氏名", `${employee.lastName} ${employee.firstName}`);
  row(
    "ふりがな",
    `${employee.lastNameKana ?? ""} ${employee.firstNameKana ?? ""}`.trim(),
  );
  row("メール", employee.email);
  row("電話番号", employee.phoneNumber);
  row("住所", employee.address);
  row("生年月日", formatDate(employee.birthDate));
  row("性別", employee.gender);

  sectionTitle("組織・雇用情報");

  row("部署", employee.department?.name);
  row("職種", employee.occupation);
  row("役職", employee.position);
  row("雇用形態", employee.employmentType);
  row("ステータス", employee.status);
  row("入職日", formatDate(employee.hireDate));
  row("退職日", formatDate(employee.retirementDate));
  row("通勤区分", employee.commutingType);

  sectionTitle("保険情報");

  row("健康保険番号", employee.healthInsuranceNo);
  row("雇用保険番号", employee.employmentInsuranceNo);

  drawText(
    `出力日時: ${new Date().toLocaleString("ja-JP")}`,
    360,
    50,
    9,
    rgb(0.45, 0.45, 0.45),
  );

  const pdfBytes = await pdfDoc.save();

  return new Response(Buffer.from(pdfBytes), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="employee_${employee.employeeNo}.pdf"`,
    },
  });
}
