import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import BackLink from "@/components/BackLink";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

const residenceTypeLabels: Record<string, string> = {
  RENTAL: "賃貸",
  CORPORATE_HOUSING: "法人契約住宅",
  OWNED: "持家",
};

const notificationTypeLabels: Record<string, string> = {
  NEW: "新規",
  ADDRESS_CHANGE: "住所変更",
  CONTENT_CHANGE: "内容変更",
};

const ownershipTypeLabels: Record<string, string> = {
  SELF: "本人名義",
  JOINT: "共同名義",
  FAMILY: "家族名義",
};

const attachmentTypeLabels: Record<string, string> = {
  LEASE_CONTRACT: "賃貸借契約書",
  SALES_CONTRACT: "売買契約書",
  REGISTRY: "登記簿",
  RESIDENCE_CERTIFICATE: "住民票",
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

export default async function ResidenceRequestDetailPage({
  params,
}: Props) {
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

  const { id } = await params;

  const request = await prisma.residenceRequest.findFirst({
    where: {
      id,
      employeeId: employee.id,
    },
    include: {
      attachments: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!request) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-4xl p-8">
      <BackLink
        href="/mypage/residence-requests"
        label="一覧に戻る"
      />

      <div className="mt-4 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold">住居届詳細</h1>
          <p className="mt-1 text-sm text-gray-500">
            申請日：{formatDate(request.createdAt)}
          </p>
        </div>

        {request.status === "PENDING" && (
          <Link
            href={`/mypage/residence-requests/${request.id}/cancel`}
            className="rounded bg-red-600 px-4 py-2 font-bold text-white hover:bg-red-700"
          >
            申請を取り消す
          </Link>
        )}
      </div>

      <section className="mt-6 rounded-lg border bg-white p-6 shadow-sm">
        <h2 className="mb-4 border-b pb-2 text-lg font-semibold">
          申請情報
        </h2>

        <dl className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div>
            <dt className="text-sm text-gray-500">状態</dt>
            <dd className="font-medium">
              {statusLabels[request.status] ?? request.status}
            </dd>
          </div>

          <div>
            <dt className="text-sm text-gray-500">届出区分</dt>
            <dd>
              {notificationTypeLabels[request.notificationType] ??
                request.notificationType}
            </dd>
          </div>

          <div>
            <dt className="text-sm text-gray-500">住宅種別</dt>
            <dd>
              {residenceTypeLabels[request.residenceType] ??
                request.residenceType}
            </dd>
          </div>
        </dl>
      </section>
    </main>
  );
}
