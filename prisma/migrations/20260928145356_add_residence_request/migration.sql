-- CreateEnum
CREATE TYPE "ResidenceType" AS ENUM ('RENTAL', 'CORPORATE_HOUSING', 'OWNED');

-- CreateEnum
CREATE TYPE "ResidenceOwnershipType" AS ENUM ('SELF', 'JOINT', 'FAMILY');

-- CreateEnum
CREATE TYPE "ResidenceNotificationType" AS ENUM ('NEW', 'ADDRESS_CHANGE', 'CONTENT_CHANGE');

-- CreateEnum
CREATE TYPE "ResidenceAttachmentType" AS ENUM ('LEASE_CONTRACT', 'SALES_CONTRACT', 'REGISTRY', 'RESIDENCE_CERTIFICATE', 'OTHER');

-- CreateTable
CREATE TABLE "ResidenceRequest" (
    "id" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "residenceType" "ResidenceType" NOT NULL,
    "notificationType" "ResidenceNotificationType" NOT NULL,
    "changeDate" TIMESTAMP(3) NOT NULL,
    "postalCode" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phoneNumber" TEXT,
    "note" TEXT,
    "landlordName" TEXT,
    "landlordAddress" TEXT,
    "contractHolderName" TEXT,
    "contractHolderRelationship" TEXT,
    "monthlyRent" INTEGER,
    "commonServiceFee" INTEGER,
    "housingName" TEXT,
    "roomNumber" TEXT,
    "ownershipType" "ResidenceOwnershipType",
    "ownerName1" TEXT,
    "ownerName2" TEXT,
    "acquisitionDate" TIMESTAMP(3),
    "status" "RequestStatus" NOT NULL DEFAULT 'PENDING',
    "reviewedAt" TIMESTAMP(3),
    "reviewedBy" TEXT,
    "reviewComment" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ResidenceRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResidenceRequestAttachment" (
    "id" TEXT NOT NULL,
    "residenceRequestId" TEXT NOT NULL,
    "attachmentType" "ResidenceAttachmentType" NOT NULL,
    "fileName" TEXT NOT NULL,
    "filePath" TEXT NOT NULL,
    "fileType" TEXT,
    "fileSize" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ResidenceRequestAttachment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ResidenceRequest_employeeId_idx" ON "ResidenceRequest"("employeeId");

-- CreateIndex
CREATE INDEX "ResidenceRequest_residenceType_idx" ON "ResidenceRequest"("residenceType");

-- CreateIndex
CREATE INDEX "ResidenceRequest_notificationType_idx" ON "ResidenceRequest"("notificationType");

-- CreateIndex
CREATE INDEX "ResidenceRequest_status_idx" ON "ResidenceRequest"("status");

-- CreateIndex
CREATE INDEX "ResidenceRequest_changeDate_idx" ON "ResidenceRequest"("changeDate");

-- CreateIndex
CREATE INDEX "ResidenceRequestAttachment_residenceRequestId_idx" ON "ResidenceRequestAttachment"("residenceRequestId");

-- CreateIndex
CREATE INDEX "ResidenceRequestAttachment_attachmentType_idx" ON "ResidenceRequestAttachment"("attachmentType");

-- AddForeignKey
ALTER TABLE "ResidenceRequest" ADD CONSTRAINT "ResidenceRequest_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResidenceRequestAttachment" ADD CONSTRAINT "ResidenceRequestAttachment_residenceRequestId_fkey" FOREIGN KEY ("residenceRequestId") REFERENCES "ResidenceRequest"("id") ON DELETE CASCADE ON UPDATE CASCADE;
