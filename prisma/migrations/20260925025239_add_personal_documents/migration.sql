-- CreateTable
CREATE TABLE "PersonalDocument" (
    "id" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "documentType" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "targetYear" INTEGER,
    "targetMonth" INTEGER,
    "publishAt" TIMESTAMP(3) NOT NULL,
    "filePath" TEXT NOT NULL,
    "originalFileName" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PersonalDocument_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "PersonalDocument_employeeId_idx" ON "PersonalDocument"("employeeId");

-- CreateIndex
CREATE INDEX "PersonalDocument_documentType_idx" ON "PersonalDocument"("documentType");

-- CreateIndex
CREATE INDEX "PersonalDocument_publishAt_idx" ON "PersonalDocument"("publishAt");

-- AddForeignKey
ALTER TABLE "PersonalDocument" ADD CONSTRAINT "PersonalDocument_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;
