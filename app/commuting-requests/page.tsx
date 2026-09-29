import Link from "next/link";
import BackLink from "@/components/BackLink";
import { prisma } from "@/lib/prisma";
import { requireHRManager } from "@/lib/auth-guard";

const notificationLabels = {
  NEW: "新規",
  ROUTE_CHANGE: "経路変更",
  METHOD_CHANGE: "通勤手段変更",
  AMOUNT_CHANGE: "運賃・手当変更",
};

const commutingLabels = {
  PUBLIC_TRANSPORT: "公共交通機関",
  CAR: "自家用車",
  MOTORCYCLE: "バイク",
  BICYCLE: "自転車",
  WALK: "徒歩",
  OTHER: "その他",
};

const statusLabels = {
  PENDING: "申請中",
  APPROVED: "承認済",
  REJECTED: "差戻",
  CANCELLED: "取消",
};

export default async function CommutingRequestsPage() {
  await requireHRManager();

  const requests = await prisma.commutingRequest.findMany({
    include: {
      employee: {
        include: {
          facility: true,
          department: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="mx-auto max-w-7xl p-8">
      <div className="mb-4">
        <BackLink href="/" label="管理者メニューへ戻る" />
      </div>

      <h1 className="mb-6 text-3xl font-bold">通勤届確認</h1>

      <div className="overflow-hidden rounded border bg-white shadow-sm">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3 text-left font-medium text-gray-700">職員番号</th>
              <th className="p-3 text-left font-medium text-gray-700">氏名</th>
              <th className="p-3 text-left font-medium text-gray-700">施設</th>
              <th className="p-3 text-left font-medium text-gray-700">申請区分</th>
              <th className="p-3 text-left font-medium text-gray-700">通勤手段</th>
              <th className="p-3 text-left font-medium text-gray-700">状態</th>
              <th className="p-3 text-left font-medium text-gray-700">申請日</th>
              <th className="p-3 text-center font-medium text-gray-700">操作</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {requests.length === 0 ? (
              <tr>
                <td colSpan={8} className="p-6 text-center text-gray-500">
                  申請されている通勤届はありません。
                </td>
              </tr>
            ) : (
              requests.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="p-3 font-mono">{item.employee.employeeNo}</td>

                  <td className="p-3 font-medium text-gray-900">
                    {item.employee.lastName} {item.employee.firstName}
                  </td>

                  <td className="p-3 text-gray-600">
                    {item.employee.facility?.name ?? "-"}
                  </td>

                  <td className="p-3 text-gray-600">{notificationLabels[item.notificationType] ?? item.notificationType}</td>

                  <td className="p-3 text-gray-600">{commutingLabels[item.commutingType] ?? item.commutingType}</td>

                  <td className="p-3">
                    <span
                      className={`inline-block rounded px-2 py-0.5 text-xs font-semibold ${
                        item.status === "APPROVED"
                          ? "bg-green-100 text-green-800"
                          : item.status === "REJECTED"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {statusLabels[item.status] ?? item.status}
                    </span>
                  </td>

                  <td className="p-3 text-gray-600">
                    {item.createdAt.toLocaleDateString("ja-JP")}
                  </td>

                  <td className="p-3 text-center">
                    <Link
                      href={`/commuting-requests/${item.id}`}
                      className="rounded bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600 hover:bg-blue-100"
                    >
                      詳細
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
