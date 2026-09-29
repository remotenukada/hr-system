import Link from "next/link";
import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

const commutingLabels: Record<string, string> = {
  PUBLIC_TRANSPORT: "公共交通機関",
  CAR: "自家用車",
  MOTORCYCLE: "バイク",
  BICYCLE: "自転車",
  WALK: "徒歩",
  OTHER: "その他",
};

function formatDate(value: Date | null | undefined) {
  return value
    ? new Date(value).toLocaleDateString("ja-JP")
    : "-";
}

function formatMoney(value: number | null | undefined) {
  return value != null
    ? `${value.toLocaleString("ja-JP")}円`
    : "-";
}

export default async function CurrentCommutingPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const employee = await prisma.employee.findUnique({
    where: { userId: session.user.id },
  });

  if (!employee) {
    redirect("/");
  }

  const commuting = await prisma.commutingRequest.findFirst({
    where: {
      employeeId: employee.id,
      status: "APPROVED",
    },
    include: {
      routeSegments: {
        orderBy: { sortOrder: "asc" },
      },
    },
    orderBy: [
      { effectiveDate: "desc" },
      { updatedAt: "desc" },
    ],
  });

  return (
    <main className="mx-auto max-w-5xl p-8">
      <div className="flex flex-col justify-between gap-4 md:flex-row">
        <div>
          <h1 className="text-3xl font-bold">
            現在の通勤情報
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            最新の承認済み通勤届を表示しています。
          </p>
        </div>

        <Link
          href="/mypage/commuting-requests"
          className="rounded border bg-white px-4 py-2 text-sm"
        >
          ダッシュボードへ戻る
        </Link>
      </div>

      {!commuting ? (
        <section className="mt-6 rounded-lg border bg-white p-8 text-center">
          <p className="text-gray-600">
            承認済みの通勤情報はありません。
          </p>
        </section>
      ) : (
        <>
          <section className="mt-6 rounded-lg border bg-gray-50 p-6">
            <h2 className="mb-4 border-b pb-2 text-lg font-semibold">
              登録内容
            </h2>

            <dl className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="rounded border bg-white p-4">
                <dt className="text-sm text-gray-500">通勤手段</dt>
                <dd className="mt-1">
                  {commutingLabels[commuting.commutingType] ??
                    commuting.commutingType}
                </dd>
              </div>

              <div className="rounded border bg-white p-4">
                <dt className="text-sm text-gray-500">適用開始日</dt>
                <dd className="mt-1">
                  {formatDate(commuting.effectiveDate)}
                </dd>
              </div>

              <div className="rounded border bg-white p-4">
                <dt className="text-sm text-gray-500">通勤区間</dt>
                <dd className="mt-1">
                  {commuting.routeFrom ?? "-"} ～{" "}
                  {commuting.routeTo ?? "-"}
                </dd>
              </div>

              <div className="rounded border bg-white p-4">
                <dt className="text-sm text-gray-500">支給額</dt>
                <dd className="mt-1">
                  {formatMoney(
                    commuting.approvedAmount ??
                      commuting.monthlyAmount,
                  )}
                </dd>
              </div>

              <div className="rounded border bg-white p-4">
                <dt className="text-sm text-gray-500">片道距離</dt>
                <dd className="mt-1">
                  {commuting.oneWayDistanceKm != null
                    ? `${commuting.oneWayDistanceKm} km`
                    : "-"}
                </dd>
              </div>

              <div className="rounded border bg-white p-4">
                <dt className="text-sm text-gray-500">最終更新日</dt>
                <dd className="mt-1">
                  {formatDate(commuting.updatedAt)}
                </dd>
              </div>
            </dl>
          </section>

          {commuting.routeSegments.length > 0 && (
            <section className="mt-6 rounded-lg border bg-white p-6">
              <h2 className="mb-4 border-b pb-2 text-lg font-semibold">
                交通機関別明細
              </h2>

              <div className="space-y-3">
                {commuting.routeSegments.map((segment) => (
                  <div
                    key={segment.id}
                    className="rounded border p-4 text-sm"
                  >
                    <div className="font-semibold">
                      {segment.operatorName}
                      {segment.lineName
                        ? `・${segment.lineName}`
                        : ""}
                    </div>
                    <div className="mt-1 text-gray-600">
                      {segment.boardingPoint ?? "-"} ～{" "}
                      {segment.alightingPoint ?? "-"}
                    </div>
                    <div className="mt-1">
                      支給対象額：
                      {formatMoney(segment.payableAmount)}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/mypage/commuting-requests/new"
              className="rounded border bg-white px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
            >
              通勤届履歴を見る
            </Link>

            <Link
              href="/"
              className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              通勤届を申請する
            </Link>
          </div>
        </>
      )}
    </main>
  );
}
