import Link from "next/link";
import { prisma } from "../../lib/prisma";

// 申請種別の日本語ラベルとスタイルのマッピング
function getRequestTypeDetails(type: string) {
  switch (type) {
    case "ONBOARDING":
      return { label: "入社申請", badge: "bg-teal-50 text-teal-700 border-teal-100" };
    case "DEPARTMENT_CHANGE":
      return { label: "部署変更申請", badge: "bg-indigo-50 text-indigo-700 border-indigo-100" };
    case "OTHER":
      return { label: "その他", badge: "bg-gray-50 text-gray-700 border-gray-100" };
    default:
      return { label: type, badge: "bg-gray-50 text-gray-700 border-gray-100" };
  }
}

// 申請ステータスの日本語ラベルとスタイルのマッピング
function getRequestStatusDetails(status: string) {
  switch (status) {
    case "PENDING":
      return { label: "未対応", badge: "bg-amber-100 text-amber-800" };
    case "APPROVED":
      return { label: "承認済み", badge: "bg-green-100 text-green-800" };
    case "REJECTED":
      return { label: "却下", badge: "bg-rose-100 text-rose-800" };
    default:
      return { label: status, badge: "bg-gray-100 text-gray-800" };
  }
}

export default async function RequestsPage() {
  const requests = await prisma.employeeRequest.findMany({
    include: {
      employee: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="p-8 max-w-5xl mx-auto">
      {/* ヘッダーエリア */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">申請一覧</h1>
          <p className="text-sm text-gray-500 mt-1">社員の入社や組織変更の申請を管理します。</p>
        </div>

        <Link
          href="/requests/new"
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg transition-colors shadow-sm"
        >
          新規申請
        </Link>
      </div>

      {/* テーブルデザイン */}
      <div className="bg-white border rounded-xl overflow-hidden shadow-sm">
        {requests.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            まだ申請データが登録されていません。
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100 text-gray-600 text-sm font-semibold">
                  <th className="py-4 px-6">タイトル</th>
                  <th className="py-4 px-6">申請種別</th>
                  <th className="py-4 px-6">対象社員</th>
                  <th className="py-4 px-6">ステータス</th>
                  <th className="py-4 px-6 text-right">作成日</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100 text-gray-700 text-sm">
                {requests.map((request) => {
                  const typeDetails = getRequestTypeDetails(request.type);
                  const statusDetails = getRequestStatusDetails(request.status);

                  return (
                    <tr
                      key={request.id}
                      className="hover:bg-gray-50/70 transition-colors"
                    >
                      {/* タイトル（リンク化完了） */}
                      <td className="py-4 px-6 font-medium">
                        <Link 
                          href={`/requests/${request.id}`}
                          className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                        >
                          {request.title}
                        </Link>
                      </td>

                      {/* 申請種別バッジ */}
                      <td className="py-4 px-6">
                        <span className={`inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-md border ${typeDetails.badge}`}>
                          {typeDetails.label}
                        </span>
                      </td>

                      {/* 対象社員 */}
                      <td className="py-4 px-6 text-gray-600">
                        {request.employee ? (
                          <span className="font-medium text-gray-800">
                            {request.employee.lastName} {request.employee.firstName}
                          </span>
                        ) : (
                          <span className="text-gray-400">—</span>
                        )}
                      </td>

                      {/* ステータスバッジ */}
                      <td className="py-4 px-6">
                        <span className={`inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-full ${statusDetails.badge}`}>
                          {statusDetails.label}
                        </span>
                      </td>

                      {/* 作成日 */}
                      <td className="py-4 px-6 text-right font-mono text-gray-400 text-xs">
                        {request.createdAt.toLocaleDateString("ja-JP")}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* トップへの戻りリンク */}
      <div className="mt-6">
        <Link href="/" className="text-sm text-blue-600 hover:underline">
          ← ダッシュボードに戻る
        </Link>
      </div>
    </main>
  );
}
