CREATE TYPE "PaperSubmissionType" AS ENUM (
  'PLEDGE',
  'BANK_ACCOUNT',
  'MY_NUMBER'
);

CREATE TYPE "PaperSubmissionStatus" AS ENUM (
  'PLANNED',
  'RECEIVED',
  'VERIFIED',
  'DEFICIENT'
);

CREATE TABLE "PaperSubmission" (
  "id" TEXT NOT NULL,
  "employeeId" TEXT NOT NULL,
  "type" "PaperSubmissionType" NOT NULL,
  "status" "PaperSubmissionStatus" NOT NULL DEFAULT 'PLANNED',
  "receivedAt" TIMESTAMP(3),
  "verifiedAt" TIMESTAMP(3),
  "verifiedBy" TEXT,
  "note" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "PaperSubmission_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "PaperSubmission_employeeId_fkey"
    FOREIGN KEY ("employeeId")
    REFERENCES "Employee"("id")
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE UNIQUE INDEX "PaperSubmission_employeeId_type_key"
ON "PaperSubmission"("employeeId", "type");

CREATE INDEX "PaperSubmission_status_idx"
ON "PaperSubmission"("status");

CREATE INDEX "PaperSubmission_type_idx"
ON "PaperSubmission"("type");
