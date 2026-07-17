import { PrismaClient } from "../generated/prisma";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not set");
}

// 1. pg の Pool インスタンスを作成してアダプターに渡す必要があります
const pool = new pg.Pool({ connectionString });
const adapter = new PrismaPg(pool);

// 2. globalThis の型定義をより正確に指定します
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// 3. インスタンスの生成
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
