import { prisma } from "../lib/prisma";

async function main() {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
    },
    orderBy: {
      role: "asc",
    },
  });

  console.table(users);
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
