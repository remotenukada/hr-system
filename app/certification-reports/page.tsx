import Link from "next/link";
import { prisma } from "../../lib/prisma";

export const dynamic = "force-dynamic";

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

        <p className="mt-1 text-sm text-gray-500">
          資格ごとの保有者数を確認できます。
        </p>
      </div>

      {certifications.length === 0 ? (
        <p className="text-sm text-gray-500">
          資格マスタが登録されていません。
        </p>
      ) : (
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
                  <Link
                    href={`/certifications/${certification.id}/employees`}
                    className="text-blue-600 hover:underline"
                  >
                    {certification.name}
                  </Link>
                </td>

                <td className="border p-2 text-center">
                  {certification._count.employeeCertifications}名
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}
