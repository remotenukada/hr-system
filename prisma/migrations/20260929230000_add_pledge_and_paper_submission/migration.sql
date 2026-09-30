DO $$ BEGIN
  CREATE TYPE "SubmissionMethod" AS ENUM ('ELECTRONIC', 'PAPER');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE "PledgeStatus" AS ENUM (
    'PENDING',
    'EMPLOYEE_SIGNED',
    'GUARANTOR_PENDING',
    'GUARANTOR_CONFIRMED',
    'PAPER_UPLOADED',
    'COMPLETED',
    'REJECTED'
  );
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

ALTER TYPE "ResidenceAttachmentType"
ADD VALUE IF NOT EXISTS 'PAPER_APPLICATION';

ALTER TYPE "CommutingAttachmentType"
ADD VALUE IF NOT EXISTS 'PAPER_APPLICATION';

ALTER TABLE "ResidenceRequest"
ADD COLUMN IF NOT EXISTS "submissionMethod"
  "SubmissionMethod" NOT NULL DEFAULT 'ELECTRONIC',
ADD COLUMN IF NOT EXISTS "paperSubmittedAt" TIMESTAMP(3);

ALTER TABLE "CommutingRequest"
ADD COLUMN IF NOT EXISTS "submissionMethod"
  "SubmissionMethod" NOT NULL DEFAULT 'ELECTRONIC',
ADD COLUMN IF NOT EXISTS "paperSubmittedAt" TIMESTAMP(3);

CREATE TABLE IF NOT EXISTS "EmployeePledge" (
  "id" TEXT NOT NULL,
  "employeeId" TEXT NOT NULL,
  "submissionMethod" "SubmissionMethod" NOT NULL,
  "status" "PledgeStatus" NOT NULL DEFAULT 'PENDING',
  "templateVersion" TEXT,
  "documentHash" TEXT,
  "employeeSignerName" TEXT,
  "employeeSignedAt" TIMESTAMP(3),
  "employeeSignedIp" TEXT,
  "guarantorName" TEXT,
  "guarantorEmail" TEXT,
  "guarantorConfirmedAt" TIMESTAMP(3),
  "fileName" TEXT,
  "filePath" TEXT,
  "fileType" TEXT,
  "fileSize" INTEGER,
  "verifiedAt" TIMESTAMP(3),
  "verifiedBy" TEXT,
  "reviewComment" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "EmployeePledge_pkey" PRIMARY KEY ("id")
);

-- インデックスの作成
CREATE INDEX IF NOT EXISTS "EmployeePledge_employeeId_idx" ON "EmployeePledge"("employeeId");
CREATE INDEX IF NOT EXISTS "EmployeePledge_submissionMethod_idx" ON "EmployeePledge"("submissionMethod");
CREATE INDEX IF NOT EXISTS "EmployeePledge_status_idx" ON "EmployeePledge"("status");

-- 外部キー制約の追加（既に存在しない場合のみ）
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'EmployeePledge_employeeId_fkey'
  ) THEN
    ALTER TABLE "EmployeePledge"
    ADD CONSTRAINT "EmployeePledge_employeeId_fkey"
    FOREIGN KEY ("employeeId") REFERENCES "Employee"("id")
    ON DELETE CASCADE ON UPDATE CASCADE;
  END IF;
END $$;
