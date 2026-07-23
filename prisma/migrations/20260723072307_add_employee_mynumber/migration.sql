-- CreateTable
CREATE TABLE "EmployeeMyNumber" (
    "id" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "encryptedNumber" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EmployeeMyNumber_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EmployeeMyNumber_employeeId_key" ON "EmployeeMyNumber"("employeeId");

-- AddForeignKey
ALTER TABLE "EmployeeMyNumber" ADD CONSTRAINT "EmployeeMyNumber_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;
