-- CreateTable
CREATE TABLE "UserInvitation" (
    "id" TEXT NOT NULL,
    "employeeNo" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expectedHireDate" TIMESTAMP(3),
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "acceptedAt" TIMESTAMP(3),
    "createdUserId" TEXT,
    "createdEmployeeId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserInvitation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserInvitation_token_key" ON "UserInvitation"("token");

-- CreateIndex
CREATE INDEX "UserInvitation_email_idx" ON "UserInvitation"("email");

-- CreateIndex
CREATE INDEX "UserInvitation_token_idx" ON "UserInvitation"("token");

-- CreateIndex
CREATE INDEX "UserInvitation_acceptedAt_idx" ON "UserInvitation"("acceptedAt");
