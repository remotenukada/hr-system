-- CreateTable
CREATE TABLE "ApprovalRoute" (
    "id" TEXT NOT NULL,
    "facilityId" TEXT,
    "departmentId" TEXT,
    "stepNo" INTEGER NOT NULL,
    "approverRole" "UserRole" NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ApprovalRoute_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ApprovalRoute_facilityId_idx" ON "ApprovalRoute"("facilityId");

-- CreateIndex
CREATE INDEX "ApprovalRoute_departmentId_idx" ON "ApprovalRoute"("departmentId");

-- CreateIndex
CREATE INDEX "ApprovalRoute_stepNo_idx" ON "ApprovalRoute"("stepNo");

-- AddForeignKey
ALTER TABLE "ApprovalRoute" ADD CONSTRAINT "ApprovalRoute_facilityId_fkey" FOREIGN KEY ("facilityId") REFERENCES "Facility"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApprovalRoute" ADD CONSTRAINT "ApprovalRoute_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department"("id") ON DELETE SET NULL ON UPDATE CASCADE;
