-- AlterTable
ALTER TABLE "EmployeeBankAccount" ADD COLUMN     "reviewComment" TEXT,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'PENDING';
