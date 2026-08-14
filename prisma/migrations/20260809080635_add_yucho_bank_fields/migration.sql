-- AlterTable
ALTER TABLE "EmployeeBankAccount" ADD COLUMN     "bankType" TEXT NOT NULL DEFAULT 'BANK',
ADD COLUMN     "yuchoNumber" TEXT,
ADD COLUMN     "yuchoSymbol" TEXT;
