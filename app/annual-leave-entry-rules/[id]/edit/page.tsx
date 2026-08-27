import BackLink from "@/components/BackLink";
import { prisma } from "@/lib/prisma";
import { updateAnnualLeaveEntryRule } from "@/app/actions/annual-leave-entry-rule";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditAnnualLeaveEntryRulePage({ params }: Props) {
  const { id } = await params;

  const rule = await prisma.annualLeaveEntryRule.findUnique({
    where: { id },
  });

  if (!rule) {
    return <main className="p-6">ルールが見つかりません。</main>;
  }

  return (
    <main className="mx-auto max-w-3xl p-6">
      <BackLink
        href="/annual-leave-entry-rules"
        label="入職月別ルール一覧へ戻る"
      />

      <h1 className="mb-6 text-2xl font-bold">入職月別ルール編集</h1>

      <form action={updateAnnualLeaveEntryRule} className="space-y-4">
        <input type="hidden" name="id" value={rule.id} />

        <div>
          <label>法定付与日数</label>
          <input
            name="legalDays"
            type="number"
            step="0.5"
            defaultValue={rule.legalDays}
            className="w-full rounded border p-2"
          />
        </div>

        <div>
          <label>特別休暇①</label>
          <input
            name="specialGrant1Days"
            type="number"
            step="0.5"
            defaultValue={rule.specialGrant1Days}
            className="w-full rounded border p-2"
          />
        </div>

        <div>
          <label>特別休暇②</label>
          <input
            name="specialGrant2Days"
            type="number"
            step="0.5"
            defaultValue={rule.specialGrant2Days}
            className="w-full rounded border p-2"
          />
        </div>

        <div>
          <label>特別休暇③</label>
          <input
            name="specialGrant3Days"
            type="number"
            step="0.5"
            defaultValue={rule.specialGrant3Days}
            className="w-full rounded border p-2"
          />
        </div>

        <div>
          <label>初年度合計</label>
          <input
            name="firstYearTotalDays"
            type="number"
            step="0.5"
            defaultValue={rule.firstYearTotalDays}
            className="w-full rounded border p-2"
          />
        </div>

        <div>
          <label>翌年度4月付与</label>
          <input
            name="nextAprilDays"
            type="number"
            step="0.5"
            defaultValue={rule.nextAprilDays}
            className="w-full rounded border p-2"
          />
        </div>

        <label className="flex gap-2">
          <input
            type="checkbox"
            name="allowManualSpecialAdjustment"
            defaultChecked={rule.allowManualSpecialAdjustment}
          />
          手動補正を許可
        </label>

        <label className="flex gap-2">
          <input
            type="checkbox"
            name="isActive"
            defaultChecked={rule.isActive}
          />
          有効
        </label>

        <button
          type="submit"
          className="rounded bg-blue-600 px-4 py-2 text-white"
        >
          更新
        </button>
      </form>
    </main>
  );
}
