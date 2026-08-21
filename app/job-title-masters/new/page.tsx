import BackLink from "@/components/BackLink";
import { createJobTitleMaster } from "@/app/actions/job-title-master";

export default function NewJobTitleMasterPage() {
  return (
    <main className="mx-auto max-w-2xl p-6">
      <BackLink href="/job-title-masters" label="職種マスタ一覧へ戻る" />
      <h1 className="mb-6 text-2xl font-bold">
        職種マスタ登録
      </h1>

      <form
        action={createJobTitleMaster}
        className="space-y-4"
      >
        <div>
          <label className="block text-sm font-medium">
            職種名
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
