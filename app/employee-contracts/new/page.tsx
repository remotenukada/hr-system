import Link from "next/link";

import { requireHRManager } from "@/lib/auth-guard";
import { prisma } from "@/lib/prisma";
import { createEmploymentContract } from "@/app/actions/employment-contract";
import { EmploymentContractTemplateSelector } from "@/components/EmploymentContractTemplateSelector";

export default async function NewEmploymentContractPage() {
  await requireHRManager();

  const employees = await prisma.employee.findMany({
    orderBy: {
      employeeNo: "asc",
    },
    select: {
      id: true,
      employeeNo: true,
      lastName: true,
      firstName: true,
    },
  });

  const templates =
    await prisma.employmentContractTemplate.findMany({
      where: {
        isActive: true,
      },
      orderBy: {
        name: "asc",
      },
      select: {
        id: true,
        name: true,
        contractType: true,
        workStartTime: true,
        workEndTime: true,
        breakMinutes: true,
        holidayRule: true,
        leaveRule: true,
        wageType: true,
        baseSalary: true,
        allowanceNote: true,
        payClosingDay: true,
        payDate: true,
        bonusRule: true,
        raiseRule: true,
        probationPeriod: true,
        contractRenewalRule: true,
        contractRenewalCriteria: true,
        retirementRule: true,
        retirementAllowanceRule: true,
        socialInsuranceRule: true,
        employmentInsuranceRule: true,
        consultationDesk: true,
        workRuleLocation: true,
        remarks: true,
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

  return (
    <main className="mx-auto max-w-4xl p-6">
      <div className="mb-6">
        <Link
          href="/employee-contracts"
          className="text-sm text-blue-600 hover:underline"
        >
          ← 雇用条件書一覧へ戻る
        </Link>
      </div>

      <h1 className="mb-6 text-2xl font-bold">
        雇用条件書作成
      </h1>

      <form action={createEmploymentContract} className="space-y-6 rounded-lg border bg-white p-6 shadow-sm">
        <section className="space-y-4">
          <h2 className="border-b pb-2 text-sm font-semibold text-gray-600">
            基本情報
          </h2>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <EmploymentContractTemplateSelector templates={templates} />

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                対象社員 <span className="text-red-500">*</span>
              </label>
              <select
                name="employeeId"
                required
                className="w-full rounded border p-2"
              >
                <option value="">選択してください</option>
                {employees.map((employee) => (
                  <option key={employee.id} value={employee.id}>
                    {employee.employeeNo} {employee.lastName} {employee.firstName}
                  </option>
                ))}
              </select>
            </div>

            
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                雇用形態
              </label>
              <select
                name="employmentCategory"
                defaultValue="常勤"
                className="w-full rounded border p-2"
              >
                <option value="常勤">常勤</option>
                <option value="非常勤">非常勤</option>
                <option value="パート">パート</option>
                <option value="アルバイト">アルバイト</option>
                <option value="契約社員">契約社員</option>
                <option value="嘱託">嘱託</option>
                <option value="派遣">派遣</option>
              </select>
            </div>

<div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                契約区分 <span className="text-red-500">*</span>
              </label>
              <select
                name="contractType"
                required
                className="w-full rounded border p-2"
              >
                <option value="">選択してください</option>
                <option value="期間の定めなし">期間の定めなし</option>
                <option value="期間の定めあり">期間の定めあり</option>
                <option value="パートタイム">パートタイム</option>
                <option value="アルバイト">アルバイト</option>
                <option value="嘱託">嘱託</option>
              </select>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                契約開始日 <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="startDate"
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
                type="text"
                name="workplace"
                required
                placeholder="例: 本社 / 東京支店"
                className="w-full rounded border p-2"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                従事する業務 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="jobDescription"
                required
                placeholder="例: システム開発・保守業務"
                className="w-full rounded border p-2"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                賃金形態
              </label>
              <select
                name="wageType"
                defaultValue="月給"
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
                基本給（月額/円） <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="baseSalary"
                required
                min="0"
                placeholder="300000"
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
                      placeholder="例: 10,000円 / 実費支給"
                      className="w-full rounded border p-2"
                    />
                  </div>
                ))}
              </div>
            </div>

            <input type="hidden" name="workStartTime" value="08:30" />
            <input type="hidden" name="workEndTime" value="17:30" />
            <input type="hidden" name="breakMinutes" value="60" />

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

                {workScheduleMasters.map((schedule) => (
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
                defaultValue="土日祝"
                className="w-full rounded border p-2"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                休暇
              </label>
              <input
                name="leaveRule"
                className="w-full rounded border p-2"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                賃金締切日
              </label>
              <input
                name="payClosingDay"
                className="w-full rounded border p-2"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                賃金支払日
              </label>
              <input
                name="payDate"
                className="w-full rounded border p-2"
              />
            </div>
          </div>
        </section>

        <div className="flex justify-end gap-3 pt-4">
          <Link
            href="/employee-contracts"
            className="rounded border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            キャンセル
          </Link>
          <button
            type="submit"
            className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            登録する
          </button>
        </div>
      </form>
    </main>
  );
}
