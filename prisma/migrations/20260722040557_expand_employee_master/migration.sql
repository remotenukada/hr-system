/*
  Warnings:

  - You are about to drop the column `approvalComment` on the `EmployeeRequest` table. All the data in the column will be lost.
  - You are about to drop the column `rejectionReason` on the `EmployeeRequest` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `EmployeeRequest` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `EmployeeRequest` table. All the data in the column will be lost.
  - The `status` column on the `EmployeeRequest` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `RequestHistory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'OTHER');

-- CreateEnum
CREATE TYPE "EmploymentType" AS ENUM ('FULL_TIME', 'CONTRACT', 'PART_TIME', 'TEMPORARY');

-- CreateEnum
CREATE TYPE "EmployeeStatus" AS ENUM ('ACTIVE', 'LEAVE', 'RETIRED');

-- DropForeignKey
ALTER TABLE "EmployeeRequest" DROP CONSTRAINT "EmployeeRequest_userId_fkey";

-- DropForeignKey
ALTER TABLE "RequestHistory" DROP CONSTRAINT "RequestHistory_requestId_fkey";

-- DropIndex
DROP INDEX "Department_name_key";

-- AlterTable
ALTER TABLE "Employee" ADD COLUMN     "address" TEXT,
ADD COLUMN     "birthDate" TIMESTAMP(3),
ADD COLUMN     "commutingType" TEXT,
ADD COLUMN     "employmentInsuranceNo" TEXT,
ADD COLUMN     "employmentType" "EmploymentType",
ADD COLUMN     "firstNameKana" TEXT,
ADD COLUMN     "gender" "Gender",
ADD COLUMN     "healthInsuranceNo" TEXT,
ADD COLUMN     "hireDate" TIMESTAMP(3),
ADD COLUMN     "lastNameKana" TEXT,
ADD COLUMN     "occupation" TEXT,
ADD COLUMN     "phoneNumber" TEXT,
ADD COLUMN     "position" TEXT,
ADD COLUMN     "retirementDate" TIMESTAMP(3),
ADD COLUMN     "status" "EmployeeStatus" NOT NULL DEFAULT 'ACTIVE';

-- AlterTable
ALTER TABLE "EmployeeRequest" DROP COLUMN "approvalComment",
DROP COLUMN "rejectionReason",
DROP COLUMN "type",
DROP COLUMN "userId",
DROP COLUMN "status",
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'PENDING';

-- DropTable
DROP TABLE "RequestHistory";

-- DropTable
DROP TABLE "User";

-- DropEnum
DROP TYPE "RequestHistoryAction";

-- DropEnum
DROP TYPE "RequestStatus";

-- DropEnum
DROP TYPE "RequestType";

-- DropEnum
DROP TYPE "UserRole";

-- CreateTable
CREATE TABLE "EmployeeRequestHistory" (
    "id" TEXT NOT NULL,
    "requestId" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "actor" TEXT NOT NULL,
    "comment" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EmployeeRequestHistory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "EmployeeRequestHistory" ADD CONSTRAINT "EmployeeRequestHistory_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "EmployeeRequest"("id") ON DELETE CASCADE ON UPDATE CASCADE;
