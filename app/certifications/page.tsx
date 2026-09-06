import BackLink from "@/components/BackLink";
import Link from "next/link";

import { requireHRManager } from "@/lib/auth-guard";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function CertificationsPage() {
  await requireHRManager();

  const certifications = await prisma.certification.findMany({
    include: {
      documentRules: {
        orderBy: {
          sortOrder: "asc",
        },
      },
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
      /

      <div className="mb-6 flex max-w-5xl items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">資格マスタ</h1>
          <p className="mt-1 text-sm text-gray-500">
            資格ごとの期限管理と必要書類を設定します。
          </p>
        </div>

        <Link
          href="/certifications/new"
          className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          新規登録
        </Link>
      </div>

      <div className="max-w-5xl overflow-x-auto rounded-lg border bg-white">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-gray-50">
              <th className="border-b p-3 text-left">資格名</th>
              <th className="border-b p-3 text-left">期限管理</th>
              <th className="border-b p-3 text-left">必要書類</th>
              <th className="border-b p-3 text-right">保有者数</th>
              <th className="border-b p-3 text-center">操作</th>
            </tr>
          </thead>

          <tbody>
            {certifications.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="p-6 text-center text-gray-500"
                >
                  登録されている資格はありません。
                </td>
              </tr>
            ) : (
              certifications.map((certification) => (
                <tr key={certification.id} className="hover:bg-gray-50">
                  <td className="border-b p-3 font-medium">
                    {certification.name}
                  </td>

                  <td className="border-b p-3">
                    {certification.expiryManaged ? (
                      <span className="rounded bg-amber-100 px-2 py-1 text-xs text-amber-800">
                        あり
                      </span>
                    ) : (
                      <span className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-700">
                        なし
                      </span>
                    )}
                  </td>

                  <td className="border-b p-3">
                    {certification.documentRules.length === 0 ? (
                      <span className="text-gray-400">設定なし</span>
                    ) : (
                      <ul className="space-y-1">
                        {certification.documentRules.map((rule) => (
                          <li key={rule.id}>
                            {rule.sortOrder}. {rule.documentName}
                            <span className="ml-2 text-xs text-gray-500">
                              {rule.required ? "必須" : "任意"}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </td>

                  <td className="border-b p-3 text-right">
                    {certification._count.employeeCertifications}
                  </td>

                  <td className="border-b p-3 text-center">
                    <Link
                      href={`/certifications/${certification.id}/edit`}
                      className="text-blue-600 hover:underline"
                    >
                      設定
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}
