import BackLink from "@/components/BackLink";
import Link from "next/link";

export default function EmployeeImportPage() {
  return (
    <main className="mx-auto max-w-2xl p-8">
      <BackLink href="/" label="ダッシュボードへ戻る" />
      <div className="rounded-lg border bg-white p-6 shadow-sm">
        <div className="mb-6">

          <h1 className="mt-3 text-2xl font-bold text-gray-900">
            社員CSVインポート
          </h1>

          <p className="mt-2 text-sm text-gray-600">
            CSVファイルから社員情報を一括登録します。
          </p>
        </div>

        <form
          action="/api/employees/import"
          method="post"
          className="space-y-6"
        >
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              CSVファイル
            </label>

            <input
              type="file"
              name="file"
              accept=".csv"
              required
              className="block w-full rounded border p-2 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
            />
          </div>

          <div className="rounded bg-gray-50 p-4 text-sm text-gray-600">
            <p className="font-medium text-gray-700">
              CSV形式例
            </p>
            <pre className="mt-2 overflow-x-auto text-xs">
employeeNo,lastName,firstName,email
EMP-100,山田,太郎,yamada@example.com
EMP-101,佐藤,花子,sato@example.com
            </pre>
          </div>

          <button
            type="submit"
            className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700"
          >
            インポート実行
          </button>
        </form>
      </div>
    </main>
  );
}
