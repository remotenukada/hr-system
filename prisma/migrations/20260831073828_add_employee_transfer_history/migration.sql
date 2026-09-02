-- CreateTable
CREATE TABLE "EmployeeTransfer" (
    "id" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "fromFacilityId" TEXT,
    "toFacilityId" TEXT,
    "fromDepartmentId" TEXT,
    "toDepartmentId" TEXT,
    "effectiveDate" TIMESTAMP(3) NOT NULL,
    "reason" TEXT,
    "createdBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EmployeeTransfer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "EmployeeTransfer_employeeId_idx" ON "EmployeeTransfer"("employeeId");

-- CreateIndex
CREATE INDEX "EmployeeTransfer_effectiveDate_idx" ON "EmployeeTransfer"("effectiveDate");

-- CreateIndex
CREATE INDEX "EmployeeTransfer_fromFacilityId_idx" ON "EmployeeTransfer"("fromFacilityId");

-- CreateIndex
CREATE INDEX "EmployeeTransfer_toFacilityId_idx" ON "EmployeeTransfer"("toFacilityId");

-- AddForeignKey
ALTER TABLE "EmployeeTransfer" ADD CONSTRAINT "EmployeeTransfer_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmployeeTransfer" ADD CONSTRAINT "EmployeeTransfer_fromFacilityId_fkey" FOREIGN KEY ("fromFacilityId") REFERENCES "Facility"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmployeeTransfer" ADD CONSTRAINT "EmployeeTransfer_toFacilityId_fkey" FOREIGN KEY ("toFacilityId") REFERENCES "Facility"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmployeeTransfer" ADD CONSTRAINT "EmployeeTransfer_fromDepartmentId_fkey" FOREIGN KEY ("fromDepartmentId") REFERENCES "Department"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmployeeTransfer" ADD CONSTRAINT "EmployeeTransfer_toDepartmentId_fkey" FOREIGN KEY ("toDepartmentId") REFERENCES "Department"("id") ON DELETE SET NULL ON UPDATE CASCADE;
