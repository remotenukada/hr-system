-- AlterTable
ALTER TABLE "EmployeeRequest" ADD COLUMN     "approvalCompleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "currentApprovalStep" INTEGER NOT NULL DEFAULT 1;
