-- CreateTable
CREATE TABLE "LateRecord" (
    "id" TEXT NOT NULL,
    "requestId" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "targetDate" TIMESTAMP(3) NOT NULL,
    "scheduledTime" TEXT NOT NULL,
    "arrivalTime" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LateRecord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EarlyLeaveRecord" (
    "id" TEXT NOT NULL,
    "requestId" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "targetDate" TIMESTAMP(3) NOT NULL,
    "scheduledTime" TEXT NOT NULL,
    "leaveTime" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EarlyLeaveRecord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OutingRecord" (
    "id" TEXT NOT NULL,
    "requestId" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "targetDate" TIMESTAMP(3) NOT NULL,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OutingRecord_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LateRecord_requestId_key" ON "LateRecord"("requestId");

-- CreateIndex
CREATE INDEX "LateRecord_employeeId_idx" ON "LateRecord"("employeeId");

-- CreateIndex
CREATE INDEX "LateRecord_targetDate_idx" ON "LateRecord"("targetDate");

-- CreateIndex
CREATE UNIQUE INDEX "EarlyLeaveRecord_requestId_key" ON "EarlyLeaveRecord"("requestId");

-- CreateIndex
CREATE INDEX "EarlyLeaveRecord_employeeId_idx" ON "EarlyLeaveRecord"("employeeId");

-- CreateIndex
CREATE INDEX "EarlyLeaveRecord_targetDate_idx" ON "EarlyLeaveRecord"("targetDate");

-- CreateIndex
CREATE UNIQUE INDEX "OutingRecord_requestId_key" ON "OutingRecord"("requestId");

-- CreateIndex
CREATE INDEX "OutingRecord_employeeId_idx" ON "OutingRecord"("employeeId");

-- CreateIndex
CREATE INDEX "OutingRecord_targetDate_idx" ON "OutingRecord"("targetDate");

-- AddForeignKey
ALTER TABLE "LateRecord" ADD CONSTRAINT "LateRecord_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EarlyLeaveRecord" ADD CONSTRAINT "EarlyLeaveRecord_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OutingRecord" ADD CONSTRAINT "OutingRecord_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;
