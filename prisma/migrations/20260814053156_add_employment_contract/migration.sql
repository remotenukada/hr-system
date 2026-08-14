-- CreateTable
CREATE TABLE "EmploymentContract" (
    "id" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "contractType" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "workplace" TEXT NOT NULL,
    "jobDescription" TEXT NOT NULL,
    "workStartTime" TEXT NOT NULL,
    "workEndTime" TEXT NOT NULL,
    "breakMinutes" INTEGER NOT NULL,
    "holidayRule" TEXT NOT NULL,
    "leaveRule" TEXT,
    "wageType" TEXT NOT NULL,
    "baseSalary" INTEGER NOT NULL,
    "allowanceNote" TEXT,
    "payClosingDay" TEXT,
    "payDate" TEXT,
    "bonusRule" TEXT,
    "raiseRule" TEXT,
    "probationPeriod" TEXT,
    "retirementRule" TEXT,
    "remarks" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EmploymentContract_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "EmploymentContract_employeeId_idx" ON "EmploymentContract"("employeeId");

-- AddForeignKey
ALTER TABLE "EmploymentContract" ADD CONSTRAINT "EmploymentContract_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;
