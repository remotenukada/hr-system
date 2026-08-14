-- CreateTable
CREATE TABLE "Dependent" (
    "id" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "nameKana" TEXT,
    "relationship" TEXT NOT NULL,
    "birthDate" TIMESTAMP(3),
    "cohabiting" BOOLEAN NOT NULL DEFAULT true,
    "annualIncome" INTEGER,
    "healthInsuranceDependent" BOOLEAN NOT NULL DEFAULT true,
    "encryptedMyNumber" TEXT,
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Dependent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Dependent_employeeId_idx" ON "Dependent"("employeeId");

-- CreateIndex
CREATE INDEX "Dependent_relationship_idx" ON "Dependent"("relationship");

-- AddForeignKey
ALTER TABLE "Dependent" ADD CONSTRAINT "Dependent_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;
