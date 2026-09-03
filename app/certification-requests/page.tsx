import BackLink from "@/components/BackLink";
import Link from "next/link";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { requireHRManager } from "@/lib/auth-guard";

type Props = {
  searchParams: Promise<{
    error?: string;
    success?: string;
  }>;
};

function formatDate(date: Date | null) {
  if (!date) return "-";
  return date.toLocaleDateString("ja-JP");
}

function formatStatus(status: string) {
  const labels: Record<string, string> = {
    PENDING: "確認待ち",
    APPROVED: "承認済み",
    REJECTED: "却下",
  };

  return labels[status] ?? status;
}

function StatusBadge({ status }: { status: string }) {
  const className =
    status === "APPROVED"
      ? "border-green-200 bg-green-50 text-green-700"
      : status === "REJECTED"
        ? "border-red-200 bg-red-50 text-red-700"
        : "border-yellow-200 bg-yellow-50 text-yellow-700";

  return (
    <span
      className={`rounded border px-2 py-1 text-xs font-medium ${className}`}
    >
      {formatStatus(status)}
    </span>
  );
}

export default async function CertificationRequestsPage({
  searchParams,
}: Props) {
  const session = await requireHRManager();
  const params = await searchParams;

  const cookieStore = await cookies();

  const facilityScope = cookieStore.get("facilityScope")?.value ?? "ALL";

  const scopedFacility =
    facilityScope !== "ALL"
      ? await prisma.facility.findUnique({
          where: { id: facilityScope },
        })
      : null;

  const requests = await prisma.employeeCertification.findMany({
    where:
      facilityScope === "ALL"
        ? undefined
        : {
            employee: {
              facilityId: facilityScope,
            },
          },
    include: {
      employee: {
        include: {
          facility: true,
          department: true,
        },
      },
      certification: true,
      employeeCertificationAttachments: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  async function approveCertification(formData: FormData) {
    "use server";

    const currentSession = await requireHRManager();

    const certificationRequestId = String(
      formData.get("certificationRequestId") ?? "",
    ).trim();

    if (!certificationRequestId) {
      redirect("/certification-requests");
    }

    const request = await prisma.employeeCertification.findUnique({
      where: {
        id: certificationRequestId,
      },
    });

    if (!request || request.status !== "PENDING") {
      redirect("/certification-requests?error=notPending");
    }

    await prisma.employeeCertification.update({
      where: {
        id: request.id,
      },
      data: {
        status: "APPROVED",
        reviewedAt: new Date(),
        reviewedBy:
          currentSession.user.name ??
          currentSession.user.email ??
          currentSession.user.id,
      },
    });

    revalidatePath("/certification-requests");
    revalidatePath(`/employees/${request.employeeId}`);
    revalidatePath(`/employees/${request.employeeId}/certifications`);

    redirect("/certification-requests?success=approved");
  }

  async function rejectCertification(formData: FormData) {
    "use server";

    const currentSession = await requireHRManager();

    const certificationRequestId = String(
      formData.get("certificationRequestId") ?? "",
    ).trim();

    if (!certificationRequestId) {
      redirect("/certification-requests");
    }

    const request = await prisma.employeeCertification.findUnique({
      where: {
        id: certificationRequestId,
      },
    });

    if (!request || request.status !== "PENDING") {
      redirect("/certification-requests?error=notPending");
    }

    await prisma.employeeCertification.update({
      where: {
        id: request.id,
      },
      data: {
        status: "REJECTED",
        reviewedAt: new Date(),
        reviewedBy:
          currentSession.user.name ??
          currentSession.user.email ??
          currentSession.user.id,
      },
    });

    revalidatePath("/certification-requests");
    revalidatePath(`/employees/${request.employeeId}`);
    revalidatePath(`/employees/${request.employeeId}/certifications`);

    redirect("/certification-requests?success=rejected");
  }

  return (
    <main className="p-8">
      <BackLink href="/" label="ダッシュボードへ戻る" />
      <div className="mb-6">
        <h1 className="mt-2 text-3xl font-bold">資格・免許証確認</h1>

        <p className="mt-1 text-sm text-gray-500">
          職員が登録した資格と添付された資格証・免許証を確認できます。
        </p>

        <p className="mt-1 text-sm font-medium text-blue-700">
          表示対象：{scopedFacility?.name ?? "法人全体"}
        </p>

        <p className="mt-1 text-xs text-gray-400">
          確認者: {session.user.name ?? session.user.email}
        </p>
      </div>

      {params.error === "notPending" && (
        <div className="mb-4 rounded border border-red-300 bg-red-50 p-3 text-sm text-red-700">
          この資格申請は既に処理済みです。
        </div>
      )}

      {params.success === "approved" && (
        <div className="mb-4 rounded border border-green-300 bg-green-50 p-3 text-sm text-green-700">
          資格申請を承認しました。
        </div>
      )}

      {params.success === "rejected" && (
        <div className="mb-4 rounded border border-green-300 bg-green-50 p-3 text-sm text-green-700">
          資格申請を却下しました。
        </div>
      )}

      {requests.length === 0 ? (
        <p className="text-sm text-gray-500">資格申請はありません。</p>
      ) : (
        <div className="space-y-6">
          {requests.map((request) => (
            <section key={request.id} className="rounded border bg-white p-6">
              <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="text-xl font-bold">
                    {request.certification.name}
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    {request.employee.lastName} {request.employee.firstName}
                    {" / "}
                    社員番号: {request.employee.employeeNo}
                    {" / "}
                    施設: {request.employee.facility?.name ?? "-"}
                    {" / "}
                    部署: {request.employee.department?.name ?? "-"}
                  </p>
                </div>

                <StatusBadge status={request.status} />
              </div>

              <dl className="mb-4 grid grid-cols-1 gap-3 text-sm md:grid-cols-3">
                <div>
                  <dt className="font-medium text-gray-500">取得日</dt>
                  <dd>{formatDate(request.acquiredDate)}</dd>
                </div>

                <div>
                  <dt className="font-medium text-gray-500">有効期限</dt>
                  <dd>{formatDate(request.expiryDate)}</dd>
                </div>

                <div>
                  <dt className="font-medium text-gray-500">登録日</dt>
                  <dd>{formatDate(request.createdAt)}</dd>
                </div>
              </dl>

              <div className="mb-4">
                <h3 className="mb-2 text-sm font-semibold">添付ファイル</h3>

                {request.employeeCertificationAttachments.length === 0 ? (
                  <p className="text-sm text-gray-500">
                    添付ファイルはありません。
                  </p>
                ) : (
                  <ul className="space-y-1 text-sm">
                    {request.employeeCertificationAttachments.map(
                      (attachment) => (
                        <li key={attachment.id}>
                          <a
                            href={`/api/certification-attachments/${attachment.id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            {attachment.fileName}
                          </a>
                        </li>
                      ),
                    )}
                  </ul>
                )}
              </div>

              {request.reviewedAt && (
                <p className="mb-4 text-xs text-gray-500">
                  確認日: {formatDate(request.reviewedAt)}
                  {" / "}
                  確認者: {request.reviewedBy ?? "-"}
                </p>
              )}

              {request.status === "PENDING" && (
                <div className="flex gap-3">
                  <form action={approveCertification}>
                    <input
                      type="hidden"
                      name="certificationRequestId"
                      value={request.id}
                    />

                    <button
                      type="submit"
                      className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                    >
                      承認
                    </button>
                  </form>

                  <form action={rejectCertification}>
                    <input
                      type="hidden"
                      name="certificationRequestId"
                      value={request.id}
                    />

                    <button
                      type="submit"
                      className="rounded bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
                    >
                      却下
                    </button>
                  </form>
                </div>
              )}
            </section>
          ))}
        </div>
      )}
    </main>
  );
}
