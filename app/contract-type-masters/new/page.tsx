import { createContractTypeMaster } from "@/app/actions/contract-type-master";

export default function NewContractTypeMasterPage() {
  return (
    <main className="mx-auto max-w-2xl p-6">
      <h1 className="mb-6 text-2xl font-bold">
        契約区分マスタ登録
      </h1>

      <form action={createContractTypeMaster}>
        <div>
          <label className="mb-1 block text-sm font-medium">
            契約区分名
          </label>

          <input
            name="name"
            required
            className="w-full rounded border p-2"
          />
        </div>

        <button
          type="submit"
          className="mt-4 rounded bg-blue-600 px-4 py-2 text-white"
        >
          登録
        </button>
      </form>
    </main>
  );
}
