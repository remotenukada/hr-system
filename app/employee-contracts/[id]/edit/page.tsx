import BackLink from "@/components/BackLink";
import Link from "next/link";
import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { requireHRManager } from "@/lib/auth-guard";
import { updateEmploymentContract } from "@/app/actions/employment-contract";
import { DirtySubmitButton } from "@/components/DirtySubmitButton";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

function dateInputValue(date: Date | null) {
  if (!date) {
    return "";
  }

  return date.toISOString().split("T")[0];
}

export default async function EditEmploymentContractPage(
  { params }: Props,
) {
  await requireHRManager();

  await requireHRManager();

  const { id } = await params;

  const contract =
    await prisma.employmentContract.findUnique({
      where: {
        id,
      },
      include: {
        employee: true,
        workSchedules: {
          orderBy: {
            sortOrder: "asc",
          },
        },
      },
    });

  const workScheduleMasters =
    await prisma.workScheduleMaster.findMany({
      where: {
        isActive: true,
      },
      orderBy: [
        { sortOrder: "asc" },
        { name: "asc" },
      ],
    });

  if (!contract) {
    notFound();
  }

  const editableWorkSchedules =
    contract.workSchedules.length > 0
      ? contract.workSchedules
      : workScheduleMasters;


  const allowanceMasters =
    await prisma.allowanceMaster.findMany({
      where: {
        isActive: true,
      },
      orderBy: [
        { sortOrder: "asc" },
        { name: "asc" },
      ],
    });

  const allowanceValueMap = new Map(
    (contract.allowanceNote ?? "")
      .split(/\r?\n/)
      .map((line) => line.split(/[:：]/, 2))
      .filter(([name]) => Boolean(name?.trim()))
      .map(([name, value]) => [
        name.trim(),
        value?.trim() ?? "",
      ]),
  );

  const employmentCategoryMasters =
    await prisma.employmentCategoryMaster.findMany({
      where: {
        OR: [
          { isActive: true },
          {
            name:
              contract.employmentCategory ?? "",
          },
        ],
      },
      orderBy: [
        { sortOrder: "asc" },
        { name: "asc" },
      ],
    });


  const contractTypeMasters =
    await prisma.contractTypeMaster.findMany({
      where: {
        OR: [
          { isActive: true },
          {
            name:
              contract.contractType ?? "",
          },
        ],
      },
      orderBy: [
        { sortOrder: "asc" },
        { name: "asc" },
      ],
    });

  const jobTitleMasters =
    await prisma.jobTitleMaster.findMany({
      where: {
        OR: [
          { isActive: true },
          { name: contract.occupation ?? "" },
        ],
      },
      orderBy: [
        { sortOrder: "asc" },
        { name: "asc" },
      ],
    });

  const positionMasters =
    await prisma.positionMaster.findMany({
      where: {
        OR: [
          { isActive: true },
          { name: contract.position ?? "" },
        ],
      },
      orderBy: [
        { sortOrder: "asc" },
        { name: "asc" },
      ],
    });

  return (
    <main className="mx-auto max-w-4xl p-6">
      <BackLink href="/employee-contracts" label="雇用条件書一覧へ戻る" />

      <h1 className="mb-6 text-2xl font-bold">
        雇用条件書編集
      </h1>

      <form action={updateEmploymentContract} className="space-y-6">
        <input
          type="hidden"
          name="id"
          value={contract.id}
        />

        <section className="space-y-4">
          <h2 className="border-b pb-2 text-sm font-semibold text-gray-600">
            基本情報
          </h2>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className="mb-1 block text-sm font-medium text-gray-700">
                対象社員
              </label>
              <input
                value={`${contract.employee.employeeNo} ${contract.employee.lastName} ${contract.employee.firstName}`}
                disabled
                className="w-full rounded border bg-gray-100 p-2 text-gray-700"
              />
            </div>

                        <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                雇用形態
              </label>
              <select
                name="employmentCategory"
                defaultValue={contract.employmentCategory ?? "常勤"}
                className="w-full rounded border p-2"
              >
                {employmentCategoryMasters.map(
                  (item) => (
                    <option
                      key={item.id}
                      value={item.name}
                    >
                      {item.name}
                    </option>
                  ),
                )}
              </select>
            </div>

<div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                契約区分 <span className="text-red-500">*</span>
              </label>
              <select
                name="contractType"
                defaultValue={contract.contractType}
                required
                className="w-full rounded border p-2"
              >
                {contractTypeMasters.map(
                  (item) => (
                    <option
                      key={item.id}
                      value={item.name}
                    >
                      {item.name}
                    </option>
                  ),
                )}
              </select>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                職種
              </label>
              <select
                name="occupation"
                defaultValue={contract.occupation ?? ""}
                className="w-full rounded border p-2"
              >
                <option value="">選択してください</option>
                {jobTitleMasters.map((item) => (
                  <option key={item.id} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                役職
              </label>
              <select
                name="position"
                defaultValue={contract.position ?? ""}
                className="w-full rounded border p-2"
              >
                <option value="">選択してください</option>
                {positionMasters.map((item) => (
                  <option key={item.id} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                賃金形態
              </label>
              <select
                name="wageType"
                defaultValue={contract.wageType}
                className="w-full rounded border p-2"
              >
                <option value="月給">月給</option>
                <option value="日給">日給</option>
                <option value="時給">時給</option>
                <option value="その他">その他</option>
              </select>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                契約開始日 <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="startDate"
                defaultValue={dateInputValue(contract.startDate)}
                required
                className="w-full rounded border p-2"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                契約終了日
              </label>
              <input
                type="date"
                name="endDate"
                defaultValue={dateInputValue(contract.endDate)}
                className="w-full rounded border p-2"
              />
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="border-b pb-2 text-sm font-semibold text-gray-600">
            就業内容・賃金
          </h2>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                就業場所 <span className="text-red-500">*</span>
              </label>
              <input
                name="workplace"
                defaultValue={contract.workplace}
                required
                className="w-full rounded border p-2"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                従事する業務 <span className="text-red-500">*</span>
              </label>
              <input
                name="jobDescription"
                defaultValue={contract.jobDescription}
                required
                className="w-full rounded border p-2"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                基本給（円） <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="baseSalary"
                defaultValue={contract.baseSalary}
                required
                min="0"
                className="w-full rounded border p-2"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                手当
              </label>

              <div className="space-y-2 rounded border p-3">
                {allowanceMasters.map((allowance) => (
                  <div
                    key={allowance.id}
                    className="grid grid-cols-2 items-center gap-3"
                  >
                    <div className="text-sm">
                      {allowance.name}
                    </div>

                    <input
                      type="hidden"
                      name="allowanceName"
                      value={allowance.name}
                    />

                    <input
                      name="allowanceValue"
                      defaultValue={
                        allowanceValueMap.get(allowance.name) ?? ""
                      }
                      placeholder="例: 10,000円 / 実費支給"
                      className="w-full rounded border p-2"
                    />
                  </div>
                ))}
              </div>
            </div>

            <input type="hidden" name="workStartTime" value={contract.workStartTime} />
            <input type="hidden" name="workEndTime" value={contract.workEndTime} />
            <input type="hidden" name="breakMinutes" value={contract.breakMinutes} />

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                勤務時間
              </label>

              <div className="space-y-2 rounded border p-3">
                <div className="grid grid-cols-4 gap-2 text-xs text-gray-500">
                  <div>名称</div>
                  <div>開始</div>
                  <div>終了</div>
                  <div>休憩（分）</div>
                </div>

                {editableWorkSchedules.map((schedule) => (
                  <div
                    key={schedule.id}
                    className="grid grid-cols-4 gap-2"
                  >
                    <input
                      name="workScheduleName"
                      defaultValue={schedule.name}
                      className="w-full rounded border p-2"
                    />
                    <input
                      type="time"
                      name="workScheduleStartTime"
                      defaultValue={schedule.startTime}
                      className="w-full rounded border p-2"
                    />
                    <input
                      type="time"
                      name="workScheduleEndTime"
                      defaultValue={schedule.endTime}
                      className="w-full rounded border p-2"
                    />
                    <input
                      type="number"
                      name="workScheduleBreakMinutes"
                      defaultValue={schedule.breakMinutes}
                      min="0"
                      className="w-full rounded border p-2"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                休日
              </label>
              <input
                name="holidayRule"
                defaultValue={contract.holidayRule}
                className="w-full rounded border p-2"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                休暇
              </label>
              <input
                name="leaveRule"
                defaultValue={contract.leaveRule ?? ""}
                className="w-full rounded border p-2"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                賃金締切日
              </label>
              <input
                name="payClosingDay"
                defaultValue={contract.payClosingDay ?? ""}
                className="w-full rounded border p-2"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                賃金支払日
              </label>
              <input
                name="payDate"
                defaultValue={contract.payDate ?? ""}
                className="w-full rounded border p-2"
              />
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="border-b pb-2 text-sm font-semibold text-gray-600">
            その他
          </h2>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                賞与
              </label>
              <input
                name="bonusRule"
                defaultValue={contract.bonusRule ?? ""}
                className="w-full rounded border p-2"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                昇給
              </label>
              <input
                name="raiseRule"
                defaultValue={contract.raiseRule ?? ""}
                className="w-full rounded border p-2"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                試用期間
              </label>
              <input
                name="probationPeriod"
                defaultValue={contract.probationPeriod ?? ""}
                className="w-full rounded border p-2"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                契約更新有無
              </label>
              <input
                name="contractRenewalRule"
                defaultValue={contract.contractRenewalRule ?? ""}
                className="w-full rounded border p-2"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-1 block text-sm font-medium text-gray-700">
                契約更新基準
              </label>
              <input
                name="contractRenewalCriteria"
                defaultValue={contract.contractRenewalCriteria ?? ""}
                className="w-full rounded border p-2"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                退職金制度
              </label>
              <input
                name="retirementAllowanceRule"
                defaultValue={contract.retirementAllowanceRule ?? ""}
                className="w-full rounded border p-2"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                退職に関する事項
              </label>
              <input
                name="retirementRule"
                defaultValue={contract.retirementRule ?? ""}
                className="w-full rounded border p-2"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                社会保険
              </label>
              <input
                name="socialInsuranceRule"
                defaultValue={contract.socialInsuranceRule ?? ""}
                className="w-full rounded border p-2"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                雇用保険
              </label>
              <input
                name="employmentInsuranceRule"
                defaultValue={contract.employmentInsuranceRule ?? ""}
                className="w-full rounded border p-2"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-1 block text-sm font-medium text-gray-700">
                相談窓口
              </label>
              <input
                name="consultationDesk"
                defaultValue={contract.consultationDesk ?? ""}
                className="w-full rounded border p-2"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-1 block text-sm font-medium text-gray-700">
                就業規則確認方法
              </label>
              <input
                name="workRuleLocation"
                defaultValue={contract.workRuleLocation ?? ""}
                className="w-full rounded border p-2"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-1 block text-sm font-medium text-gray-700">
                備考
              </label>
              <textarea
                name="remarks"
                defaultValue={contract.remarks ?? ""}
                className="min-h-[120px] w-full rounded border p-2"
              />
            </div>
          </div>
        </section>

        <div className="flex justify-end gap-3">
          <Link
            href={`/employee-contracts/${contract.id}`}
            className="rounded border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            キャンセル
          </Link>

          <DirtySubmitButton
            label="更新する"
            pendingLabel="更新中..."
          />
        </div>
      </form>
    </main>
  );
}
