-- CreateEnum
CREATE TYPE "CertificationStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- AlterTable
ALTER TABLE "EmployeeCertification" ADD COLUMN     "reviewedAt" TIMESTAMP(3),
ADD COLUMN     "reviewedBy" TEXT,
ADD COLUMN     "status" "CertificationStatus" NOT NULL DEFAULT 'PENDING';
