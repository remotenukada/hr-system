import { prisma } from "../lib/prisma";

async function main() {
  const company = await prisma.companySetting.findFirst();

  console.log({
    host: company?.smtpHost || process.env.SMTP_HOST,
    port: company?.smtpPort || Number(process.env.SMTP_PORT ?? 587),
    secure:
      company?.smtpSecure ??
      process.env.SMTP_SECURE === "true",
    user: company?.smtpUser || process.env.SMTP_USER,
    mailFrom: company?.mailFrom || process.env.MAIL_FROM,
    passwordConfigured: Boolean(process.env.SMTP_PASS),
    passwordLength: process.env.SMTP_PASS?.length ?? 0,
  });
}

main().finally(async () => {
  await prisma.$disconnect();
});
