-- CreateEnum
CREATE TYPE "DependentRequestType" AS ENUM ('ADD', 'UPDATE', 'REMOVE');

-- AlterTable
ALTER TABLE "DependentRequest" ADD COLUMN     "dependentId" TEXT,
ADD COLUMN     "type" "DependentRequestType" NOT NULL DEFAULT 'ADD';

-- CreateIndex
CREATE INDEX "DependentRequest_type_idx" ON "DependentRequest"("type");

-- CreateIndex
CREATE INDEX "DependentRequest_dependentId_idx" ON "DependentRequest"("dependentId");
