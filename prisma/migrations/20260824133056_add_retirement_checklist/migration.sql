-- CreateTable
CREATE TABLE "RetirementChecklist" (
    "id" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "healthInsuranceReturned" BOOLEAN NOT NULL DEFAULT false,
    "employmentInsuranceCompleted" BOOLEAN NOT NULL DEFAULT false,
    "pcReturned" BOOLEAN NOT NULL DEFAULT false,
    "lockerReturned" BOOLEAN NOT NULL DEFAULT false,
    "nameTagReturned" BOOLEAN NOT NULL DEFAULT false,
    "uniformReturned" BOOLEAN NOT NULL DEFAULT false,
    "retirementCertificateIssued" BOOLEAN NOT NULL DEFAULT false,
    "memo" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RetirementChecklist_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RetirementChecklist_employeeId_key" ON "RetirementChecklist"("employeeId");

-- AddForeignKey
ALTER TABLE "RetirementChecklist" ADD CONSTRAINT "RetirementChecklist_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;
