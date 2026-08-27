-- CreateTable
CREATE TABLE "AnnualLeaveServiceRule" (
    "id" TEXT NOT NULL,
    "serviceMonths" INTEGER NOT NULL,
    "legalDays" DOUBLE PRECISION NOT NULL,
    "specialDays" DOUBLE PRECISION NOT NULL,
    "maxTotalDays" DOUBLE PRECISION NOT NULL DEFAULT 20,
    "allowManualSpecialAdjustment" BOOLEAN NOT NULL DEFAULT true,
    "description" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AnnualLeaveServiceRule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AnnualLeaveEntryRule" (
    "id" TEXT NOT NULL,
    "entryMonth" INTEGER NOT NULL,
    "dayFrom" INTEGER NOT NULL,
    "dayTo" INTEGER NOT NULL,
    "legalGrantAfterMonths" INTEGER NOT NULL DEFAULT 6,
    "legalDays" DOUBLE PRECISION NOT NULL DEFAULT 10,
    "specialGrant1AfterMonths" INTEGER,
    "specialGrant1Days" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "specialGrant2AfterMonths" INTEGER,
    "specialGrant2Days" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "specialGrant3AfterMonths" INTEGER,
    "specialGrant3Days" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "firstYearTotalDays" DOUBLE PRECISION NOT NULL,
    "nextAprilDays" DOUBLE PRECISION NOT NULL,
    "allowManualSpecialAdjustment" BOOLEAN NOT NULL DEFAULT true,
    "description" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AnnualLeaveEntryRule_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AnnualLeaveServiceRule_serviceMonths_key" ON "AnnualLeaveServiceRule"("serviceMonths");

-- CreateIndex
CREATE INDEX "AnnualLeaveEntryRule_entryMonth_sortOrder_idx" ON "AnnualLeaveEntryRule"("entryMonth", "sortOrder");

-- CreateIndex
CREATE UNIQUE INDEX "AnnualLeaveEntryRule_entryMonth_dayFrom_dayTo_key" ON "AnnualLeaveEntryRule"("entryMonth", "dayFrom", "dayTo");
