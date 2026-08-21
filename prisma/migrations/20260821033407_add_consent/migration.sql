-- CreateEnum
CREATE TYPE "ConsentMethod" AS ENUM ('ELECTRONIC', 'PAPER');

-- AlterTable
ALTER TABLE "EmploymentContractConsent" ADD COLUMN     "consentMethod" "ConsentMethod" NOT NULL DEFAULT 'ELECTRONIC';
