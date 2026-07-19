import "dotenv/config";
import { prisma } from "../lib/prisma";
import bcrypt from "bcrypt";

async function main() {
  console.log("初期ユーザーの作成を開始します...");

  const hashedPassword = await bcrypt.hash("password123", 10);

  // 1. 管理者ユーザーの作成
  const admin = await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      name: "管理者A",
      email: "admin@example.com",
      password: hashedPassword,
      role: "ADMIN",
    },
  });
  console.log(`管理者ユーザーを作成/確認しました: ${admin.email}`);

  // 2. 一般ユーザーの作成
  const user = await prisma.user.upsert({
    where: { email: "user@example.com" },
    update: {},
    create: {
      name: "一般社員B",
      email: "user@example.com",
      password: hashedPassword,
      role: "USER",
    },
  });
  console.log(`一般ユーザーを作成/確認しました: ${user.email}`);

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
