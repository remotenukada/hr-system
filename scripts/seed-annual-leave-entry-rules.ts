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

const rows = [
  [1, 1, 15, 1, 1, 3, 15, 15],
  [1, 16, 31, 1, 1, 2, 14, 15],
  [2, 1, 15, 1, 1, 2, 14, 15],
  [2, 16, 31, 1, 1, 1, 13, 15],
  [3, 1, 15, 1, 1, 1, 13, 15],
  [3, 16, 31, 1, 1, 0, 12, 15],
  [4, 1, 15, 1, 1, 0, 12, 15],
  [4, 16, 31, 1, 1, 0, 12, 14],
  [5, 1, 15, 1, 1, 0, 12, 14],
  [5, 16, 31, 1, 1, 0, 12, 13],
  [6, 1, 15, 1, 1, 0, 12, 13],
  [6, 16, 31, 1, 1, 0, 12, 12],
  [7, 1, 15, 1, 1, 0, 12, 12],
  [7, 16, 31, 1, 1, 0, 12, 12],
  [8, 1, 15, 1, 0, 0, 11, 12],
  [8, 16, 31, 1, 0, 0, 11, 12],
  [9, 1, 15, 0, 0, 0, 10, 12],
  [9, 16, 31, 0, 0, 0, 10, 11],
  [10, 1, 15, 1, 1, 6, 18, 15],
  [10, 16, 31, 1, 1, 5, 17, 15],
  [11, 1, 15, 1, 1, 5, 17, 15],
  [11, 16, 31, 1, 1, 4, 16, 15],
  [12, 1, 15, 1, 1, 4, 16, 15],
  [12, 16, 31, 1, 1, 3, 15, 15],
];

async function main() {
  for (const [
    entryMonth,
    dayFrom,
    dayTo,
    special1,
    special2,
    special3,
    firstYearTotalDays,
    nextAprilDays,
  ] of rows) {
    await prisma.annualLeaveEntryRule.upsert({
      where: {
        entryMonth_dayFrom_dayTo: {
          entryMonth,
          dayFrom,
          dayTo,
        },
      },
      update: {},
      create: {
        entryMonth,
        dayFrom,
        dayTo,
        legalGrantAfterMonths: 6,
        legalDays: 10,
        specialGrant1AfterMonths: special1 ? 7 : null,
        specialGrant1Days: special1,
        specialGrant2AfterMonths: special2 ? 8 : null,
        specialGrant2Days: special2,
        specialGrant3AfterMonths: special3 ? 12 : null,
        specialGrant3Days: special3,
        firstYearTotalDays,
        nextAprilDays,
        allowManualSpecialAdjustment: true,
        isActive: true,
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
