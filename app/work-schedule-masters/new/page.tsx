import BackLink from "@/components/BackLink";
import { createWorkScheduleMaster } from "@/app/actions/work-schedule-master";

export default function NewWorkScheduleMasterPage() {
  return (
    <main className="mx-auto max-w-2xl p-6">
      <BackLink href="/work-schedule-masters" label="勤務帯マスタ一覧へ戻る" />
      <h1 className="mb-6 text-2xl font-bold">
        勤務帯マスタ登録
      </h1>

      <form
        action={createWorkScheduleMaster}
        className="space-y-4 rounded border p-6"
      >
        <div>
          <label className="block text-sm font-medium">
            名称
          </label>
          <input
            name="name"
            required
            className="w-full rounded border p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">
            開始時刻
          </label>
          <input
            type="time"
            name="startTime"
            required
            className="w-full rounded border p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">
            終了時刻
          </label>
          <input
            type="time"
            name="endTime"
            required
            className="w-full rounded border p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">
            休憩時間（分）
          </label>
          <input
            type="number"
            name="breakMinutes"
            defaultValue="60"
            min="0"
            className="w-full rounded border p-2"
          />
        </div>

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
