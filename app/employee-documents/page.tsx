import Link from "next/link";
import { cookies } from "next/headers";

import BackLink from "@/components/BackLink";
import { requireHRManager } from "@/lib/auth-guard";
import { prisma } from "@/lib/prisma";

function formatDate(value: Date) {
  return new Date(value).toLocaleDateString("ja-JP");
}

export default async function EmployeeDocumentsPage() {
  await requireHRManager();

  const cookieStore = await cookies();

  const facilityScope =
    cookieStore.get("facilityScope")?.value ?? "ALL";

  const documents = await prisma.personalDocument.findMany({
    where:
      facilityScope === "ALL"
        ? {}
        : {
            employee: {
              facilityId: facilityScope,
            },
          },
    include: {
      employee: {
        select: {
          employeeNo: true,
          lastName: true,
          firstName: true,
        },
      },
    },
    orderBy: [
      { targetYear: "desc" },
      { targetMonth: "desc" },
      { createdAt: "desc" },
    ],
    take: 500,
  });

  const now = new Date();

  return (
    <main className="mx-auto max-w-7xl p-8">
      <BackLink href="/" label="ダッシュボードへ" />

      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">給与明細・個人文書管理</h1>
          <p className="mt-1 text-sm text-gray-600">
            職員への配信状況と公開日を確認します。
          </p>
        </div>

        <Link
          href="/employee-documents/upload"
          className="rounded bg-blue-600 px-4 py-2 text-white"
        >
          給与明細一括アップロード
        </Link>
      </div>

      <div className="overflow-x-auto rounded border bg-white">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3 text-left">対象者</th>
              <th className="p-3 text-left">文書</th>
              <th className="p-3 text-left">対象年月</th>
              <th className="p-3 text-left">公開日</th>
              <th className="p-3 text-left">状態</th>
              <th className="p-3 text-left">閲覧状況</th>
              <th className="p-3 text-left">操作</th>
            </tr>
          </thead>

          <tbody>
            {documents.map((document) => {
              const published = document.publishAt <= now;

              return (
                <tr key={document.id} className="border-t">
                  <td className="p-3">
                    {document.employee.employeeNo}
                    <div className="text-xs text-gray-500">
                      {document.employee.lastName}{" "}
                      {document.employee.firstName}
                    </div>
                  </td>

                  <td className="p-3">{document.title}</td>

                  <td className="p-3">
                    {document.targetYear ?? "-"}年
                    {document.targetMonth ?? "-"}月
                  </td>

                  <td className="p-3">
                    {formatDate(document.publishAt)}
                  </td>

                  <td className="p-3">
                    {published ? "公開済み" : "公開予約"}
                  </td>
                  <td className="p-3 text-xs">
                    {document.viewCount === 0 ? (
                      <span className="text-red-600">
                        未閲覧
                      </span>
                    ) : (
                      <div>
                        <div>
                          初回:{" "}
                          {document.firstViewedAt?.toLocaleString("ja-JP")}
                        </div>
                        <div>
                          最終:{" "}
                          {document.lastViewedAt?.toLocaleString("ja-JP")}
                        </div>
                        <div>
                          閲覧回数: {document.viewCount}回
                        </div>
                      </div>
                    )}
                  </td>

                  <td className="p-3">
                    <a
                      href={`/api/personal-documents/${document.id}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 underline"
                    >
                      PDF確認
                    </a>
                  </td>
                </tr>
              );
            })}

            {documents.length === 0 && (
              <tr>
                <td colSpan={7} className="p-8 text-center text-gray-500">
                  個人文書は登録されていません。
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}
