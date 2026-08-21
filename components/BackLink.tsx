import Link from "next/link";

type Props = {
  href: string;
  label: string;
};

export default function BackLink({
  href,
  label,
}: Props) {
  return (
    <div className="mb-4">
      <Link
        href={href}
        className="inline-block text-sm text-blue-600 hover:underline"
      >
        ← {label}
      </Link>
    </div>
  );
}
