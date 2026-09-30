ALTER TABLE "Employee"
ADD COLUMN IF NOT EXISTS "onboardingCompletedAt" TIMESTAMP(3),
ADD COLUMN IF NOT EXISTS "onboardingSkippedItems" JSONB;

UPDATE "Employee"
SET "onboardingCompletedAt" = CURRENT_TIMESTAMP
WHERE "onboardingCompletedAt" IS NULL;
