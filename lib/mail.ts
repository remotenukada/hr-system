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
    subject: `【${company?.companyName ?? "法人"}】FY Nexus One 職員登録のご案内`,
text: `${name} 様

お世話になっております。

${company?.companyName ?? "法人"} 人事担当です。

職員登録の準備が整いましたので、ご案内いたします。
下記URLより初回登録をお願いいたします。

【職員登録URL】
${invitationUrl}

ご登録後は、マイページへログインし、
プロフィール情報の確認・修正をお願いいたします。

【ご注意】
・本URLは第三者へ共有しないでください。
・本URLには有効期限があります。
・本URLの有効期限を過ぎた場合は、人事担当者へご連絡ください。

ご不明な点がございましたら、お気軽にお問い合わせください。

──────────────────
${company?.companyName ?? "法人"}
人事担当
FY Nexus One
──────────────────`,
  });
}

type SendSystemMailParams = {
  to: string | string[];
  subject: string;
  text: string;
};

export async function sendSystemMail({
  to,
  subject,
  text,
}: SendSystemMailParams) {
  const company = await prisma.companySetting.findFirst();
  const transporter = await createMailTransporter();

  const from =
    company?.mailFrom ||
    process.env.SMTP_FROM ||
    "no-reply@example.com";

  await transporter.sendMail({
    from,
    to,
    subject,
    text,
  });
}

export async function sendSystemMailSafely(
  params: Parameters<typeof sendSystemMail>[0],
) {
  try {
    await sendSystemMail(params);
    return true;
  } catch (error) {
    console.error("システムメール送信エラー:", error);
    return false;
  }
}

export async function getHRNotificationRecipients(): Promise<string[]> {
  const users = await prisma.user.findMany({
    where: {
      isActive: true,
      role: {
        in: ["ADMIN", "HR_MANAGER"],
      },
      email: {
        not: "",
      },
    },
    select: {
      email: true,
    },
  });

  return [...new Set(
    users
      .map((user) => user.email.trim())
      .filter(Boolean),
  )];
}
