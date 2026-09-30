import Link from "next/link";
import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

const statusLabels: Record<string, string> = {
  APPROVED: "承認済",
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

export default async function CurrentCertificationsPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const employee = await prisma.employee.findUnique({
    where: {
      userId: session.user.id,
    },
    include: {
      certifications: {
        include: {
          certification: true,
          employeeCertificationAttachments: {
            orderBy: {
              createdAt: "desc",
            },
          },
        },
        orderBy: [
          {
            acquiredDate: "desc",
          },
          {
            createdAt: "desc",
          },
        ],
      },
    },
  });

  if (!employee) {
    redirect("/");
  }

  return (
    <main className="mx-auto max-w-5xl p-8">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            保有免許・資格等
          </h1>

          <p className="mt-2 text-sm text-gray-600">
            現在登録されている免許・資格等を表示しています。
          </p>
        </div>

        <Link
          href="/"
          className="inline-flex items-center rounded border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          ダッシュボードへ戻る
        </Link>
      </div>

      {employee.certifications.length === 0 ? (
        <section className="mt-6 rounded-lg border bg-white p-8 text-center shadow-sm">
          <p className="text-gray-600">
            登録されている免許・資格等はありません。
          </p>

          <Link
            href="/mypage/certifications"
            className="mt-4 inline-block rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            免許・資格等を申請する
          </Link>
        </section>
      ) : (
        <>
          <section className="mt-6 space-y-4">
            {employee.certifications.map((item) => (
              <article
                key={item.id}
                className="rounded-lg border bg-gray-50 p-6 shadow-sm"
              >
                <div className="flex flex-wrap items-start justify-between gap-3 border-b pb-3">
                  <h2 className="text-lg font-semibold text-gray-900">
                    {item.certification.name}
                  </h2>

                  <span
                    className={`rounded px-2 py-1 text-xs font-medium ${
                      statusClasses[item.status] ??
                      "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {statusLabels[item.status] ?? item.status}
                  </span>
                </div>

                <dl className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="rounded-lg border bg-white p-4">
                    <dt className="text-sm font-medium text-gray-500">
                      取得日
                    </dt>
                    <dd className="mt-1 text-gray-900">
                      {formatDate(item.acquiredDate)}
                    </dd>
                  </div>

                  <div className="rounded-lg border bg-white p-4">
                    <dt className="text-sm font-medium text-gray-500">
                      有効期限
                    </dt>
                    <dd className="mt-1 text-gray-900">
                      {formatDate(item.expiryDate)}
                    </dd>
                  </div>
                </dl>

                <div className="mt-4">
                  <h3 className="text-sm font-semibold text-gray-700">
                    添付書類
                  </h3>

                  {item.employeeCertificationAttachments.length === 0 ? (
                    <p className="mt-2 text-sm text-gray-500">
                      添付書類はありません。
                    </p>
                  ) : (
                    <ul className="mt-2 space-y-2">
                      {item.employeeCertificationAttachments.map(
                        (attachment) => (
                          <li
                            key={attachment.id}
                            className="rounded border bg-white p-3"
                          >
                            <a
                              href={`/api/certification-attachments/${attachment.id}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-blue-600 hover:underline"
                            >
                              {attachment.fileName}
                            </a>
                          </li>
                        ),
                      )}
                    </ul>
                  )}
                </div>
              </article>
            ))}
          </section>

          <section className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/mypage/certifications"
              className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              免許・資格等を申請する
            </Link>
          </section>
        </>
      )}
    </main>
  );
}
