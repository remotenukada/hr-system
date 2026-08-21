import Link from "next/link";

type Props = {
  title: string;
  backHref?: string;
  backLabel?: string;
};

export default function PageHeader({
  title,
  backHref = "/",
  backLabel = "ダッシュボードへ戻る",
}: Props) {
  return (
    <div className="mb-6">
      <Link
        href={backHref}
        className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-500"
      >
        ← {backLabel}
      </Link>
      <h1 className="mt-3 text-2xl font-bold text-gray-900">
        {title}
      </h1>
    </div>
  );
}
