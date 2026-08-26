-- CreateTable
CREATE TABLE "LeaveTypeBalance" (
    "id" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "leaveTypeId" TEXT NOT NULL,
    "grantedDays" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "usedDays" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LeaveTypeBalance_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "LeaveTypeBalance_employeeId_idx" ON "LeaveTypeBalance"("employeeId");

-- CreateIndex
CREATE INDEX "LeaveTypeBalance_leaveTypeId_idx" ON "LeaveTypeBalance"("leaveTypeId");

-- CreateIndex
CREATE UNIQUE INDEX "LeaveTypeBalance_employeeId_leaveTypeId_key" ON "LeaveTypeBalance"("employeeId", "leaveTypeId");

-- AddForeignKey
ALTER TABLE "LeaveTypeBalance" ADD CONSTRAINT "LeaveTypeBalance_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LeaveTypeBalance" ADD CONSTRAINT "LeaveTypeBalance_leaveTypeId_fkey" FOREIGN KEY ("leaveTypeId") REFERENCES "LeaveType"("id") ON DELETE CASCADE ON UPDATE CASCADE;
