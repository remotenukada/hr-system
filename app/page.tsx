// ① ファイルの先頭に Link をインポート
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">
        社内管理システム
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* ② 社員管理カードを Link に変更 */}
        <Link
          href="/employees"
          className="rounded-xl bg-white p-6 shadow block hover:bg-gray-50 transition-colors"
        >
          <h2 className="text-xl font-semibold text-gray-900">
            社員管理
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            社員の登録、編集、検索を行います。
          </p>
        </Link>

        {/* ③ 部署管理カードを Link に変更 */}
        <Link
          href="/departments"
          className="rounded-xl bg-white p-6 shadow block hover:bg-gray-50 transition-colors"
        >
          <h2 className="text-xl font-semibold text-gray-900">
            部署管理
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            部署や組織構成を管理します。
          </p>
        </Link>
      </div>
    </main>
  );
}