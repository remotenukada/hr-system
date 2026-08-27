-- AlterTable
ALTER TABLE "LeaveType" ADD COLUMN     "allowRequest" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "manageBalance" BOOLEAN NOT NULL DEFAULT true;
