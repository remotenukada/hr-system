-- AlterTable
ALTER TABLE "RetirementCertificate" ADD COLUMN     "jobType" TEXT,
ADD COLUMN     "retirementReason" TEXT,
ADD COLUMN     "showEmploymentPeriod" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "showJobType" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "showPosition" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "showRetirementReason" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "showWage" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "wageInfo" TEXT;
