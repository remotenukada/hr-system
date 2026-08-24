import BackLink from "@/components/BackLink";
import { updateRetirementChecklist } from "@/app/actions/retirement-checklist";
import { requireHRManager } from "@/lib/auth-guard";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function RetirementChecklistPage({
  params,
}: Props) {
  await requireHRManager();

  const { id } = await params;

  const employee = await prisma.employee.findUnique({
    where: { id },
    include: {
      retirementChecklist: true,
      department: true,
    },
  });

  if (!employee) {
    notFound();
  }

  const checklist = employee.retirementChecklist;

  const values = [
    checklist?.healthInsuranceReturned ?? false,
    checklist?.employmentInsuranceCompleted ?? false,
    checklist?.pcReturned ?? false,
    checklist?.lockerReturned ?? false,
    checklist?.nameTagReturned ?? false,
    checklist?.uniformReturned ?? false,
    checklist?.retirementCertificateIssued ?? false,
  ];

  const completedCount = values.filter(Boolean).length;
  const percentage = Math.round(
    (completedCount / values.length) * 100,
  );

  const items = [
    ["healthInsuranceReturned", "健康保険手続", values[0]],
    ["employmentInsuranceCompleted", "雇用保険手続", values[1]],
    ["pcReturned", "PC返却", values[2]],
    ["lockerReturned", "ロッカー返却", values[3]],
    ["nameTagReturned", "名札返却", values[4]],
    ["uniformReturned", "制服返却", values[5]],
    [
      "retirementCertificateIssued",
      "退職証明書発行",
      values[6],
    ],
  ] as const;

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
        {employee.employeeNo} {employee.lastName}{" "}
        {employee.firstName}
      </p>

      <div className="mb-6 rounded-lg border bg-blue-50 p-4">
        <p className="font-semibold">進捗率</p>
        <p className="mt-1 text-2xl font-bold">
          {completedCount} / {values.length}（{percentage}%）
        </p>
      </div>

      <form action={updateRetirementChecklist}>
        <input
          type="hidden"
          name="employeeId"
          value={employee.id}
        />

        <div className="space-y-4">
          {items.map(([name, label, checked]) => (
            <label
              key={name}
              className="flex items-center gap-3"
            >
              <input
                type="checkbox"
                name={name}
                defaultChecked={checked}
                className="h-5 w-5"
              />
              {label}
            </label>
          ))}
        </div>

        <div className="mt-6">
          <label className="mb-1 block text-sm font-medium">
            備考
          </label>
          <textarea
            name="memo"
            defaultValue={checklist?.memo ?? ""}
            rows={4}
            className="w-full rounded border p-2"
          />
        </div>

        <button
          type="submit"
          className="mt-6 rounded bg-blue-600 px-5 py-2 font-medium text-white hover:bg-blue-700"
        >
          保存
        </button>
      </form>
    </main>
  );
}
