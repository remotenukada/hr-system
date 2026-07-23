-- AlterTable
ALTER TABLE "EmployeeRequest" ADD COLUMN     "leaveDays" DOUBLE PRECISION,
ADD COLUMN     "leaveEndDate" TIMESTAMP(3),
ADD COLUMN     "leaveStartDate" TIMESTAMP(3);
