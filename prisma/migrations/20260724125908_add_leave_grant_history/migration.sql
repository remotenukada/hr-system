-- CreateEnum
CREATE TYPE "LeaveGrantType" AS ENUM ('LEGAL', 'SPECIAL');

-- CreateTable
CREATE TABLE "LeaveGrantHistory" (
    "id" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "grantDate" TIMESTAMP(3) NOT NULL,
    "grantedDays" DOUBLE PRECISION NOT NULL,
    "grantType" "LeaveGrantType" NOT NULL,
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LeaveGrantHistory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "LeaveGrantHistory_employeeId_idx" ON "LeaveGrantHistory"("employeeId");

-- CreateIndex
CREATE INDEX "LeaveGrantHistory_grantDate_idx" ON "LeaveGrantHistory"("grantDate");

-- AddForeignKey
ALTER TABLE "LeaveGrantHistory" ADD CONSTRAINT "LeaveGrantHistory_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;
