-- AlterTable
ALTER TABLE "LeaveGrantHistory" ADD COLUMN     "leaveTypeId" TEXT;

-- CreateIndex
CREATE INDEX "LeaveGrantHistory_leaveTypeId_idx" ON "LeaveGrantHistory"("leaveTypeId");

-- AddForeignKey
ALTER TABLE "LeaveGrantHistory" ADD CONSTRAINT "LeaveGrantHistory_leaveTypeId_fkey" FOREIGN KEY ("leaveTypeId") REFERENCES "LeaveType"("id") ON DELETE SET NULL ON UPDATE CASCADE;
