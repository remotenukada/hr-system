import Link from "next/link";
import { prisma } from "../../lib/prisma";
import { Prisma } from "../../generated/prisma";

type Props = {
  searchParams: Promise<{
    q?: string;
    status?: string;
  }>;
};

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

export default async function RequestsPage({ searchParams }: Props) {
  const { q, status } = await searchParams;

  // 日本語の検索ワードからEnumのキーワードを推測して検索条件を生成
  const getSearchConditions = (query: string): Prisma.EmployeeRequestWhereInput[] => {
    const conditions: Prisma.EmployeeRequestWhereInput[] = [
      { title: { contains: query, mode: "insensitive" } },
      {
        employee: {
          OR: [
            { lastName: { contains: query, mode: "insensitive" } },
            { firstName: { contains: query, mode: "insensitive" } },
          ],
        },
      },
    ];

    if ("入社申請".includes(query) || "入社".includes(query)) {
      conditions.push({ type: "ONBOARDING" });
    }
    if ("部署変更申請".includes(query) || "部署".includes(query) || "組織変更".includes(query)) {
      conditions.push({ type: "DEPARTMENT_CHANGE" });
    }
    if ("その他".includes(query)) {
      conditions.push({ type: "OTHER" });
    }

    if ("未対応".includes(query) || "保留".includes(query)) {
      conditions.push({ status: "PENDING" });
    }
    if ("承認済み".includes(query) || "承認".includes(query)) {
      conditions.push({ status: "APPROVED" });
    }
    if ("却下".includes(query)) {
      conditions.push({ status: "REJECTED" });
    }

    return conditions;
  };

  // URLから渡ってきたstatus文字列が有効なEnum値かどうかチェック
  const isValidStatus = status && ["PENDING", "APPROVED", "REJECTED"].includes(status);

  // 複合検索条件の組み立て（anyを排除）
  const requests = await prisma.employeeRequest.findMany({
    where: {
      ...(q ? { OR: getSearchConditions(q) } : {}),
      ...(isValidStatus ? { status: status as "PENDING" | "APPROVED" | "REJECTED" } : {}),
    },
    include: {
      employee: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  // フィルターボタンのアクティブ状態を判定するヘルパー
  const getFilterClass = (isActive: boolean) => {
    return isActive
      ? "bg-gray-800 text-white font-medium text-xs px-3 py-1.5 rounded-full shadow-sm border border-transparent transition-colors"
      : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 text-xs px-3 py-1.5 rounded-full transition-colors";
  };

  // 検索キーワードをURLに維持するためのヘルパークエリ
  const queryParam = q ? `&q=${encodeURIComponent(q)}` : "";

  return (
    <main className="p-8 max-w-5xl mx-auto">
      {/* ヘッダーエリア */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">申請一覧</h1>
          <p className="text-sm text-gray-500 mt-1">社員の入社や組織変更の申請を管理・検索します。</p>
        </div>

        <Link
          href="/requests/new"
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg transition-colors shadow-sm text-sm"
        >
          新規申請
        </Link>
      </div>

      {/* 検索フォーム */}
      <form className="mb-4 flex gap-2">
        <input
          name="q"
          defaultValue={q || ""}
          placeholder="タイトル、社員名、種別、ステータスで検索..."
          className="border border-gray-300 px-4 py-2 rounded-lg w-96 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
        />
        {/* ステータスフィルターがある場合は隠しフィールドで引き継ぐ */}
        {status && <input type="hidden" name="status" value={status} />}
        
        <button
          type="submit"
          className="bg-gray-800 hover:bg-gray-900 text-white font-medium px-4 py-2 rounded-lg transition-colors text-sm shadow-sm"
        >
          検索
        </button>
        {q && (
          <Link
            href={status ? `/requests?status=${status}` : "/requests"}
            className="border border-gray-300 bg-white hover:bg-gray-50 text-gray-600 px-4 py-2 rounded-lg transition-colors text-sm flex items-center shadow-sm"
          >
            クリア
          </Link>
        )}
      </form>

      {/* ステータスフィルターボタン (トグル形式) */}
      <div className="flex gap-2 mb-6 items-center">
        <span className="text-xs text-gray-400 font-medium mr-1">ステータス:</span>
        <Link href={q ? `/requests?q=${encodeURIComponent(q)}` : "/requests"} className={getFilterClass(!status)}>
          すべて
        </Link>
        <Link href={`/requests?status=PENDING${queryParam}`} className={getFilterClass(status === "PENDING")}>
          未対応
        </Link>
        <Link href={`/requests?status=APPROVED${queryParam}`} className={getFilterClass(status === "APPROVED")}>
          承認済み
        </Link>
        <Link href={`/requests?status=REJECTED${queryParam}`} className={getFilterClass(status === "REJECTED")}>
          却下
        </Link>
      </div>

      {/* 件数表示 */}
      <p className="mb-4 text-sm text-gray-600 font-medium">
        {q || status ? `検索結果: ${requests.length} 件` : `全 ${requests.length} 件`}
      </p>

      {/* テーブルデザイン */}
      <div className="bg-white border rounded-xl overflow-hidden shadow-sm">
        {requests.length === 0 ? (
          <div className="text-center py-12 text-gray-500 text-sm">
            該当する申請データが見つかりませんでした。
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
                      {/* タイトル */}
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
