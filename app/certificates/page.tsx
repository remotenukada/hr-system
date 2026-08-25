import Link from "next/link";

export default function CertificateCenterPage() {
  return (
    <main className="mx-auto max-w-5xl p-6">
      <h1 className="mb-6 text-3xl font-bold">
        証明書センター
      </h1>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border p-6">
          <h2 className="mb-3 text-xl font-semibold">
            在職証明書
          </h2>

          <p className="mb-4 text-sm text-gray-600">
            在職証明書の発行
          </p>

          <Link href="/employees"></Link>
        </div>

        <div className="rounded-lg border p-6">
          <h2 className="mb-3 text-xl font-semibold">
            退職証明書
          </h2>

          <p className="mb-4 text-sm text-gray-600">
            退職証明書の発行
          </p>

          <Link href="/retirement-management"></Link>
        </div>
      </div>
    </main>
  );
}
