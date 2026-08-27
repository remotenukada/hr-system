import BackLink from "@/components/BackLink";
import { createLeaveTypeMaster } from "@/app/actions/leave-type-master";

export default function NewLeaveTypeMasterPage() {
  return (
    <main className="mx-auto max-w-2xl p-6">
      <BackLink href="/leave-type-masters" label="一覧へ戻る" />

      <h1 className="mb-6 text-2xl font-bold">休暇種別マスタ登録</h1>

      <form action={createLeaveTypeMaster} className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium">コード</label>
          <input
            name="code"
            required
            placeholder="例: ANNUAL"
            className="w-full rounded border p-2 uppercase"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">休暇種別名</label>
          <input
            name="name"
            required
            placeholder="例: 年次有給休暇"
            className="w-full rounded border p-2"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">説明</label>

          <textarea
            name="description"
            rows={3}
            className="w-full rounded border p-2"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">失効月数</label>

          <input
            name="expirationMonths"
            type="number"
            min="0"
            className="w-full rounded border p-2"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">表示順</label>
          <input
            name="sortOrder"
            type="number"
            defaultValue={0}
            className="w-full rounded border p-2"
          />
        </div>

        <label className="flex items-center gap-2">
          <input name="allowRequest" type="checkbox" defaultChecked={true} />
          <span className="text-sm font-medium">申請可能</span>
        </label>

        <label className="flex items-center gap-2">
          <input name="manageBalance" type="checkbox" defaultChecked={true} />
          <span className="text-sm font-medium">残高管理対象</span>
        </label>

        <label className="flex items-center gap-2">
          <input name="isPaid" type="checkbox" defaultChecked={true} />
          <span className="text-sm font-medium">有給扱い</span>
        </label>

        <button
          type="submit"
          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          登録
        </button>
      </form>
    </main>
  );
}
