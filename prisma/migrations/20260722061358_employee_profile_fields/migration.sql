/*
  Warnings:

  - You are about to drop the column `commutingType` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `employmentInsuranceNo` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `employmentType` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `healthInsuranceNo` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `retirementDate` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Employee` table. All the data in the column will be lost.
  - The `status` column on the `EmployeeRequest` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `EmployeeRequestHistory` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name]` on the table `Department` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `type` to the `EmployeeRequest` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "RequestType" AS ENUM ('ONBOARDING', 'DEPARTMENT_CHANGE', 'OTHER');

-- CreateEnum
CREATE TYPE "RequestStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "RequestHistoryAction" AS ENUM ('CREATED', 'UPDATED', 'APPROVED', 'REJECTED');

-- DropForeignKey
ALTER TABLE "EmployeeRequestHistory" DROP CONSTRAINT "EmployeeRequestHistory_requestId_fkey";

-- AlterTable
ALTER TABLE "Employee" DROP COLUMN "commutingType",
DROP COLUMN "employmentInsuranceNo",
DROP COLUMN "employmentType",
DROP COLUMN "healthInsuranceNo",
DROP COLUMN "retirementDate",
DROP COLUMN "status";

-- AlterTable
ALTER TABLE "EmployeeRequest" ADD COLUMN     "approvalComment" TEXT,
ADD COLUMN     "rejectionReason" TEXT,
ADD COLUMN     "type" "RequestType" NOT NULL,
ADD COLUMN     "userId" TEXT,
DROP COLUMN "status",
ADD COLUMN     "status" "RequestStatus" NOT NULL DEFAULT 'PENDING';

-- DropTable
DROP TABLE "EmployeeRequestHistory";

-- DropEnum
DROP TYPE "EmployeeStatus";

-- DropEnum
DROP TYPE "EmploymentType";

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'USER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RequestHistory" (
    "id" TEXT NOT NULL,
    "action" "RequestHistoryAction" NOT NULL,
    "comment" TEXT,
    "actor" TEXT,
    "requestId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RequestHistory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Department_name_key" ON "Department"("name");

-- AddForeignKey
ALTER TABLE "EmployeeRequest" ADD CONSTRAINT "EmployeeRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RequestHistory" ADD CONSTRAINT "RequestHistory_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "EmployeeRequest"("id") ON DELETE CASCADE ON UPDATE CASCADE;
