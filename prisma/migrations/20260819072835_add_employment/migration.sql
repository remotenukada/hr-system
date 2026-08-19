-- CreateTable
CREATE TABLE "EmploymentContractWorkSchedule" (
    "id" TEXT NOT NULL,
    "employmentContractId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,
    "breakMinutes" INTEGER NOT NULL DEFAULT 0,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EmploymentContractWorkSchedule_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "EmploymentContractWorkSchedule_employmentContractId_idx" ON "EmploymentContractWorkSchedule"("employmentContractId");

-- AddForeignKey
ALTER TABLE "EmploymentContractWorkSchedule" ADD CONSTRAINT "EmploymentContractWorkSchedule_employmentContractId_fkey" FOREIGN KEY ("employmentContractId") REFERENCES "EmploymentContract"("id") ON DELETE CASCADE ON UPDATE CASCADE;
