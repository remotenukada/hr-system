ALTER TABLE "EmployeePledge"
  ADD COLUMN IF NOT EXISTS "guarantorToken" TEXT,
  ADD COLUMN IF NOT EXISTS "guarantorTokenExpiresAt" TIMESTAMP(3);

CREATE UNIQUE INDEX IF NOT EXISTS
  "EmployeePledge_guarantorToken_key"
ON "EmployeePledge"("guarantorToken");
