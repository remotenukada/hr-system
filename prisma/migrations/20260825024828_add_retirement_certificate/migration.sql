-- CreateTable
CREATE TABLE "RetirementCertificate" (
    "id" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "certificateDate" TIMESTAMP(3) NOT NULL,
    "retirementDate" TIMESTAMP(3) NOT NULL,
    "reason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RetirementCertificate_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RetirementCertificate_employeeId_key" ON "RetirementCertificate"("employeeId");

-- AddForeignKey
ALTER TABLE "RetirementCertificate" ADD CONSTRAINT "RetirementCertificate_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;
