import Link from "next/link";
import { prisma } from "../../lib/prisma";

export default async function CertificationReportsPage() {
  const certifications = await prisma.certification.findMany({
    include: {
      _count: {
        select: {
          employeeCertifications: true,
        },
      },
    },
    orderBy: {
      name: "asc",
    },
  });

  return (
    <main className="p-8">
      <div className="mb-6">
        <Link
          href="/"
          className="text-sm text-blue-600 hover:underline"
        >
          ← ダッシュボードへ戻る
        </Link>

        <h1 className="mt-2 text-3xl font-bold">
          資格保有レポート
        </h1>
      </div>

      <table className="w-full max-w-2xl border-collapse border">
        <thead>
          <tr className="bg-gray-50">
            <th className="border p-2 text-left">
              資格名
            </th>
            <th className="border p-2 text-center">
              保有者数
            </th>
          </tr>
        </thead>

        <tbody>
          {certifications.map((certification) => (
            <tr key={certification.id}>
              <td className="border p-2">
                {certification.name}
              </td>
              <td className="border p-2 text-center">
                {certification._count.employeeCertifications}名
              </td>
            </tr>
          ))}

          {certifications.length === 0 && (
            <tr>
              <td colSpan={2} className="border p-4 text-center text-gray-500">
                登録されている資格データはありません。
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </main>
  );
}
