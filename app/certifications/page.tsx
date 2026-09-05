import BackLink from "@/components/BackLink";
import Link from "next/link";
import { prisma } from "../../lib/prisma";

export default async function CertificationsPage() {
  const certifications = await prisma.certification.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return (
    <main className="p-8">
      <BackLink href="/" label="ダッシュボードへ戻る" />
      <div className="mb-6 flex items-center justify-between max-w-xl">
        <h1 className="text-3xl font-bold">資格一覧</h1>

        <Link
          href="/certifications/new"
          className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          新規登録
        </Link>
      </div>

      <table className="w-full max-w-xl border-collapse border">
        <thead>
          <tr className="bg-gray-50">
            <th className="border p-2 text-left">資格名</th>
            <th className="border p-2 text-left">期限管理</th>
          </tr>
        </thead>

        <tbody>
          {certifications.map((certification) => (
            <tr key={certification.id}>
              <td className="border p-2">{certification.name}</td>
              <td className="border p-2">
                {certification.expiryManaged ? "あり" : "なし"}
              </td>
            </tr>
          ))}
          {certifications.length === 0 && (
            <tr>
              <td className="border p-4 text-center text-gray-500">
                登録されている資格はありません。
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </main>
  );
}
