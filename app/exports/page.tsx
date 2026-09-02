import BackLink from "@/components/BackLink";

export default function ExportsPage() {
  return (
    <main className="p-8">
      <BackLink href="/" label="ダッシュボードに戻る" />

      <div className="mb-8">
        <h1 className="text-3xl font-bold">帳票・出力</h1>
        <p className="mt-2 text-gray-500">
          人事・勤怠関連の帳票を出力します。
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <a
          href="/api/employees/export"
          className="rounded-lg border bg-white p-5 shadow-sm hover:bg-gray-50 transition"
        >
          <div className="font-semibold">職員一覧 CSV</div>
          <div className="mt-1 text-sm text-gray-500">
            職員台帳をCSV出力
          </div>
        </a>

        <a
          href="/api/employees/export-excel"
          className="rounded-lg border bg-white p-5 shadow-sm hover:bg-gray-50 transition"
        >
          <div className="font-semibold">職員一覧 Excel</div>
          <div className="mt-1 text-sm text-gray-500">
            職員台帳をExcel出力
          </div>
        </a>

        <a
          href="/api/requests/export-excel"
          className="rounded-lg border bg-white p-5 shadow-sm hover:bg-gray-50 transition"
        >
          <div className="font-semibold">申請一覧 Excel</div>
          <div className="mt-1 text-sm text-gray-500">
            申請データをExcel出力
          </div>
        </a>

        <a
          href="/api/leave-reports/export-excel"
          className="rounded-lg border bg-white p-5 shadow-sm hover:bg-gray-50 transition"
        >
          <div className="font-semibold">年休残高 Excel</div>
          <div className="mt-1 text-sm text-gray-500">
            休暇利用状況をExcel出力
          </div>
        </a>

        <a
          href="/api/leave-compliance/export-excel"
          className="rounded-lg border bg-white p-5 shadow-sm hover:bg-gray-50 transition"
        >
          <div className="font-semibold">有休取得状況</div>
          <div className="mt-1 text-sm text-gray-500">
            有休コンプライアンス帳票
          </div>
        </a>
      </div>
    </main>
  );
}
