/*
  Warnings:

  - A unique constraint covering the columns `[requestId,stepNo]` on the table `RequestApproval` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `approverRole` to the `RequestApproval` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RequestApproval" ADD COLUMN     "approverRole" "UserRole" NOT NULL;

-- CreateIndex
CREATE INDEX "RequestApproval_approverRole_status_idx" ON "RequestApproval"("approverRole", "status");

-- CreateIndex
CREATE UNIQUE INDEX "RequestApproval_requestId_stepNo_key" ON "RequestApproval"("requestId", "stepNo");
