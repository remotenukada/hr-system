import "dotenv/config";
import { prisma } from "../lib/prisma";
import bcrypt from "bcrypt";

async function main() {
  console.log("初期ユーザーの作成を開始します...");

  const hashedPassword = await bcrypt.hash("password123", 10);

  const admin = await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {
      password: hashedPassword,
      role: "ADMIN",
    },
    create: {
      name: "管理者A",
      email: "admin@example.com",
      password: hashedPassword,
      role: "ADMIN",
    },
  });
  console.log(`ADMIN: ${admin.email}`);

  const hrManager = await prisma.user.upsert({
    where: { email: "hr@example.com" },
    update: {
      password: hashedPassword,
      role: "HR_MANAGER",
    },
    create: {
      name: "人事担当",
      email: "hr@example.com",
      password: hashedPassword,
      role: "HR_MANAGER",
    },
  });
  console.log(`HR_MANAGER: ${hrManager.email}`);

  const manager = await prisma.user.upsert({
    where: { email: "manager@example.com" },
    update: {
      password: hashedPassword,
      role: "MANAGER",
    },
    create: {
      name: "部門長",
      email: "manager@example.com",
      password: hashedPassword,
      role: "MANAGER",
    },
  });
  console.log(`MANAGER: ${manager.email}`);

  const user = await prisma.user.upsert({
    where: { email: "user@example.com" },
    update: {
      password: hashedPassword,
      role: "USER",
    },
    create: {
      name: "一般職員B",
      email: "user@example.com",
      password: hashedPassword,
      role: "USER",
    },
  });
  console.log(`USER: ${user.email}`);

  console.log("初期ユーザーの作成がすべて完了しました！");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
