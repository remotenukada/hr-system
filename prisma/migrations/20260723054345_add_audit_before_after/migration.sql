-- AlterTable
ALTER TABLE "AuditLog" ADD COLUMN     "afterData" JSONB,
ADD COLUMN     "beforeData" JSONB;
