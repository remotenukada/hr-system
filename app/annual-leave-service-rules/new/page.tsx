import { createAnnualLeaveServiceRule } from "@/app/actions/annual-leave-service-rule";
import BackLink from "@/components/BackLink";

export default function NewAnnualLeaveServiceRulePage() {
  return (
    <main className="mx-auto max-w-2xl p-6">
      <BackLink
        href="/annual-leave-service-rules"
        label="年次有給付与ルール一覧へ戻る"
      />

      <h1 className="mb-6 text-2xl font-bold">年次有給付与ルール登録</h1>

      <form action={createAnnualLeaveServiceRule} className="space-y-4">
        <div>
          <label>勤続月数</label>
          <input
            name="serviceMonths"
            type="number"
            required
            className="w-full rounded border p-2"
          />
        </div>

        <div>
          <label>法定付与日数</label>
          <input
            name="legalDays"
            type="number"
            step="0.5"
            required
            className="w-full rounded border p-2"
          />
        </div>

        <div>
          <label>特別休暇日数</label>
          <input
            name="specialDays"
            type="number"
            step="0.5"
            required
            className="w-full rounded border p-2"
          />
        </div>

        <div>
          <label>年間上限日数</label>
          <input
            name="maxTotalDays"
            type="number"
            step="0.5"
            defaultValue="20"
            required
            className="w-full rounded border p-2"
          />
        </div>

        <label className="flex gap-2">
          <input
            type="checkbox"
            name="allowManualSpecialAdjustment"
            defaultChecked
          />
          特別休暇の手動補正を許可
        </label>

        <label className="flex gap-2">
          <input type="checkbox" name="isActive" defaultChecked />
          有効
        </label>

        <button
          type="submit"
          className="rounded bg-blue-600 px-4 py-2 text-white"
        >
          登録
        </button>
      </form>
    </main>
  );
}
