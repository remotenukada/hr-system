export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-3xl font-bold text-gray-900">
          HR管理システム
        </h1>

        <p className="mt-4 text-gray-600">
          社員情報、部署、申請ワークフローを管理するためのシステムです。
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-xl bg-white p-6 shadow">
            <h2 className="text-xl font-semibold">社員管理</h2>
            <p className="mt-2 text-sm text-gray-600">
              社員の登録、編集、検索を行います。
            </p>
          </div>

          <div className="rounded-xl bg-white p-6 shadow">
            <h2 className="text-xl font-semibold">部署管理</h2>
            <p className="mt-2 text-sm text-gray-600">
              部署や組織構成を管理します。
            </p>
          </div>

          <div className="rounded-xl bg-white p-6 shadow">
            <h2 className="text-xl font-semibold">申請管理</h2>
            <p className="mt-2 text-sm text-gray-600">
              入社申請、変更申請、承認フローを管理します。
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}