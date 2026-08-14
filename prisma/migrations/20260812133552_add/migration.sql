-- CreateTable
CREATE TABLE "DependentRequestAttachment" (
    "id" TEXT NOT NULL,
    "dependentRequestId" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "filePath" TEXT NOT NULL,
    "fileType" TEXT,
    "fileSize" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DependentRequestAttachment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "DependentRequestAttachment_dependentRequestId_idx" ON "DependentRequestAttachment"("dependentRequestId");

-- AddForeignKey
ALTER TABLE "DependentRequestAttachment" ADD CONSTRAINT "DependentRequestAttachment_dependentRequestId_fkey" FOREIGN KEY ("dependentRequestId") REFERENCES "DependentRequest"("id") ON DELETE CASCADE ON UPDATE CASCADE;
