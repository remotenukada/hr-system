ALTER TABLE "EmployeePledge"
  ADD COLUMN IF NOT EXISTS "guarantorRelation" TEXT,
  ADD COLUMN IF NOT EXISTS "guarantorAddress" TEXT,
  ADD COLUMN IF NOT EXISTS "guarantorPhone" TEXT;
