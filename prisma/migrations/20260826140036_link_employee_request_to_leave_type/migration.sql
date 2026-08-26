-- AlterTable
ALTER TABLE "EmployeeRequest" ADD COLUMN     "leaveTypeId" TEXT;

-- CreateIndex
CREATE INDEX "EmployeeRequest_leaveTypeId_idx" ON "EmployeeRequest"("leaveTypeId");

-- AddForeignKey
ALTER TABLE "EmployeeRequest" ADD CONSTRAINT "EmployeeRequest_leaveTypeId_fkey" FOREIGN KEY ("leaveTypeId") REFERENCES "LeaveType"("id") ON DELETE SET NULL ON UPDATE CASCADE;
