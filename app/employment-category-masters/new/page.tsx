import { createEmploymentCategoryMaster } from "@/app/actions/employment-category-master";

export default function NewEmploymentCategoryMasterPage() {
  return (
    <main className="mx-auto max-w-2xl p-6">
      <h1 className="mb-6 text-2xl font-bold">
        雇用形態マスタ登録
      </h1>

      <form
        action={createEmploymentCategoryMaster}
        className="space-y-4"
      >
        <div>
          <label className="mb-1 block text-sm font-medium">
            雇用形態名
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
