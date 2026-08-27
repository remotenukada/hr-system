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
  await prisma.annualLeaveServiceRule.deleteMany();

  await prisma.annualLeaveServiceRule.createMany({
    data: [
      {
        serviceMonths: 6,
        legalDays: 10,
        specialDays: 0,
        maxTotalDays: 20,
        sortOrder: 1,
      },
      {
        serviceMonths: 18,
        legalDays: 11,
        specialDays: 5,
        maxTotalDays: 20,
        sortOrder: 2,
      },
      {
        serviceMonths: 30,
        legalDays: 12,
        specialDays: 5,
        maxTotalDays: 20,
        sortOrder: 3,
      },
      {
        serviceMonths: 42,
        legalDays: 14,
        specialDays: 5,
        maxTotalDays: 20,
        sortOrder: 4,
      },
      {
        serviceMonths: 54,
        legalDays: 16,
        specialDays: 4,
        maxTotalDays: 20,
        sortOrder: 5,
      },
      {
        serviceMonths: 66,
        legalDays: 18,
        specialDays: 2,
        maxTotalDays: 20,
        sortOrder: 6,
      },
      {
        serviceMonths: 78,
        legalDays: 20,
        specialDays: 0,
        maxTotalDays: 20,
        sortOrder: 7,
      },
    ],
  });

  console.log("AnnualLeaveServiceRule seeded");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
