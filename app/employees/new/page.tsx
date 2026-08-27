import BackLink from "@/components/BackLink";
import { requireHRManager } from "@/lib/auth-guard";
import Link from "next/link";
import { createEmployee } from "@/app/actions/employee";
import { prisma } from "@/lib/prisma";

export default async function NewEmployeePage() {
  await requireHRManager();

  const departments = await prisma.department.findMany({
    orderBy: { name: "asc" },
  });

  const jobTitles = await prisma.jobTitleMaster.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: "asc" },
  });

  const positions = await prisma.positionMaster.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: "asc" },
  });

  return (
    <main className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-sm border my-8">
      <BackLink href="/employees" label="社員一覧へ戻る" />
      <h1 className="text-xl font-bold mb-6 text-slate-800">新規社員登録</h1>

      <form action={createEmployee} className="space-y-6">
        <section className="space-y-4">
          <h2 className="text-sm font-semibold text-slate-500 border-b pb-1">
            基本情報
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                社員番号 <span className="text-red-500">*</span>
              </label>
              <input
                required
                name="employeeNo"
                className="border p-2 w-full rounded focus:outline-indigo-500"
                placeholder="例: EMP-001"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                メールアドレス <span className="text-red-500">*</span>
              </label>
              <input
                required
                type="email"
                name="email"
                className="border p-2 w-full rounded focus:outline-indigo-500"
                placeholder="example@company.com"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                氏名（漢字） <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-2">
                <input
                  required
                  name="lastName"
                  className="border p-2 w-full rounded focus:outline-indigo-500"
                  placeholder="姓"
                />
                <input
                  required
                  name="firstName"
                  className="border p-2 w-full rounded focus:outline-indigo-500"
                  placeholder="名"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                氏名（ふりがな）
              </label>
              <div className="flex gap-2">
                <input
                  name="lastNameKana"
                  className="border p-2 w-full rounded focus:outline-indigo-500"
                  placeholder="姓（ふりがな）"
                />
                <input
                  name="firstNameKana"
                  className="border p-2 w-full rounded focus:outline-indigo-500"
                  placeholder="名（ふりがな）"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                性別
              </label>
              <select
                name="gender"
                className="border p-2 w-full rounded focus:outline-indigo-500 bg-white"
              >
                <option value="">性別を選択</option>
                <option value="MALE">男性</option>
                <option value="FEMALE">女性</option>
                <option value="OTHER">その他</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                生年月日
              </label>
              <input
                type="date"
                name="birthDate"
                className="border p-2 w-full rounded focus:outline-indigo-500"
              />
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-sm font-semibold text-slate-500 border-b pb-1">
            連絡先・住所
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                電話番号
              </label>
              <input
                name="phoneNumber"
                className="border p-2 w-full rounded focus:outline-indigo-500"
                placeholder="090-1234-5678"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-slate-700 mb-1">
                住所
              </label>
              <textarea
                name="address"
                rows={2}
                className="border p-2 w-full rounded focus:outline-indigo-500 resize-none"
                placeholder="東京都千代田区1-1-1"
              />
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-sm font-semibold text-slate-500 border-b pb-1">
            組織・雇用情報
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                部署
              </label>
              <select
                name="departmentId"
                className="border p-2 w-full rounded focus:outline-indigo-500 bg-white"
              >
                <option value="">部署を選択</option>
                {departments.map((dept) => (
                  <option key={dept.id} value={dept.id}>
                    {dept.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                職種
              </label>
              <select
                name="occupation"
                className="border p-2 w-full rounded focus:outline-indigo-500 bg-white"
              >
                <option value="">職種を選択</option>
                {jobTitles.map((item) => (
                  <option key={item.id} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                役職
              </label>
              <select
                name="position"
                className="border p-2 w-full rounded focus:outline-indigo-500 bg-white"
              >
                <option value="">役職を選択</option>
                {positions.map((item) => (
                  <option key={item.id} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                雇用形態
              </label>
              <select
                name="employmentType"
                className="border p-2 w-full rounded focus:outline-indigo-500 bg-white"
              >
                <option value="">雇用形態を選択</option>
                <option value="FULL_TIME">正職員</option>
                <option value="CONTRACT">契約職員</option>
                <option value="PART_TIME">パート</option>
                <option value="TEMPORARY">派遣</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                週所定労働日数
              </label>
              <input
                type="number"
                step="0.5"
                name="weeklyScheduledDays"
                className="border p-2 w-full rounded"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                週所定労働時間
              </label>
              <input
                type="number"
                step="0.5"
                name="weeklyScheduledHours"
                className="border p-2 w-full rounded"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                年間所定労働日数
              </label>
              <input
                type="number"
                name="annualScheduledDays"
                className="border p-2 w-full rounded"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                1日所定労働時間
              </label>
              <input
                type="number"
                step="0.5"
                name="dailyScheduledHours"
                className="border p-2 w-full rounded"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                入職日
              </label>
              <input
                type="date"
                name="hireDate"
                className="border p-2 w-full rounded focus:outline-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                退職日
              </label>
              <input
                type="date"
                name="retirementDate"
                className="border p-2 w-full rounded focus:outline-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                通勤区分
              </label>
              <input
                name="commutingType"
                className="border p-2 w-full rounded focus:outline-indigo-500"
                placeholder="例: 公共交通機関"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                ステータス
              </label>
              <select
                name="status"
                className="border p-2 w-full rounded focus:outline-indigo-500 bg-white"
                defaultValue="ACTIVE"
              >
                <option value="PRE_HIRE">採用予定者</option>
                <option value="ACTIVE">在職</option>
                <option value="LEAVE">休職</option>
                <option value="RETIRED">退職</option>
              </select>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-sm font-semibold text-slate-500 border-b pb-1">
            保険情報
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                被保険者番号
              </label>
              <input
                name="healthInsuranceNo"
                className="border p-2 w-full rounded focus:outline-indigo-500"
                placeholder="例: 12345678"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                雇用保険番号
              </label>
              <input
                name="employmentInsuranceNo"
                className="border p-2 w-full rounded focus:outline-indigo-500"
                placeholder="例: 12345678901"
              />
            </div>
          </div>
        </section>

        <div className="flex justify-end gap-3 pt-4 border-t">
          <button
            type="submit"
            className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded text-sm transition"
          >
            登録する
          </button>
        </div>
      </form>
    </main>
  );
}
