import BackLink from "@/components/BackLink";
import { createPositionMaster } from "@/app/actions/position-master";

export default function NewPositionMasterPage() {
  return (
    <main className="mx-auto max-w-2xl p-6">
      <BackLink href="/position-masters" label="役職マスタ一覧へ戻る" />
      <h1 className="mb-6 text-2xl font-bold">
        役職マスタ登録
      </h1>

      <form
        action={createPositionMaster}
        className="space-y-4"
      >
        <div>
          <label className="block text-sm font-medium">
            役職名
          </label>

          <input
            name="name"
            required
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
