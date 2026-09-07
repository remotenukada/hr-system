import { prisma } from "../lib/prisma";

async function main() {
  console.table({
    users: await prisma.user.count(),
    employees: await prisma.employee.count(),
    requests: await prisma.employeeRequest.count(),
    audits: await prisma.auditLog.count(),
    certifications: await prisma.employeeCertification.count(),
    myNumbers: await prisma.employeeMyNumber.count(),
    bankAccounts: await prisma.employeeBankAccount.count(),
  });
}

main()
  .finally(async () => {
    await prisma.$disconnect();
  });
