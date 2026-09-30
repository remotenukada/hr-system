import Link from "next/link";
import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

const statusLabels: Record<string, string> = {
  APPROVED: "確認済",
  PENDING: "確認待ち",
  REJECTED: "差戻し",
};

const statusClasses: Record<string, string> = {
  APPROVED: "bg-green-100 text-green-800",
  PENDING: "bg-yellow-100 text-yellow-800",
  REJECTED: "bg-red-100 text-red-800",
};

function formatDate(value: Date | null | undefined) {
  return value
    ? new Date(value).toLocaleDateString("ja-JP")
    : "-";
}

function InfoItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-lg border bg-white p-4">
      <dt className="text-sm font-medium text-gray-500">
        {label}
      </dt>
      <dd className="mt-1 text-gray-900">{value}</dd>
    </div>
  );
}

export default async function CurrentMyNumberPage() {
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

  const myNumber = await prisma.employeeMyNumber.findUnique({
    where: {
      employeeId: employee.id,
    },
  });

  return (
    <main className="mx-auto max-w-5xl p-8">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            マイナンバー提出状況
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            セキュリティ保護のため、マイナンバー本体は表示しません。
          </p>
        </div>

        <Link
          href="/"
          className="inline-flex items-center rounded border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          ダッシュボードへ戻る
        </Link>
      </div>

      {!myNumber ? (
        <section className="mt-6 rounded-lg border bg-white p-8 text-center shadow-sm">
          <p className="text-gray-600">
            マイナンバーはまだ提出されていません。
          </p>

          <Link
            href="/mypage/my-number"
            className="mt-4 inline-block rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            マイナンバーを提出する
          </Link>
        </section>
      ) : (
        <>
          <section className="mt-6 rounded-lg border bg-gray-50 p-6 shadow-sm">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b pb-2">
              <h2 className="text-lg font-semibold">
                提出情報
              </h2>

              <span
                className={`rounded px-2 py-1 text-xs font-medium ${
                  statusClasses[myNumber.status] ??
                  "bg-gray-100 text-gray-800"
                }`}
              >
                {statusLabels[myNumber.status] ??
                  myNumber.status}
              </span>
            </div>

            {myNumber.status === "REJECTED" &&
              myNumber.reviewComment && (
                <div className="mb-4 rounded border border-red-200 bg-red-50 p-4">
                  <p className="font-semibold text-red-700">
                    差戻し理由
                  </p>
                  <p className="mt-1 text-sm text-red-600">
                    {myNumber.reviewComment}
                  </p>
                </div>
              )}

            <dl className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <InfoItem
                label="提出状況"
                value={
                  statusLabels[myNumber.status] ??
                  myNumber.status
                }
              />

              <InfoItem
                label="提出日"
                value={formatDate(myNumber.createdAt)}
              />

              <InfoItem
                label="最終更新日"
                value={formatDate(myNumber.updatedAt)}
              />

              <InfoItem
                label="確認日"
                value={formatDate(myNumber.verifiedAt)}
              />
            </dl>
          </section>

          <section className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/mypage/my-number"
              className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              マイナンバーを提出・変更する
            </Link>
          </section>
        </>
      )}
    </main>
  );
}
