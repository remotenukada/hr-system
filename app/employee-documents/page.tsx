import DeleteDocumentButton from "@/components/DeleteDocumentButton";
import Link from "next/link";
import { cookies } from "next/headers";

import BackLink from "@/components/BackLink";
import { requireHRManager } from "@/lib/auth-guard";
import { prisma } from "@/lib/prisma";

function getDocumentTypeInfo(type: string) {
  const types: Record<
    string,
    { label: string; className: string }
  > = {
    PAYSLIP: {
      label: "給与明細",
      className:
        "border-blue-200 bg-blue-50 text-blue-700",
    },
    WITHHOLDING: {
      label: "源泉徴収票",
      className:
        "border-green-200 bg-green-50 text-green-700",
    },
    INSURANCE: {
      label: "社会保険通知",
      className:
        "border-orange-200 bg-orange-50 text-orange-700",
    },
  };

  return (
    types[type] ?? {
      label: type,
      className:
        "border-gray-200 bg-gray-50 text-gray-700",
    }
  );
}

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
          id: true,
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

  const unreadSummary = {
    PAYSLIP: documents.filter(
      (d) =>
        d.documentType === "PAYSLIP" &&
        d.viewCount === 0,
    ).length,

    WITHHOLDING: documents.filter(
      (d) =>
        d.documentType === "WITHHOLDING" &&
        d.viewCount === 0,
    ).length,

    INSURANCE: documents.filter(
      (d) =>
        d.documentType === "INSURANCE" &&
        d.viewCount === 0,
    ).length,
  };

  const unreadEmployees = {
    PAYSLIP: documents.filter(
      (d) =>
        d.documentType === "PAYSLIP" &&
        d.viewCount === 0,
    ),
    WITHHOLDING: documents.filter(
      (d) =>
        d.documentType === "WITHHOLDING" &&
        d.viewCount === 0,
    ),
    INSURANCE: documents.filter(
      (d) =>
        d.documentType === "INSURANCE" &&
        d.viewCount === 0,
    ),
  };

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

        <div className="flex gap-2">
          <Link
            href="/employee-documents/upload"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            一括アップロード
          </Link>
          <Link
            href="/employee-documents/new"
            className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700"
          >
            個別登録
          </Link>
        </div>
      </div>

      <div className="mb-6 grid gap-4 md:grid-cols-3">
        <div className="rounded border border-blue-200 bg-blue-50 p-4">
          <div className="text-sm text-blue-700">
            給与明細 未閲覧
          </div>
          <div className="mt-2 text-3xl font-bold text-blue-800">
            {unreadSummary.PAYSLIP}
          </div>
        </div>

        <div className="rounded border border-green-200 bg-green-50 p-4">
          <div className="text-sm text-green-700">
            源泉徴収票 未閲覧
          </div>
          <div className="mt-2 text-3xl font-bold text-green-800">
            {unreadSummary.WITHHOLDING}
          </div>
        </div>

        <div className="rounded border border-orange-200 bg-orange-50 p-4">
          <div className="text-sm text-orange-700">
            社会保険通知 未閲覧
          </div>
          <div className="mt-2 text-3xl font-bold text-orange-800">
            {unreadSummary.INSURANCE}
          </div>
        </div>
      </div>

      <div className="mb-6 grid gap-4 lg:grid-cols-3">
        {[
          {
            title: "給与明細",
            items: unreadEmployees.PAYSLIP,
          },
          {
            title: "源泉徴収票",
            items: unreadEmployees.WITHHOLDING,
          },
          {
            title: "社会保険通知",
            items: unreadEmployees.INSURANCE,
          },
        ].map((group) => (
          <div
            key={group.title}
            className="rounded border bg-white p-4"
          >
            <h3 className="mb-3 font-semibold">
              {group.title} 未閲覧者
            </h3>

            {group.items.length === 0 ? (
              <div className="text-sm text-green-600">
                全員閲覧済み
              </div>
            ) : (
              <div className="space-y-1 text-sm text-gray-700">
                {group.items.map((item) => (
                  <div key={item.id}>
                    {item.employee.employeeNo}{" "}
                    {item.employee.lastName}{" "}
                    {item.employee.firstName}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="overflow-x-auto rounded border bg-white">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3 text-left">対象者</th>
              <th className="p-3 text-left">文書区分</th>
              <th className="p-3 text-left">タイトル</th>
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
              const typeInfo = getDocumentTypeInfo(
                document.documentType,
              );

              return (
                <tr key={document.id} className="border-t">
                  <td className="p-3">
                    {document.employee.employeeNo}
                    <div className="text-xs text-gray-500">
                      {document.employee.lastName}{" "}
                      {document.employee.firstName}
                    </div>
                  </td>

                  <td className="p-3">
                    <span
                      className={`inline-block rounded border px-2 py-1 text-xs font-medium ${typeInfo.className}`}
                    >
                      {typeInfo.label}
                    </span>
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
                  
                    <DeleteDocumentButton id={document.id} /></td>
                </tr>
              );
            })}

            {documents.length === 0 && (
              <tr>
                <td colSpan={8} className="p-8 text-center text-gray-500">
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
