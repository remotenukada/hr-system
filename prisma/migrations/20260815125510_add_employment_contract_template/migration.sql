-- CreateTable
CREATE TABLE "EmploymentContractTemplate" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "contractType" TEXT NOT NULL,
    "workStartTime" TEXT NOT NULL,
    "workEndTime" TEXT NOT NULL,
    "breakMinutes" INTEGER NOT NULL,
    "holidayRule" TEXT NOT NULL,
    "leaveRule" TEXT,
    "wageType" TEXT NOT NULL,
    "baseSalary" INTEGER,
    "allowanceNote" TEXT,
    "payClosingDay" TEXT,
    "payDate" TEXT,
    "bonusRule" TEXT,
    "raiseRule" TEXT,
    "probationPeriod" TEXT,
    "contractRenewalRule" TEXT,
    "contractRenewalCriteria" TEXT,
    "retirementRule" TEXT,
    "retirementAllowanceRule" TEXT,
    "socialInsuranceRule" TEXT,
    "employmentInsuranceRule" TEXT,
    "consultationDesk" TEXT,
    "workRuleLocation" TEXT,
    "remarks" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EmploymentContractTemplate_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "EmploymentContractTemplate_isActive_idx" ON "EmploymentContractTemplate"("isActive");
