import { auth } from "@/auth";
import fontkit from "@pdf-lib/fontkit";
import fs from "fs";
import { PDFDocument } from "pdf-lib";

import { logAudit } from "@/lib/audit-log";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

const FONT_PATH =
  "/usr/share/fonts/opentype/ipafont-mincho/ipam.ttf";

type Context = {
  params: Promise<{ id: string }>;
};

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

export async function GET(
  _request: Request,
  { params }: Context,
) {
  const { id } = await params;

  const session = await auth();

  const issuedBy =
    session?.user?.name ??
    session?.user?.email ??
    "管理者";

  const employee = await prisma.employee.findUnique({
    where: { id },
    include: {
      retirementCertificate: true,
      department: true,
    },
  });

  if (!employee) {
    return new Response("Employee not found", {
      status: 404,
    });
  }

  const certificate = employee.retirementCertificate;

  if (
    certificate &&
    !certificate.certificateNo
  ) {
    const year =
      new Date().getFullYear();

    const count =
      await prisma.retirementCertificate.count();

    const certificateNo =
      `RC-${year}-${String(count + 1).padStart(6, "0")}`;

    await prisma.retirementCertificate.update({
      where: {
        id: certificate.id,
      },
      data: {
        certificateNo,
        issuedAt: new Date(),
        issuedBy,
      },
    });

    certificate.certificateNo =
      certificateNo;
  }

  if (!certificate) {
    return new Response(
      "Retirement certificate not found",
      { status: 404 },
    );
  }

  if (!fs.existsSync(FONT_PATH)) {
    return new Response("Japanese font not found", {
      status: 500,
    });
  }

  const company =
    await prisma.companySetting.findFirst();

  const pdfDoc = await PDFDocument.create();
  pdfDoc.registerFontkit(fontkit);

  const font = await pdfDoc.embedFont(
    fs.readFileSync(FONT_PATH),
    { subset: false },
  );

  const page = pdfDoc.addPage([595.28, 841.89]);
  const { width } = page.getSize();

  function centered(
    text: string,
    y: number,
    size: number,
  ) {
    const textWidth =
      font.widthOfTextAtSize(text, size);

    page.drawText(text, {
      x: (width - textWidth) / 2,
      y,
      size,
      font,
    });
  }

  function line(text: string, y: number) {
    page.drawText(text, {
      x: 80,
      y,
      size: 12,
      font,
    });
  }

  centered("在職証明書", 760, 22);

  if (certificate?.certificateNo) {
    page.drawText(
      `証明番号：${certificate.certificateNo}`,
      {
        x: 380,
        y: 785,
        size: 10,
        font,
      },
    );
  }

  line(
    `氏名：${employee.lastName} ${employee.firstName}`,
    690,
  );

  line(
    `社員番号：${employee.employeeNo}`,
    660,
  );

  let y = 620;

  if (employee.hireDate) {
    line(
      `入職日：${formatDate(employee.hireDate)}`,
      y,
    );
    y -= 35;
  }

  if (employee.department?.name) {
    line(
      `所属部署：${employee.department.name}`,
      y,
    );
    y -= 35;
  }

  if (employee.occupation) {
    line(
      `職種：${employee.occupation}`,
      y,
    );
    y -= 35;
  }

  if (employee.employmentType) {
    line(
      `雇用形態：${employee.employmentType}`,
      y,
    );
    y -= 35;
  }

  if (
    certificate.showEmploymentPeriod &&
    employee.hireDate
  ) {
    line(
      `雇用期間：${formatDate(employee.hireDate)}から${formatDate(certificate.retirementDate)}まで`,
      y,
    );
    y -= 35;
  }

  if (
    certificate.showJobType &&
    certificate.jobType?.trim()
  ) {
    line(
      `業務の種類：${certificate.jobType}`,
      y,
    );
    y -= 35;
  }

  if (
    certificate.showPosition &&
    employee.position?.trim()
  ) {
    line(
      `その事業における地位：${employee.position}`,
      y,
    );
    y -= 35;
  }

  if (
    certificate.showWage &&
    certificate.wageInfo?.trim()
  ) {
    line(`賃金：${certificate.wageInfo}`, y);
    y -= 35;
  }


  centered(
    "上記の者は現在当法人に在職していることを証明します。",
    Math.min(y - 45, 430),
    12,
  );

  page.drawText(
    formatDate(certificate.certificateDate),
    {
      x: 340,
      y: 250,
      size: 11,
      font,
    },
  );

  page.drawText(company?.companyName ?? "", {
    x: 340,
    y: 215,
    size: 11,
    font,
  });

  page.drawText(
    company?.representativeName ?? "",
    {
      x: 340,
      y: 185,
      size: 11,
      font,
    },
  );


  if (company?.sealImagePath) {
    const sealPath =
      company.sealImagePath.replace(
        /^\/seals/,
        "/data/hr-system/seals",
      );

    if (fs.existsSync(sealPath)) {
      const sealBytes =
        fs.readFileSync(sealPath);

      const sealImage =
        await pdfDoc.embedPng(sealBytes);

      page.drawImage(sealImage, {
        x: 470,
        y: 160,
        width: 50,
        height: 50,
      });
    }
  }

  const pdfBytes = await pdfDoc.save();

  await logAudit({
    userName: issuedBy,
    action: "CERTIFICATE_ISSUED",
    targetType: "EMPLOYMENT_CERTIFICATE",
    targetId: employee.id,
    description: `在職証明書を発行: ${employee.employeeNo} ${employee.lastName} ${employee.firstName}`,
    afterData: {
      employeeId: employee.id,
      employeeNo: employee.employeeNo,
      certificateNo: certificate.certificateNo ?? null,
    },
  });

  return new Response(Buffer.from(pdfBytes), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition":
        `attachment; filename="retirement-certificate-${employee.employeeNo}.pdf"`,
    },
  });
}
