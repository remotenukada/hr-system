-- CreateTable
CREATE TABLE "LoanedAsset" (
    "id" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "assetName" TEXT NOT NULL,
    "returned" BOOLEAN NOT NULL DEFAULT false,
    "returnedAt" TIMESTAMP(3),
    "returnedBy" TEXT,
    "memo" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LoanedAsset_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "LoanedAsset" ADD CONSTRAINT "LoanedAsset_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;
