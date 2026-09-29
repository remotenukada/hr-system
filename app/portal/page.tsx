import Link from "next/link";

export default function PortalPage() {
  return (
    <main className="mx-auto max-w-5xl p-8">
      <h1 className="text-3xl font-bold text-gray-800">マイポータル</h1>

      <p className="mt-2 text-gray-600">
        現在登録されている情報を確認します。
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <Link
          href="/portal/residence"
          className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm transition hover:bg-gray-50 hover:shadow-md"
        >
          <h2 className="text-lg font-semibold text-gray-800">住居情報</h2>
          <p className="mt-1 text-sm text-gray-500">現在の住居情報および住居届の確認</p>
        </Link>

        <Link
          href="/portal/commuting"
          className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm transition hover:bg-gray-50 hover:shadow-md"
        >
          <h2 className="text-lg font-semibold text-gray-800">通勤情報</h2>
          <p className="mt-1 text-sm text-gray-500">現在の通勤経路および通勤届の確認</p>
        </Link>

        <Link
          href="/portal/dependents"
          className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm transition hover:bg-gray-50 hover:shadow-md"
        >
          <h2 className="text-lg font-semibold text-gray-800">家族の扶養情報</h2>
          <p className="mt-1 text-sm text-gray-500">扶養家族の登録状況および申請確認</p>
        </Link>
      </div>
    </main>
  );
}
