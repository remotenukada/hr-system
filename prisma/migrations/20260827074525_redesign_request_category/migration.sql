-- CreateEnum
CREATE TYPE "RequestCategory" AS ENUM ('LEAVE', 'LATE', 'EARLY', 'OUTING', 'CHILD_CARE', 'FAMILY_CARE');

-- CreateEnum
CREATE TYPE "RequestUnitType" AS ENUM ('DAY', 'HALF_DAY', 'HOUR');

-- AlterTable
ALTER TABLE "EmployeeRequest" ADD COLUMN     "endTime" TEXT,
ADD COLUMN     "hours" DOUBLE PRECISION,
ADD COLUMN     "requestCategory" "RequestCategory",
ADD COLUMN     "startTime" TEXT,
ADD COLUMN     "targetDate" TIMESTAMP(3),
ADD COLUMN     "unitType" "RequestUnitType";
