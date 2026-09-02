import BackLink from "@/components/BackLink";
import { requireHRManager } from "@/lib/auth-guard";

type Props = {
  searchParams: Promise<{
    success?: string;
    skipped?: string;
    failed?: string;
  }>;
};

export default async function EmployeeTransferImportPage({
  searchParams,
}: Props) {
  await requireHRManager();

  const params = await searchParams;

  const success = Number(params.success ?? 0);
  const skipped = Number(params.skipped ?? 0);
  const failed = Number(params.failed ?? 0);

  const hasResult =
    params.success !== undefined ||
    params.skipped !== undefined ||
    params.failed !== undefined;

  return (
    <main className="mx-auto max-w-3xl p-8">
      <BackLink href="/employee-transfers" label="人事異動履歴一覧へ戻る" />

      <div className="mt-4 rounded-lg border bg-white p-6 shadow-sm">
        <h1 className="text-3xl font-bold text-gray-900">
          人事異動CSVインポート
        </h1>

        <p className="mt-2 text-sm text-gray-600">
          CSVファイルから職員の所属施設・部署を一括変更します。
        </p>

        {hasResult && (
          <div className="mt-6 rounded-lg border border-blue-200 bg-blue-50 p-4">
            <h2 className="font-semibold text-blue-900">インポート結果</h2>

            <dl className="mt-3 grid grid-cols-1 gap-3 text-sm sm:grid-cols-3">
              <div className="rounded bg-white p-3">
                <dt className="text-gray-500">異動完了</dt>
                <dd className="mt-1 text-xl font-bold text-green-700">
                  {success}件
                </dd>
              </div>

              <div className="rounded bg-white p-3">
                <dt className="text-gray-500">変更なし</dt>
                <dd className="mt-1 text-xl font-bold text-gray-700">
                  {skipped}件
                </dd>
              </div>

              <div className="rounded bg-white p-3">
                <dt className="text-gray-500">取込失敗</dt>
                <dd className="mt-1 text-xl font-bold text-red-700">
                  {failed}件
                </dd>
              </div>
            </dl>

            {failed > 0 && (
              <p className="mt-3 text-sm text-red-700">
                取込失敗行の詳細はサーバーログで確認してください。
              </p>
            )}
          </div>
        )}

        <form
          action="/api/employee-transfers/import"
          method="POST"
          encType="multipart/form-data"
          className="mt-6 space-y-6"
        >
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              CSVファイル
            </label>

            <input
              type="file"
              name="file"
              accept=".csv,text/csv"
              required
              className="block w-full rounded border p-2 text-sm text-gray-600 file:mr-4 file:rounded file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>

          <div className="rounded-lg bg-gray-50 p-4">
            <h2 className="font-semibold text-gray-800">CSV形式</h2>

            <p className="mt-2 text-sm text-gray-600">
              先頭行には、次の列名を指定してください。
            </p>

            <pre className="mt-3 overflow-x-auto rounded bg-white p-3 text-xs text-gray-700">
              employeeNo,toFacilityCode,toDepartmentName,effectiveDate,reason
              EMP001,HOSPITAL,看護部,2026-10-01,定期異動
              EMP002,ROKEN,介護課,2026-10-01,配置転換
            </pre>

            <ul className="mt-3 space-y-1 text-xs text-gray-600">
              <li>・社員番号と異動先施設コードは必須です。</li>
              <li>・部署名を空欄にすると未所属になります。</li>
              <li>・異動日は YYYY-MM-DD 形式です。</li>
              <li>・異動日を空欄にすると実行日になります。</li>
              <li>・文字コードはUTF-8を使用してください。</li>
            </ul>
          </div>

          <button
            type="submit"
            className="rounded bg-blue-600 px-5 py-2 font-medium text-white hover:bg-blue-700"
          >
            一括異動を実行
          </button>
        </form>
      </div>
    </main>
  );
}
