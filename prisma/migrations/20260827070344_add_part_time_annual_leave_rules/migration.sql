-- CreateTable
CREATE TABLE "PartTimeAnnualLeaveRule" (
    "id" TEXT NOT NULL,
    "weeklyScheduledDays" INTEGER NOT NULL,
    "days6Months" DOUBLE PRECISION NOT NULL,
    "days18Months" DOUBLE PRECISION NOT NULL,
    "days30Months" DOUBLE PRECISION NOT NULL,
    "days42Months" DOUBLE PRECISION NOT NULL,
    "days54Months" DOUBLE PRECISION NOT NULL,
    "days66Months" DOUBLE PRECISION NOT NULL,
    "days78Months" DOUBLE PRECISION NOT NULL,
    "description" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PartTimeAnnualLeaveRule_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PartTimeAnnualLeaveRule_weeklyScheduledDays_key" ON "PartTimeAnnualLeaveRule"("weeklyScheduledDays");
