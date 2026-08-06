import Link from "next/link";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
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
    PENDING: "承認待ち",
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
    <span className={`rounded border px-2 py-1 text-xs font-medium ${className}`}>
      {formatStatus(status)}
    </span>
  );
}

export default async function ProfileChangeRequestsPage({
  searchParams,
}: Props) {
  const session = await requireHRManager();
  const params = await searchParams;

  const requests = await prisma.profileChangeRequest.findMany({
    include: {
      employee: {
        include: {
          department: true,
          user: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  async function approveRequest(formData: FormData) {
    "use server";

    const currentSession = await requireHRManager();

    const requestId = String(
      formData.get("requestId") ?? "",
    ).trim();

    if (!requestId) {
      redirect("/profile-change-requests");
    }

    const request = await prisma.profileChangeRequest.findUnique({
      where: {
        id: requestId,
      },
      include: {
        employee: true,
      },
    });

    if (!request || request.status !== "PENDING") {
      redirect("/profile-change-requests?error=notPending");
    }

    if (request.newEmail) {
      const existingEmployee = await prisma.employee.findFirst({
        where: {
          email: request.newEmail,
          NOT: {
            id: request.employeeId,
          },
        },
      });

      const existingUser = await prisma.user.findFirst({
        where: {
          email: request.newEmail,
          NOT: request.employee.userId
            ? {
                id: request.employee.userId,
              }
            : undefined,
        },
      });

      if (existingEmployee || existingUser) {
        redirect("/profile-change-requests?error=emailExists");
      }
    }

    await prisma.$transaction(async (tx) => {
      await tx.employee.update({
        where: {
          id: request.employeeId,
        },
        data: {
          address: request.newAddress ?? request.employee.address,
          phoneNumber:
            request.newPhoneNumber ?? request.employee.phoneNumber,
          email: request.newEmail ?? request.employee.email,
          emergencyContact:
            request.newEmergencyContact ??
            request.employee.emergencyContact,
        },
      });

      if (request.newEmail && request.employee.userId) {
        await tx.user.update({
          where: {
            id: request.employee.userId,
          },
          data: {
            email: request.newEmail,
          },
        });
      }

      await tx.profileChangeRequest.update({
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
    });

    revalidatePath("/profile-change-requests");
    revalidatePath(`/employees/${request.employeeId}`);
    revalidatePath("/employees");

    redirect("/profile-change-requests?success=approved");
  }

  async function rejectRequest(formData: FormData) {
    "use server";

    const currentSession = await requireHRManager();

    const requestId = String(
      formData.get("requestId") ?? "",
    ).trim();

    if (!requestId) {
      redirect("/profile-change-requests");
    }

    const request = await prisma.profileChangeRequest.findUnique({
      where: {
        id: requestId,
      },
    });

    if (!request || request.status !== "PENDING") {
      redirect("/profile-change-requests?error=notPending");
    }

    await prisma.profileChangeRequest.update({
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

    revalidatePath("/profile-change-requests");

    redirect("/profile-change-requests?success=rejected");
  }

  return (
    <main className="p-8">
      <div className="mb-6">
        <Link
          href="/"
          className="text-sm text-blue-600 hover:underline"
        >
          ← ダッシュボードへ戻る
        </Link>

        <h1 className="mt-2 text-3xl font-bold">
          プロフィール変更申請
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          職員から提出された住所、電話番号、メールアドレス、緊急連絡先の変更申請を確認できます。
        </p>

        <p className="mt-1 text-xs text-gray-400">
          確認者: {session.user.name ?? session.user.email}
        </p>
      </div>

      {params.error === "notPending" && (
        <div className="mb-4 rounded border border-red-300 bg-red-50 p-3 text-sm text-red-700">
          この申請は既に処理済みです。
        </div>
      )}

      {params.error === "emailExists" && (
        <div className="mb-4 rounded border border-red-300 bg-red-50 p-3 text-sm text-red-700">
          変更後メールアドレスは既に使用されています。
        </div>
      )}

      {params.success === "approved" && (
        <div className="mb-4 rounded border border-green-300 bg-green-50 p-3 text-sm text-green-700">
          申請を承認し、職員情報へ反映しました。
        </div>
      )}

      {params.success === "rejected" && (
        <div className="mb-4 rounded border border-green-300 bg-green-50 p-3 text-sm text-green-700">
          申請を却下しました。
        </div>
      )}

      {requests.length === 0 ? (
        <p className="text-sm text-gray-500">
          プロフィール変更申請はありません。
        </p>
      ) : (
        <div className="space-y-6">
          {requests.map((request) => (
            <section
              key={request.id}
              className="rounded border bg-white p-6"
            >
              <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="text-xl font-bold">
                    {request.employee.lastName} {request.employee.firstName}
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    社員番号: {request.employee.employeeNo}
                    {" / "}
                    部署: {request.employee.department?.name ?? "-"}
                    {" / "}
                    申請日: {formatDate(request.createdAt)}
                  </p>
                </div>

                <StatusBadge status={request.status} />
              </div>

              <table className="mb-4 w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b bg-gray-50 text-left">
                    <th className="p-2">項目</th>
                    <th className="p-2">変更前</th>
                    <th className="p-2">変更後</th>
                  </tr>
                </thead>

                <tbody>
                  <tr className="border-b">
                    <td className="p-2 font-medium">住所</td>
                    <td className="p-2">{request.currentAddress ?? "-"}</td>
                    <td className="p-2">{request.newAddress ?? "-"}</td>
                  </tr>

                  <tr className="border-b">
                    <td className="p-2 font-medium">電話番号</td>
                    <td className="p-2">{request.currentPhoneNumber ?? "-"}</td>
                    <td className="p-2">{request.newPhoneNumber ?? "-"}</td>
                  </tr>

                  <tr className="border-b">
                    <td className="p-2 font-medium">メールアドレス</td>
                    <td className="p-2">{request.currentEmail ?? "-"}</td>
                    <td className="p-2">{request.newEmail ?? "-"}</td>
                  </tr>

                  <tr className="border-b">
                    <td className="p-2 font-medium">緊急連絡先</td>
                    <td className="p-2">
                      {request.currentEmergencyContact ?? "-"}
                    </td>
                    <td className="p-2">
                      {request.newEmergencyContact ?? "-"}
                    </td>
                  </tr>
                </tbody>
              </table>

              {request.reviewedAt && (
                <p className="mb-4 text-xs text-gray-500">
                  確認日: {formatDate(request.reviewedAt)}
                  {" / "}
                  確認者: {request.reviewedBy ?? "-"}
                </p>
              )}

              {request.status === "PENDING" && (
                <div className="flex gap-3">
                  <form action={approveRequest}>
                    <input
                      type="hidden"
                      name="requestId"
                      value={request.id}
                    />

                    <button
                      type="submit"
                      className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                    >
                      承認して反映
                    </button>
                  </form>

                  <form action={rejectRequest}>
                    <input
                      type="hidden"
                      name="requestId"
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
