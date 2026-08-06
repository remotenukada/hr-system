/*
  Warnings:

  - You are about to drop the column `certificateFilePath` on the `EmployeeCertification` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "EmployeeCertification" DROP COLUMN "certificateFilePath";

-- CreateTable
CREATE TABLE "EmployeeCertificationAttachment" (
    "id" TEXT NOT NULL,
    "employeeCertificationId" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "filePath" TEXT NOT NULL,
    "fileType" TEXT,
    "fileSize" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userInvitationId" TEXT,

    CONSTRAINT "EmployeeCertificationAttachment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "EmployeeCertificationAttachment_employeeCertificationId_idx" ON "EmployeeCertificationAttachment"("employeeCertificationId");

-- AddForeignKey
ALTER TABLE "EmployeeCertificationAttachment" ADD CONSTRAINT "EmployeeCertificationAttachment_employeeCertificationId_fkey" FOREIGN KEY ("employeeCertificationId") REFERENCES "EmployeeCertification"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmployeeCertificationAttachment" ADD CONSTRAINT "EmployeeCertificationAttachment_userInvitationId_fkey" FOREIGN KEY ("userInvitationId") REFERENCES "UserInvitation"("id") ON DELETE SET NULL ON UPDATE CASCADE;
