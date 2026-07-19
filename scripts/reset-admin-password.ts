import "dotenv/config";
import bcrypt from "bcrypt";
import { prisma } from "../lib/prisma";

async function main() {
  const hashedPassword = await bcrypt.hash("password", 10);

  await prisma.user.update({
    where: {
      email: "admin@example.com",
    },
    data: {
      password: hashedPassword,
    },
  });

  console.log("admin@example.com のパスワードを password にリセットしました");
}

main()
  .catch((error) => {
    console.error(error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
