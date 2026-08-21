import Link from "next/link";

export default function BackToDashboardLink() {
  return (
    <div className="mb-6">
      <Link
        href="/"
        className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-500"
      >
        ← ダッシュボードへ戻る
      </Link>
    </div>
  );
}
