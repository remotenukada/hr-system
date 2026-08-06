-- CreateTable
CREATE TABLE "Certification" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Certification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmployeeCertification" (
    "id" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "certificationId" TEXT NOT NULL,
    "acquiredDate" TIMESTAMP(3),
    "expiryDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EmployeeCertification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Certification_name_key" ON "Certification"("name");

-- CreateIndex
CREATE UNIQUE INDEX "EmployeeCertification_employeeId_certificationId_key" ON "EmployeeCertification"("employeeId", "certificationId");

-- AddForeignKey
ALTER TABLE "EmployeeCertification" ADD CONSTRAINT "EmployeeCertification_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmployeeCertification" ADD CONSTRAINT "EmployeeCertification_certificationId_fkey" FOREIGN KEY ("certificationId") REFERENCES "Certification"("id") ON DELETE CASCADE ON UPDATE CASCADE;
