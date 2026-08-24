import BackLink from "@/components/BackLink";
import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function RetirementChecklistPage(
  { params }: Props,
) {
  const { id } = await params;

  const employee = await prisma.employee.findUnique({
    where: {
      id,
    },
    include: {
      retirementChecklist: true,
      department: true,
    },
  });

  if (!employee) {
    notFound();
  }

  const checklist =
    employee.retirementChecklist ??
    await prisma.retirementChecklist.create({
      data: {
        employeeId: employee.id,
      },
    });

  const completedCount = [
    checklist.healthInsuranceReturned,
    checklist.employmentInsuranceCompleted,
    checklist.pcReturned,
    checklist.lockerReturned,
    checklist.nameTagReturned,
    checklist.uniformReturned,
    checklist.retirementCertificateIssued,
  ].filter(Boolean).length;

  const totalCount = 7;

  return (
    <main className="mx-auto max-w-4xl p-6">
      <BackLink
        href="/retirement-management"
        label="退職予定者管理に戻る"
      />

      <h1 className="mb-2 text-2xl font-bold">
        退職手続チェックリスト
      </h1>

      <p className="mb-6 text-gray-600">
        {employee.employeeNo}
        {" "}
        {employee.lastName}
        {" "}
        {employee.firstName}
      </p>

      <div className="mb-6 rounded-lg border bg-blue-50 p-4">
        <div className="text-lg font-semibold">
          進捗率
        </div>

        <div className="mt-2 text-2xl font-bold">
          {completedCount} / {totalCount}
        </div>

        <div>
          {Math.round(
            (completedCount / totalCount) * 100,
          )}
          %
        </div>
      </div>

      <div className="rounded-lg border bg-white p-6">
        <div className="space-y-4">

          <label className="flex gap-3">
            <input
              type="checkbox"
              checked={checklist.healthInsuranceReturned}
              readOnly
            />
            健康保険手続
          </label>

          <label className="flex gap-3">
            <input
              type="checkbox"
              checked={checklist.employmentInsuranceCompleted}
              readOnly
            />
            雇用保険手続
          </label>

          <label className="flex gap-3">
            <input
              type="checkbox"
              checked={checklist.pcReturned}
              readOnly
            />
            PC返却
          </label>

          <label className="flex gap-3">
            <input
              type="checkbox"
              checked={checklist.lockerReturned}
              readOnly
            />
            ロッカー返却
          </label>

          <label className="flex gap-3">
            <input
              type="checkbox"
              checked={checklist.nameTagReturned}
              readOnly
            />
            名札返却
          </label>

          <label className="flex gap-3">
            <input
              type="checkbox"
              checked={checklist.uniformReturned}
              readOnly
            />
            制服返却
          </label>

          <label className="flex gap-3">
            <input
              type="checkbox"
              checked={checklist.retirementCertificateIssued}
              readOnly
            />
            退職証明書発行
          </label>

        </div>
      </div>
    </main>
  );
}
