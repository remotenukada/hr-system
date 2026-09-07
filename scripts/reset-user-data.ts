import { prisma } from "../lib/prisma";

async function main() {
  const admin = await prisma.user.findFirst({
    where: {
      role: "ADMIN",
      email: "admin@example.com",
    },
  });

  if (!admin) {
    throw new Error(
      "admin@example.com のADMINユーザーが見つかりません。",
    );
  }

  console.log("残すADMIN:", admin.email);

  await prisma.$transaction(async (tx) => {
    // 業務データ
    await tx.auditLog.deleteMany();
    await tx.requestHistory.deleteMany();
    await tx.requestAttachment.deleteMany();
    await tx.requestApproval.deleteMany();
    await tx.employeeRequest.deleteMany();

    await tx.employeeCertificationAttachment.deleteMany();
    await tx.employeeCertification.deleteMany();

    await tx.employeeBankAttachment.deleteMany();
    await tx.employeeBankAccount.deleteMany();

    await tx.employeeMyNumber.deleteMany();

    await tx.dependentRequestAttachment.deleteMany();
    await tx.dependentRequest.deleteMany();

    await tx.profileChangeRequest.deleteMany();

    await tx.leaveGrantHistory.deleteMany();
    await tx.leaveBalance.deleteMany();
    await tx.leaveTypeBalance.deleteMany();

    await tx.salaryHistory.deleteMany();
    await tx.employeeSalary.deleteMany();

    await tx.employmentHistory.deleteMany();
    await tx.employeeTransfer.deleteMany();

    await tx.retirementCertificate.deleteMany();
    await tx.retirementChecklist.deleteMany();
    await tx.loanedAsset.deleteMany();

    await tx.lateRecord.deleteMany();
    await tx.earlyLeaveRecord.deleteMany();
    await tx.outingRecord.deleteMany();

    await tx.employmentContractConsent.deleteMany();
    await tx.employmentContractWorkSchedule.deleteMany();
    await tx.employmentContract.deleteMany();

    await tx.dependent.deleteMany();

    await tx.employee.deleteMany();

    await tx.userInvitation.deleteMany();

    // ADMIN以外のユーザー削除
    await tx.user.deleteMany({
      where: {
        id: {
          not: admin.id,
        },
      },
    });
  });

  console.log("ユーザーデータ初期化完了");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
