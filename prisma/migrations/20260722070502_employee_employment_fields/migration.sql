-- CreateEnum
CREATE TYPE "EmploymentType" AS ENUM ('FULL_TIME', 'CONTRACT', 'PART_TIME', 'TEMPORARY');

-- CreateEnum
CREATE TYPE "EmployeeStatus" AS ENUM ('ACTIVE', 'LEAVE', 'RETIRED');

-- AlterTable
ALTER TABLE "Employee" ADD COLUMN     "commutingType" TEXT,
ADD COLUMN     "employmentType" "EmploymentType",
ADD COLUMN     "status" "EmployeeStatus" NOT NULL DEFAULT 'ACTIVE';
