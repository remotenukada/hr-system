import BackLink from "@/components/BackLink";
import Link from "next/link";

import { createEmploymentContractTemplate } from "@/app/actions/employment-contract-template";

export default function NewEmploymentContractTemplatePage() {
  return (
    <main className="mx-auto max-w-4xl p-6">
      <BackLink href="/employee-contract-templates" label="テンプレート一覧へ戻る" />

      <h1 className="mb-6 text-2xl font-bold">
        雇用条件書テンプレート作成
      </h1>

      <form action={createEmploymentContractTemplate} className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium">
            テンプレート名
          </label>

          <input
            name="name"
            required
            className="w-full rounded border p-2"
            placeholder="例: 正社員テンプレート"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">
            契約区分
          </label>

          <input
            name="contractType"
            required
            className="w-full rounded border p-2"
            placeholder="例: 期間の定めなし"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div>
            <label className="mb-1 block text-sm font-medium">
              始業時刻
            </label>

            <input
              type="time"
              name="workStartTime"
              defaultValue="09:00"
              className="w-full rounded border p-2"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              終業時刻
            </label>

            <input
              type="time"
              name="workEndTime"
              defaultValue="18:00"
              className="w-full rounded border p-2"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              休憩時間（分）
            </label>

            <input
              type="number"
              name="breakMinutes"
              defaultValue="60"
              className="w-full rounded border p-2"
            />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">
            休日
          </label>

          <input
            name="holidayRule"
            defaultValue="土日祝"
            className="w-full rounded border p-2"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">
            賃金形態
          </label>

          <select
            name="wageType"
            className="w-full rounded border p-2"
            defaultValue="月給"
          >
            <option value="月給">月給</option>
            <option value="時給">時給</option>
            <option value="日給">日給</option>
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">
            試用期間
          </label>

          <input
            name="probationPeriod"
            placeholder="例: 3ヶ月"
            className="w-full rounded border p-2"
          />
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            保存する
          </button>
        </div>
      </form>
    </main>
  );
}
