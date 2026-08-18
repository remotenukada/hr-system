-- CreateTable
CREATE TABLE "EmploymentContractConsent" (
    "id" TEXT NOT NULL,
    "employmentContractId" TEXT NOT NULL,
    "signerName" TEXT NOT NULL,
    "consentedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dependentId" TEXT,

    CONSTRAINT "EmploymentContractConsent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "EmploymentContractConsent_employmentContractId_idx" ON "EmploymentContractConsent"("employmentContractId");

-- AddForeignKey
ALTER TABLE "EmploymentContractConsent" ADD CONSTRAINT "EmploymentContractConsent_employmentContractId_fkey" FOREIGN KEY ("employmentContractId") REFERENCES "EmploymentContract"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmploymentContractConsent" ADD CONSTRAINT "EmploymentContractConsent_dependentId_fkey" FOREIGN KEY ("dependentId") REFERENCES "Dependent"("id") ON DELETE SET NULL ON UPDATE CASCADE;
