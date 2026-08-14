-- AlterTable
ALTER TABLE "EmployeeMyNumber" ADD COLUMN     "reviewComment" TEXT,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'PENDING',
ADD COLUMN     "verifiedAt" TIMESTAMP(3),
ADD COLUMN     "verifiedBy" TEXT;
