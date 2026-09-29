-- CreateEnum
CREATE TYPE "CommutingNotificationType" AS ENUM ('NEW', 'ROUTE_CHANGE', 'METHOD_CHANGE', 'AMOUNT_CHANGE');

-- CreateEnum
CREATE TYPE "CommutingType" AS ENUM ('PUBLIC_TRANSPORT', 'CAR', 'MOTORCYCLE', 'BICYCLE', 'WALK', 'OTHER');

-- CreateEnum
CREATE TYPE "CommutingAttachmentType" AS ENUM ('COMMUTER_PASS', 'ROUTE_MAP', 'VEHICLE_INSPECTION', 'VOLUNTARY_INSURANCE', 'DRIVERS_LICENSE', 'OTHER');

-- CreateTable
CREATE TABLE "CommutingRequest" (
    "id" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "notificationType" "CommutingNotificationType" NOT NULL,
    "commutingType" "CommutingType" NOT NULL,
    "effectiveDate" TIMESTAMP(3) NOT NULL,
    "routeFrom" TEXT,
    "routeTo" TEXT,
    "routeDetails" TEXT,
    "transportationName" TEXT,
    "monthlyAmount" INTEGER,
    "oneWayDistanceKm" DOUBLE PRECISION,
    "oneWayFare" INTEGER,
    "vehicleRegistrationNumber" TEXT,
    "note" TEXT,
    "status" "RequestStatus" NOT NULL DEFAULT 'PENDING',
    "reviewedAt" TIMESTAMP(3),
    "reviewedBy" TEXT,
    "reviewComment" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CommutingRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CommutingRequestAttachment" (
    "id" TEXT NOT NULL,
    "commutingRequestId" TEXT NOT NULL,
    "attachmentType" "CommutingAttachmentType" NOT NULL,
    "fileName" TEXT NOT NULL,
    "filePath" TEXT NOT NULL,
    "fileType" TEXT,
    "fileSize" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CommutingRequestAttachment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "CommutingRequest_employeeId_idx" ON "CommutingRequest"("employeeId");

-- CreateIndex
CREATE INDEX "CommutingRequest_notificationType_idx" ON "CommutingRequest"("notificationType");

-- CreateIndex
CREATE INDEX "CommutingRequest_commutingType_idx" ON "CommutingRequest"("commutingType");

-- CreateIndex
CREATE INDEX "CommutingRequest_status_idx" ON "CommutingRequest"("status");

-- CreateIndex
CREATE INDEX "CommutingRequest_effectiveDate_idx" ON "CommutingRequest"("effectiveDate");

-- CreateIndex
CREATE INDEX "CommutingRequestAttachment_commutingRequestId_idx" ON "CommutingRequestAttachment"("commutingRequestId");

-- CreateIndex
CREATE INDEX "CommutingRequestAttachment_attachmentType_idx" ON "CommutingRequestAttachment"("attachmentType");

-- AddForeignKey
ALTER TABLE "CommutingRequest" ADD CONSTRAINT "CommutingRequest_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommutingRequestAttachment" ADD CONSTRAINT "CommutingRequestAttachment_commutingRequestId_fkey" FOREIGN KEY ("commutingRequestId") REFERENCES "CommutingRequest"("id") ON DELETE CASCADE ON UPDATE CASCADE;
