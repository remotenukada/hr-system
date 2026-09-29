import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { revalidatePath } from "next/cache";

import BackLink from "@/components/BackLink";
import { requireHRManager } from "@/lib/auth-guard";
import { prisma } from "@/lib/prisma";
import { logAudit } from "@/lib/audit-log";
import { sendSystemMailSafely } from "@/lib/mail";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

const notificationTypeLabels: Record<string, string> = {
  NEW: "新規",
  ROUTE_CHANGE: "経路変更",
  METHOD_CHANGE: "通勤方法変更",
  AMOUNT_CHANGE: "手当変更",
};

const commutingTypeLabels: Record<string, string> = {
  PUBLIC_TRANSPORT: "公共交通機関",
  CAR: "自動車",
  MOTORCYCLE: "バイク",
  BICYCLE: "自転車",
  WALK: "徒歩",
  OTHER: "その他",
};

const attachmentTypeLabels: Record<string, string> = {
  COMMUTER_PASS: "定期券",
  ROUTE_MAP: "経路図",
  VEHICLE_INSPECTION: "車検証",
  VOLUNTARY_INSURANCE: "任意保険証",
  DRIVERS_LICENSE: "運転免許証",
  OTHER: "その他",
};

const statusLabels: Record<string, string> = {
  PENDING: "承認待ち",
  APPROVED: "承認済み",
  REJECTED: "差戻し",
  CANCELLED: "取消済み",
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

async function getScopedRequest(id: string) {
  const cookieStore = await cookies();
  const facilityScope =
    cookieStore.get("facilityScope")?.value ?? "ALL";

  return prisma.commutingRequest.findFirst({
    where: {
      id,
      ...(facilityScope === "ALL"
        ? {}
        : {
            employee: {
              facilityId: facilityScope,
            },
          }),
    },
    include: {
      employee: {
        include: {
          facility: true,
          department: true,
        },
      },
      attachments: {
        orderBy: {
          createdAt: "desc",
        },
      },
      routeSegments: {
        orderBy: {
          sortOrder: "asc",
        },
      },
    },
  });
}

export default async function CommutingRequestDetailPage({
  params,
}: Props) {
  await requireHRManager();

  const { id } = await params;
  const request = await getScopedRequest(id);

  if (!request) {
    notFound();
  }

  async function approveRequest(formData: FormData) {
    "use server";

    const session = await requireHRManager();
    const requestId = String(
      formData.get("requestId") ?? "",
    ).trim();

    const approvedAmountRaw = String(
      formData.get("approvedAmount") ?? "",
    ).trim();

    const approvedAmount = Number(approvedAmountRaw);

    if (
      !approvedAmountRaw ||
      !Number.isInteger(approvedAmount) ||
      approvedAmount < 0
    ) {
      return;
    }

    if (!requestId) return;

    const target = await getScopedRequest(requestId);

    if (!target || target.status !== "PENDING") return;

    const result = await prisma.$transaction(async (tx) => {
      const updated = await tx.commutingRequest.updateMany({
        where: {
          id: target.id,
          status: "PENDING",
        },
        data: {
          status: "APPROVED",
          reviewedAt: new Date(),
          reviewedBy:
            session.user.name ??
            session.user.email ??
            session.user.id,
          reviewComment: null,
          approvedAmount,
        },
      });

      if (updated.count !== 1) {
        return false;
      }

      await tx.employee.update({
        where: {
          id: target.employeeId,
        },
        data: {
          commutingType:
            commutingTypeLabels[target.commutingType] ??
            target.commutingType,
        },
      });

      return true;
    });

    if (!result) return;

    await logAudit({
      userId: session.user.id,
      userName: session.user.name,
      action: "COMMUTING_REQUEST_APPROVED",
      targetType: "CommutingRequest",
      targetId: target.id,
      description: `${target.employee.employeeNo} の通勤届を承認`,
      afterData: {
        employeeId: target.employeeId,
        status: "APPROVED",
        commutingType: target.commutingType,
        approvedAmount,
      },
    });

    await sendSystemMailSafely({
      to: target.employee.email,
      subject: "【人事システム】通勤届が承認されました",
      text: `${target.employee.lastName} ${target.employee.firstName} さん

提出された通勤届が承認されました。

適用開始日：${formatDate(target.effectiveDate)}
通勤手段：${
        commutingTypeLabels[target.commutingType] ??
        target.commutingType
      }`,
    });

    revalidatePath("/commuting-requests");
    revalidatePath(`/commuting-requests/${target.id}`);
    revalidatePath("/mypage/commuting-requests");
    revalidatePath("/");
  }

  async function rejectRequest(formData: FormData) {
    "use server";

    const session = await requireHRManager();
    const requestId = String(
      formData.get("requestId") ?? "",
    ).trim();
    const reviewComment = String(
      formData.get("reviewComment") ?? "",
    ).trim();

    if (!requestId || !reviewComment) return;

    const target = await getScopedRequest(requestId);

    if (!target || target.status !== "PENDING") return;

    const result = await prisma.commutingRequest.updateMany({
      where: {
        id: target.id,
        status: "PENDING",
      },
      data: {
        status: "REJECTED",
        reviewedAt: new Date(),
        reviewedBy:
          session.user.name ??
          session.user.email ??
          session.user.id,
        reviewComment,
      },
    });

    if (result.count !== 1) return;

    await logAudit({
      userId: session.user.id,
      userName: session.user.name,
      action: "COMMUTING_REQUEST_REJECTED",
      targetType: "CommutingRequest",
      targetId: target.id,
      description: `${target.employee.employeeNo} の通勤届を差戻し: ${reviewComment}`,
      afterData: {
        employeeId: target.employeeId,
        status: "REJECTED",
        reviewComment,
      },
    });

    await sendSystemMailSafely({
      to: target.employee.email,
      subject: "【人事システム】通勤届が差戻しされました",
      text: `${target.employee.lastName} ${target.employee.firstName} さん

提出された通勤届が差戻しされました。

差戻し理由：
${reviewComment}

内容をご確認のうえ、必要に応じて再申請してください。`,
    });

    revalidatePath("/commuting-requests");
    revalidatePath(`/commuting-requests/${target.id}`);
    revalidatePath("/mypage/commuting-requests");
    revalidatePath("/");
  }

  return (
    <main className="mx-auto max-w-5xl p-8">
      <div className="mb-4">
        <BackLink href="/commuting-requests" label="通勤届一覧へ戻る" />
      </div>

      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">通勤届詳細</h1>
          <p className="mt-2 text-sm text-gray-500">
            申請日：{formatDate(request.createdAt)}
          </p>
        </div>

        <a
          href={`/commuting-requests/${request.id}/pdf`}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          PDF出力
        </a>
      </div>

      <section className="mt-6 rounded-lg border bg-white p-6 shadow-sm">
        <h2 className="mb-4 border-b pb-2 text-lg font-semibold">
          職員情報
        </h2>

        <dl className="grid gap-4 md:grid-cols-2">
          <div>
            <dt className="text-sm text-gray-500">職員番号</dt>
            <dd className="font-mono">{request.employee.employeeNo}</dd>
          </div>
          <div>
            <dt className="text-sm text-gray-500">氏名</dt>
            <dd className="font-medium">
              {request.employee.lastName} {request.employee.firstName}
            </dd>
          </div>
          <div>
            <dt className="text-sm text-gray-500">施設</dt>
            <dd>{request.employee.facility?.name ?? "-"}</dd>
          </div>
          <div>
            <dt className="text-sm text-gray-500">部署</dt>
            <dd>{request.employee.department?.name ?? "-"}</dd>
          </div>
        </dl>
      </section>

      <section className="mt-6 rounded-lg border bg-white p-6 shadow-sm">
        <h2 className="mb-4 border-b pb-2 text-lg font-semibold">
          申請情報
        </h2>

        <dl className="grid gap-4 md:grid-cols-2">
          <div>
            <dt className="text-sm text-gray-500">状態</dt>
            <dd className="font-semibold">
              {statusLabels[request.status] ?? request.status}
            </dd>
          </div>
          <div>
            <dt className="text-sm text-gray-500">申請区分</dt>
            <dd>
              {notificationTypeLabels[request.notificationType] ??
                request.notificationType}
            </dd>
          </div>
          <div>
            <dt className="text-sm text-gray-500">通勤手段</dt>
            <dd>
              {commutingTypeLabels[request.commutingType] ??
                request.commutingType}
            </dd>
          </div>
          <div>
            <dt className="text-sm text-gray-500">適用開始日</dt>
            <dd>{formatDate(request.effectiveDate)}</dd>
          </div>
          <div>
            <dt className="text-sm text-gray-500">出発地</dt>
            <dd>{request.routeFrom ?? "-"}</dd>
          </div>
          <div>
            <dt className="text-sm text-gray-500">到着地</dt>
            <dd>{request.routeTo ?? "-"}</dd>
          </div>
          <div className="md:col-span-2">
            <dt className="text-sm text-gray-500">経路詳細</dt>
            <dd className="whitespace-pre-wrap">
              {request.routeDetails ?? "-"}
            </dd>
          </div>
          <div>
            <dt className="text-sm text-gray-500">交通機関名</dt>
            <dd>{request.transportationName ?? "-"}</dd>
          </div>
          <div>
            <dt className="text-sm text-gray-500">車両登録番号</dt>
            <dd>{request.vehicleRegistrationNumber ?? "-"}</dd>
          </div>
          <div>
            <dt className="text-sm text-gray-500">片道距離</dt>
            <dd>
              {request.oneWayDistanceKm != null
                ? `${request.oneWayDistanceKm}km`
                : "-"}
            </dd>
          </div>
          <div>
            <dt className="text-sm text-gray-500">片道運賃</dt>
            <dd>{formatMoney(request.oneWayFare)}</dd>
          </div>
          <div>
            <dt className="text-sm text-gray-500">月額申請額</dt>
            <dd>{formatMoney(request.monthlyAmount)}</dd>
          </div>
          <div>
            <dt className="text-sm text-gray-500">支給決定額</dt>
            <dd className="font-semibold">
              {formatMoney(request.approvedAmount)}
            </dd>
          </div>
          <div className="md:col-span-2">
            <dt className="text-sm text-gray-500">備考</dt>
            <dd className="whitespace-pre-wrap">
              {request.note ?? "-"}
            </dd>
          </div>
        </dl>
      </section>

      <section className="mt-6 rounded-lg border bg-white p-6 shadow-sm">
        <h2 className="mb-4 border-b pb-2 text-lg font-semibold">
          交通機関別明細
        </h2>

        {request.routeSegments.length === 0 ? (
          <p className="text-sm text-gray-500">
            交通機関別明細は登録されていません。
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="border p-2 text-left">交通事業者</th>
                  <th className="border p-2 text-left">路線名</th>
                  <th className="border p-2 text-left">利用区間</th>
                  <th className="border p-2 text-right">往復運賃</th>
                  <th className="border p-2 text-right">1か月定期代</th>
                  <th className="border p-2 text-right">支給対象額</th>
                </tr>
              </thead>

              <tbody>
                {request.routeSegments.map((segment) => (
                  <tr key={segment.id}>
                    <td className="border p-2">
                      {segment.operatorName}
                    </td>
                    <td className="border p-2">
                      {segment.lineName ?? "-"}
                    </td>
                    <td className="border p-2">
                      {segment.boardingPoint ?? "-"}
                      {" ～ "}
                      {segment.alightingPoint ?? "-"}
                    </td>
                    <td className="border p-2 text-right">
                      {formatMoney(segment.roundTripFare)}
                    </td>
                    <td className="border p-2 text-right">
                      {formatMoney(segment.monthlyPassAmount)}
                    </td>
                    <td className="border p-2 text-right font-medium">
                      {formatMoney(segment.payableAmount)}
                    </td>
                  </tr>
                ))}
              </tbody>

              <tfoot className="bg-blue-50 font-semibold">
                <tr>
                  <td
                    colSpan={5}
                    className="border p-2 text-right"
                  >
                    支給対象額合計
                  </td>
                  <td className="border p-2 text-right">
                    {formatMoney(
                      request.routeSegments.reduce(
                        (total, segment) =>
                          total + (segment.payableAmount ?? 0),
                        0,
                      ),
                    )}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        )}
      </section>

      <section className="mt-6 rounded-lg border bg-white p-6 shadow-sm">
        <h2 className="mb-4 border-b pb-2 text-lg font-semibold">
          添付書類
        </h2>

        {request.attachments.length === 0 ? (
          <p className="text-sm text-gray-500">
            添付書類はありません。
          </p>
        ) : (
          <ul className="space-y-2">
            {request.attachments.map((attachment) => (
              <li key={attachment.id} className="text-sm">
                <span className="font-medium">
                  {attachmentTypeLabels[attachment.attachmentType] ??
                    attachment.attachmentType}
                </span>
                <span className="ml-2 text-gray-600">
                  {attachment.fileName}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>

      {request.reviewedAt && (
        <section className="mt-6 rounded-lg border bg-white p-6 shadow-sm">
          <h2 className="mb-4 border-b pb-2 text-lg font-semibold">
            確認情報
          </h2>
          <p className="text-sm text-gray-700">
            確認日：{formatDate(request.reviewedAt)}
          </p>
          <p className="text-sm text-gray-700">
            確認者：{request.reviewedBy ?? "-"}
          </p>
          <p className="mt-2 text-sm text-gray-700 whitespace-pre-wrap">
            確認コメント：{request.reviewComment ?? "-"}
          </p>
        </section>
      )}

      {request.status === "PENDING" && (
        <section className="mt-6 grid gap-6 md:grid-cols-2">
          <form
            action={approveRequest}
            className="rounded-lg border border-green-200 bg-green-50 p-6 shadow-sm"
          >
            <input
              type="hidden"
              name="requestId"
              value={request.id}
            />
            <h2 className="font-semibold text-green-800">
              承認
            </h2>
            <p className="mt-1 text-xs text-green-700">
              申請内容を承認し、職員の通勤設定を更新します。
            </p>
            <label className="mt-4 block text-sm font-semibold text-green-800">
              支給決定額（円）
              <input
                type="number"
                name="approvedAmount"
                min="0"
                step="1"
                required
                defaultValue={request.monthlyAmount ?? ""}
                className="mt-2 w-full rounded border border-green-300 bg-white p-2 text-gray-900"
              />
            </label>

            <button
              type="submit"
              className="mt-4 w-full rounded bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
            >
              通勤届を承認する
            </button>
          </form>

          <form
            action={rejectRequest}
            className="rounded-lg border border-red-200 bg-red-50 p-6 shadow-sm"
          >
            <input
              type="hidden"
              name="requestId"
              value={request.id}
            />
            <label className="block text-sm font-semibold text-red-800">
              差戻し理由 <span className="text-red-500">*</span>
              <textarea
                name="reviewComment"
                required
                rows={3}
                placeholder="差戻しの理由を入力してください"
                className="mt-2 w-full rounded border border-red-300 bg-white p-2 text-sm text-gray-900 focus:border-red-500 focus:outline-none"
              />
            </label>
            <button
              type="submit"
              className="mt-4 w-full rounded bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
            >
              通勤届を差戻す
            </button>
          </form>
        </section>
      )}
    </main>
  );
}
