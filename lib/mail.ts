import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT ?? 587),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendInvitationMail(
  email: string,
  name: string,
  invitationUrl: string,
) {
  await transporter.sendMail({
    from: process.env.MAIL_FROM,
    to: email,
    subject: "職員登録のご案内",
    text: `${name} 様

職員登録用URLです。

${invitationUrl}

有効期限がありますのでお早めに登録してください。`,
  });
}
