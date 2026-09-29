import Link from "next/link";
import { auth } from "@/auth";
import { redirect, notFound } from "next/navigation";
import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";
import { logAudit } from "@/lib/audit-log";
import {
  getHRNotificationRecipients,
  sendSystemMailSafely,
} from "@/lib/mail";

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

const statusLabels: Record<string, string> = {
  PENDING: "承認待ち",
  APPROVED: "承認済み",
  REJECTED: "差戻し",
  CANCELLED: "取消済み",
};

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
    redirect("/");
  }

  return { session, employee };
}

export default async function CommutingRequestDetailPage({
  params,
}: Props) {
  const { employee } = await getCurrentEmployee();

  const { id } = await params;

  const request = await prisma.commutingRequest.findFirst({
    where: {
      id,
      employeeId: employee.id,
    },
    include: {
      attachments: true,
    },
  });

  if (!request) {
    notFound();
  }

  async function cancelRequest(formData: FormData) {
    "use server";

    const { session, employee } = await getCurrentEmployee();

    const requestId = String(
      formData.get("requestId") ?? "",
    ).trim();

    const cancelReason = String(
      formData.get("cancelReason") ?? "",
    ).trim();

    if (!requestId || !cancelReason) {
      return;
    }

    const target = await prisma.commutingRequest.findFirst({
      where: {
        id: requestId,
        employeeId: employee.id,
        status: "PENDING",
      },
    });

    if (!target) {
      return;
    }

    const updated = await prisma.commutingRequest.updateMany({
      where: {
        id: target.id,
        status: "PENDING",
      },
      data: {
        status: "CANCELLED",
        reviewComment: cancelReason,
      },
    });

    if (updated.count !== 1) {
      return;
    }

    await logAudit({
      userId: session.user.id,
      userName: session.user.name,
      action: "COMMUTING_REQUEST_CANCELLED",
      targetType: "CommutingRequest",
      targetId: target.id,
      description: `${employee.employeeNo} の通勤届を取消`,
      afterData: {
        cancelReason,
      },
    });

    const recipients = await getHRNotificationRecipients();

    if (recipients.length > 0) {
      await sendSystemMailSafely({
        to: recipients,
        subject: "【人事システム】通勤届が取消されました",
        text: `通勤届が取消されました。

職員番号：${employee.employeeNo}
氏名：${employee.lastName} ${employee.firstName}

取消理由：
${cancelReason}`,
      });
    }

    revalidatePath("/mypage/commuting-requests");
    revalidatePath(`/mypage/commuting-requests/${target.id}`);

    redirect("/mypage/commuting-requests");
  }

  return (
    <main className="mx-auto max-w-5xl p-8">
      <Link
        href="/mypage/commuting-requests"
        className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900"
      >
        ← 通勤届一覧へ戻る
      </Link>

      <h1 className="mt-4 text-3xl font-bold">通勤届詳細</h1>

      <div className="mt-6 rounded-lg border bg-white p-6 shadow-sm">
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
            <dd>
              {request.effectiveDate.toLocaleDateString("ja-JP")}
            </dd>
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
            <dt className="text-sm text-gray-500">月額手当</dt>
            <dd>
              {request.monthlyAmount != null
                ? `${request.monthlyAmount.toLocaleString("ja-JP")}円`
                : "-"}
            </dd>
          </div>

          <div>
            <dt className="text-sm text-gray-500">車両登録番号</dt>
            <dd>{request.vehicleRegistrationNumber ?? "-"}</dd>
          </div>
        </dl>

        {request.reviewComment && (
          <div className="mt-6 rounded border border-red-200 bg-red-50 p-4">
            <div className="font-medium text-red-800">
              確認コメント / 理由
            </div>
            <div className="mt-2 whitespace-pre-wrap text-sm text-red-700">
              {request.reviewComment}
            </div>
          </div>
        )}

        <div className="mt-6 border-t pt-4">
          <h2 className="font-semibold">添付書類</h2>

          {request.attachments.length === 0 ? (
            <p className="mt-2 text-sm text-gray-500">添付なし</p>
          ) : (
            <ul className="mt-2 space-y-2 text-sm">
              {request.attachments.map((file) => (
                <li key={file.id} className="text-gray-700">
                  {file.fileName}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {request.status === "PENDING" && (
        <form
          action={cancelRequest}
          className="mt-6 rounded-lg border border-red-200 bg-red-50 p-6 shadow-sm"
        >
          <input
            type="hidden"
            name="requestId"
            value={request.id}
          />

          <label className="block">
            <span className="font-medium text-red-800">
              取消理由 <span className="text-red-500">*</span>
            </span>

            <textarea
              name="cancelReason"
              required
              rows={4}
              placeholder="取消理由を入力してください"
              className="mt-2 w-full rounded border border-red-300 bg-white p-2 text-sm text-gray-900 focus:border-red-500 focus:outline-none"
            />
          </label>

          <button
            type="submit"
            className="mt-4 rounded bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
          >
            通勤届を取消する
          </button>
        </form>
      )}
    </main>
  );
}
