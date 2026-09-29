-- CreateTable
CREATE TABLE "CommutingRouteSegment" (
    "id" TEXT NOT NULL,
    "commutingRequestId" TEXT NOT NULL,
    "operatorName" TEXT NOT NULL,
    "lineName" TEXT,
    "boardingPoint" TEXT,
    "alightingPoint" TEXT,
    "oneWayFare" INTEGER,
    "roundTripFare" INTEGER,
    "monthlyPassAmount" INTEGER,
    "payableAmount" INTEGER,
    "fareSystem" TEXT,
    "coveredBySegmentId" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CommutingRouteSegment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "CommutingRouteSegment_commutingRequestId_idx" ON "CommutingRouteSegment"("commutingRequestId");

-- CreateIndex
CREATE INDEX "CommutingRouteSegment_operatorName_idx" ON "CommutingRouteSegment"("operatorName");

-- CreateIndex
CREATE INDEX "CommutingRouteSegment_sortOrder_idx" ON "CommutingRouteSegment"("sortOrder");

-- AddForeignKey
ALTER TABLE "CommutingRouteSegment" ADD CONSTRAINT "CommutingRouteSegment_commutingRequestId_fkey" FOREIGN KEY ("commutingRequestId") REFERENCES "CommutingRequest"("id") ON DELETE CASCADE ON UPDATE CASCADE;
