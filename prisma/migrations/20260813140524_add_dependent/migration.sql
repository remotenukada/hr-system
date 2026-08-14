-- AlterTable
ALTER TABLE "Dependent" ADD COLUMN     "endedAt" TIMESTAMP(3),
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;
