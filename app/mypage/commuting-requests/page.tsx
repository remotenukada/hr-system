import Link from "next/link";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

async function getCurrentEmployee() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const employee = await prisma.employee.findUnique({
    where: {
      userId: session.user.id,
    },
  });

  if (!employee) {
    redirect("/mypage");
  }

  return employee;
}


const notificationLabels: Record<string, string> = {
  NEW: "新規",
  ROUTE_CHANGE: "経路変更",
  METHOD_CHANGE: "通勤手段変更",
  AMOUNT_CHANGE: "金額変更",
};

const commutingLabels: Record<string, string> = {
  PUBLIC_TRANSPORT: "公共交通機関",
  CAR: "自家用車",
  MOTORCYCLE: "バイク",
  BICYCLE: "自転車",
  WALK: "徒歩",
  OTHER: "その他",
};

const statusLabels: Record<string, string> = {
  PENDING: "申請中",
  APPROVED: "承認済",
  REJECTED: "差戻",
  CANCELLED: "取消",
};

export default async function CommutingRequestsPage() {
  const employee = await getCurrentEmployee();

  const requests = await prisma.commutingRequest.findMany({
    where: {
      employeeId: employee.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="mx-auto max-w-5xl p-8">
      <div className="mb-4">
        <Link
          href="/mypage"
          className="text-sm text-blue-600 hover:underline"
        >
          ← ダッシュボードへ戻る
        </Link>
      </div>

      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">通勤届</h1>
          <p className="mt-2 text-sm text-gray-600">
            通勤経路・通勤方法・通勤手当の申請を行います。
          </p>
        </div>

        <Link
          href="/mypage/commuting-requests/new"
          className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          新規届出
        </Link>
      </div>

      {requests.length === 0 ? (
        <div className="rounded border bg-white p-8 text-center text-gray-500">
          通勤届はありません。
        </div>
      ) : (
        <div className="overflow-hidden rounded border bg-white shadow-sm">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 text-xs font-medium text-gray-500 uppercase">
              <tr>
                <th className="px-6 py-3 text-left">申請区分</th>
                <th className="px-6 py-3 text-left">通勤手段</th>
                <th className="px-6 py-3 text-left">適用開始日</th>
                <th className="px-6 py-3 text-left">ステータス</th>
                <th className="px-6 py-3 text-left">申請日</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white text-sm">
              {requests.map((req) => (
                <tr key={req.id}>
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {notificationLabels[req.notificationType] ?? req.notificationType}
                  </td>
                  <td className="px-6 py-4 text-gray-600">{commutingLabels[req.commutingType] ?? req.commutingType}</td>
                  <td className="px-6 py-4 text-gray-600">
                    {req.effectiveDate.toLocaleDateString("ja-JP")}
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex rounded-full bg-yellow-100 px-2 py-1 text-xs font-semibold text-yellow-800">
                      {statusLabels[req.status] ?? req.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {req.createdAt.toLocaleDateString("ja-JP")}
                  </td>
                  <td className="px-6 py-4">
                    <Link
                      href={`/mypage/commuting-requests/${req.id}`}
                      className="text-blue-600 hover:underline"
                    >
                      詳細
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
