/*
  Warnings:

  - A unique constraint covering the columns `[certificateNo]` on the table `RetirementCertificate` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "RetirementCertificate" ADD COLUMN     "certificateNo" TEXT,
ADD COLUMN     "issuedAt" TIMESTAMP(3),
ADD COLUMN     "issuedBy" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "RetirementCertificate_certificateNo_key" ON "RetirementCertificate"("certificateNo");
