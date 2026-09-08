import nodemailer from "nodemailer";
import { prisma } from "@/lib/prisma";

async function createMailTransporter() {
  const company = await prisma.companySetting.findFirst();

  const host = company?.smtpHost || process.env.SMTP_HOST;
  const port = company?.smtpPort || Number(process.env.SMTP_PORT ?? 587);
  const secure = company?.smtpSecure ?? process.env.SMTP_SECURE === "true";
  const user = company?.smtpUser || process.env.SMTP_USER;
  const pass = company?.smtpPassword || process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    throw new Error(
      "SMTPホスト、ユーザー、またはパスワードが設定されていません。",
    );
  }

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  });
}

export async function testSmtpConnection() {
  const transporter = await createMailTransporter();
  await transporter.verify();
}


export async function sendInvitationMail(
  email: string,
  name: string,
  invitationUrl: string,
) {
  const company = await prisma.companySetting.findFirst();
  const transporter = await createMailTransporter();

  await transporter.sendMail({
    from: company?.mailFrom || process.env.MAIL_FROM,
    to: email,
    subject: "FY Nexus One 職員登録のご案内",
    text: `${name} 様

職員登録のご案内です。

登録URL:
${invitationUrl}

有効期限がありますのでお早めにご登録ください。

${company?.companyName ?? "法人"}
人事担当`,
  });
}
