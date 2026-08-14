-- CreateTable
CREATE TABLE "DependentRequest" (
    "id" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "nameKana" TEXT,
    "relationship" TEXT NOT NULL,
    "birthDate" TIMESTAMP(3),
    "annualIncome" INTEGER,
    "cohabiting" BOOLEAN NOT NULL DEFAULT true,
    "healthInsuranceDependent" BOOLEAN NOT NULL DEFAULT true,
    "encryptedMyNumber" TEXT,
    "note" TEXT,
    "status" "RequestStatus" NOT NULL DEFAULT 'PENDING',
    "reviewedAt" TIMESTAMP(3),
    "reviewedBy" TEXT,
    "reviewComment" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DependentRequest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "DependentRequest_employeeId_idx" ON "DependentRequest"("employeeId");

-- CreateIndex
CREATE INDEX "DependentRequest_status_idx" ON "DependentRequest"("status");

-- AddForeignKey
ALTER TABLE "DependentRequest" ADD CONSTRAINT "DependentRequest_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;
