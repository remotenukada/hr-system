import "dotenv/config";
import { PrismaClient } from "../generated/prisma";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter: new PrismaPg(pool),
});

async function main() {
  const rows = [
    [4, 7, 8, 9, 10, 12, 13, 15],
    [3, 5, 6, 6, 8, 9, 10, 11],
    [2, 3, 4, 4, 5, 6, 6, 7],
    [1, 1, 2, 2, 2, 3, 3, 3],
  ];

  for (const row of rows) {
    const [
      weeklyScheduledDays,
      days6Months,
      days18Months,
      days30Months,
      days42Months,
      days54Months,
      days66Months,
      days78Months,
    ] = row;

    await prisma.partTimeAnnualLeaveRule.upsert({
      where: { weeklyScheduledDays },
      update: {},
      create: {
        weeklyScheduledDays,
        days6Months,
        days18Months,
        days30Months,
        days42Months,
        days54Months,
        days66Months,
        days78Months,
        sortOrder: weeklyScheduledDays,
        description: `週${weeklyScheduledDays}日勤務`,
      },
    });
  }

  console.log("PartTimeAnnualLeaveRule seeded");
}

main().finally(async () => {
  await prisma.$disconnect();
  await pool.end();
});
