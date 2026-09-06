-- AlterTable
ALTER TABLE "EmployeeCertificationAttachment" ADD COLUMN     "documentRuleId" TEXT;

-- CreateTable
CREATE TABLE "CertificationDocumentRule" (
    "id" TEXT NOT NULL,
    "certificationId" TEXT NOT NULL,
    "documentName" TEXT NOT NULL,
    "required" BOOLEAN NOT NULL DEFAULT true,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CertificationDocumentRule_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "CertificationDocumentRule_certificationId_idx" ON "CertificationDocumentRule"("certificationId");

-- CreateIndex
CREATE UNIQUE INDEX "CertificationDocumentRule_certificationId_documentName_key" ON "CertificationDocumentRule"("certificationId", "documentName");

-- CreateIndex
CREATE INDEX "EmployeeCertificationAttachment_documentRuleId_idx" ON "EmployeeCertificationAttachment"("documentRuleId");

-- AddForeignKey
ALTER TABLE "CertificationDocumentRule" ADD CONSTRAINT "CertificationDocumentRule_certificationId_fkey" FOREIGN KEY ("certificationId") REFERENCES "Certification"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmployeeCertificationAttachment" ADD CONSTRAINT "EmployeeCertificationAttachment_documentRuleId_fkey" FOREIGN KEY ("documentRuleId") REFERENCES "CertificationDocumentRule"("id") ON DELETE SET NULL ON UPDATE CASCADE;
