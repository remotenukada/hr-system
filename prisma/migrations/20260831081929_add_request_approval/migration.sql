-- CreateTable
CREATE TABLE "RequestApproval" (
    "id" TEXT NOT NULL,
    "requestId" TEXT NOT NULL,
    "stepNo" INTEGER NOT NULL,
    "approverId" TEXT,
    "status" "RequestStatus" NOT NULL DEFAULT 'PENDING',
    "comment" TEXT,
    "approvedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RequestApproval_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "RequestApproval_requestId_idx" ON "RequestApproval"("requestId");

-- CreateIndex
CREATE INDEX "RequestApproval_stepNo_idx" ON "RequestApproval"("stepNo");

-- AddForeignKey
ALTER TABLE "RequestApproval" ADD CONSTRAINT "RequestApproval_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "EmployeeRequest"("id") ON DELETE CASCADE ON UPDATE CASCADE;
