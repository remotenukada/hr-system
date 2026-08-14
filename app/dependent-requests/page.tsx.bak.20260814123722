import Link from "next/link";
import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";
import { requireHRManager } from "@/lib/auth-guard";
import { logAudit } from "@/lib/audit-log";

function getStatusLabel(status: string) {
  if (status === "APPROVED") return "承認済";
  if (status === "REJECTED") return "差戻し";
  return "承認待ち";
}

function getStatusClass(status: string) {
  if (status === "APPROVED") return "bg-green-100 text-green-800";
  if (status === "REJECTED") return "bg-red-100 text-red-800";
  return "bg-yellow-100 text-yellow-800";
}

function formatDate(date: Date | null | undefined) {
  if (!date) return "-";
  return new Date(date).toLocaleDateString("ja-JP");
}

export default async function DependentRequestsPage() {
  await requireHRManager();

  async function approveRequest(formData: FormData) {
    "use server";

    const session = await requireHRManager();
    const requestId = String(formData.get("requestId") ?? "").trim();

    if (!requestId) {
      return;
    }

    const request = await prisma.dependentRequest.findUnique({
      where: {
        id: requestId,
      },
      include: {
        employee: true,
      },
    });

    if (!request || request.status !== "PENDING") {
      return;
    }

    const dependent = await prisma.dependent.create({
      data: {
        employeeId: request.employeeId,
        name: request.name,
        nameKana: request.nameKana,
        relationship: request.relationship,
        birthDate: request.birthDate,
        annualIncome: request.annualIncome,
        cohabiting: request.cohabiting,
        healthInsuranceDependent: request.healthInsuranceDependent,
        encryptedMyNumber: request.encryptedMyNumber,
        note: request.note,
      },
    });

    await prisma.dependentRequest.update({
      where: {
        id: requestId,
      },
      data: {
        status: "APPROVED",
        reviewedAt: new Date(),
        reviewedBy: session.user.name ?? session.user.id,
        reviewComment: null,
      },
    });

    await logAudit({
      userId: session.user.id,
      userName: session.user.name,
      action: "DEPENDENT_REQUEST_APPROVED",
      targetType: "DependentRequest",
      targetId: requestId,
      description: `${request.employee.employeeNo} の扶養家族申請を承認`,
      afterData: {
        dependentId: dependent.id,
        employeeId: request.employeeId,
        name: request.name,
        relationship: request.relationship,
      },
    });

    revalidatePath("/dependent-requests");
    revalidatePath(`/employees/${request.employeeId}`);
    revalidatePath("/");
  }

  async function rejectRequest(formData: FormData) {
    "use server";

    const session = await requireHRManager();
    const requestId = String(formData.get("requestId") ?? "").trim();
    const reviewComment = String(
      formData.get("reviewComment") ?? "",
    ).trim();

    if (!requestId || !reviewComment) {
      return;
    }

    const request = await prisma.dependentRequest.findUnique({
      where: {
        id: requestId,
      },
      include: {
        employee: true,
      },
    });

    if (!request || request.status !== "PENDING") {
      return;
    }

    await prisma.dependentRequest.update({
      where: {
        id: requestId,
      },
      data: {
        status: "REJECTED",
        reviewedAt: new Date(),
        reviewedBy: session.user.name ?? session.user.id,
        reviewComment,
      },
    });

    await logAudit({
      userId: session.user.id,
      userName: session.user.name,
      action: "DEPENDENT_REQUEST_REJECTED",
      targetType: "DependentRequest",
      targetId: requestId,
      description: `${request.employee.employeeNo} の扶養家族申請を差戻し: ${reviewComment}`,
    });

    revalidatePath("/dependent-requests");
    revalidatePath("/");
  }

  const requests = await prisma.dependentRequest.findMany({
    include: {
      employee: {
        include: {
          department: true,
        },
      },
      attachments: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="mx-auto max-w-7xl p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            扶養家族申請
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            社員本人から提出された扶養家族追加申請を確認します。
          </p>
        </div>

        <Link
          href="/"
          className="text-sm text-blue-600 hover:underline"
        >
          ← ダッシュボードへ戻る
        </Link>
      </div>

      <div className="overflow-x-auto rounded-lg border bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 text-left">
              <th className="border-b p-3">状態</th>
              <th className="border-b p-3">社員</th>
              <th className="border-b p-3">扶養家族</th>
              <th className="border-b p-3">続柄</th>
              <th className="border-b p-3">生年月日</th>
              <th className="border-b p-3">年収</th>
              <th className="border-b p-3">同居</th>
              <th className="border-b p-3">健保扶養</th>
              <th className="border-b p-3">個人番号情報</th>
              <th className="border-b p-3">添付資料</th>
              <th className="border-b p-3">申請日</th>
              <th className="border-b p-3">操作</th>
            </tr>
          </thead>

          <tbody>
            {requests.map((request) => (
              <tr key={request.id} className="align-top">
                <td className="border-b p-3">
                  <span
                    className={`rounded px-2 py-1 text-xs font-medium ${getStatusClass(
                      request.status,
                    )}`}
                  >
                    {getStatusLabel(request.status)}
                  </span>
                </td>

                <td className="border-b p-3">
                  <Link
                    href={`/employees/${request.employeeId}`}
                    className="font-medium text-blue-600 hover:underline"
                  >
                    {request.employee.lastName} {request.employee.firstName}
                  </Link>
                  <div className="text-xs text-gray-500">
                    {request.employee.employeeNo}
                  </div>
                  <div className="text-xs text-gray-500">
                    {request.employee.department?.name ?? "-"}
                  </div>
                </td>

                <td className="border-b p-3">
                  {request.name}
                  {request.nameKana && (
                    <div className="text-xs text-gray-500">
                      {request.nameKana}
                    </div>
                  )}
                </td>

                <td className="border-b p-3">
                  {request.relationship}
                </td>

                <td className="border-b p-3">
                  {formatDate(request.birthDate)}
                </td>

                <td className="border-b p-3 text-right">
                  {request.annualIncome != null
                    ? `${request.annualIncome.toLocaleString("ja-JP")}円`
                    : "-"}
                </td>

                <td className="border-b p-3">
                  {request.cohabiting ? "同居" : "別居"}
                </td>

                <td className="border-b p-3">
                  {request.healthInsuranceDependent ? "対象" : "対象外"}
                </td>

                <td className="border-b p-3">
                  {request.encryptedMyNumber ? "登録あり" : "未登録"}
                </td>

                <td className="border-b p-3">
                  {request.attachments.length === 0 ? (
                    "-"
                  ) : (
                    <div className="space-y-1">
                      {request.attachments.map((attachment) => (
                        <a
                          key={attachment.id}
                          href={attachment.filePath}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block text-xs text-blue-600 hover:underline"
                        >
                          📎 {attachment.fileName}
                        </a>
                      ))}
                    </div>
                  )}
                </td>

                <td className="border-b p-3">
                  {request.createdAt.toLocaleDateString("ja-JP")}
                </td>

                <td className="border-b p-3">
                  {request.status === "PENDING" ? (
                    <div className="space-y-2">
                      <form action={approveRequest}>
                        <input
                          type="hidden"
                          name="requestId"
                          value={request.id}
                        />
                        <button
                          type="submit"
                          className="w-full rounded bg-green-600 px-3 py-1 text-xs font-medium text-white hover:bg-green-700"
                        >
                          承認
                        </button>
                      </form>

                      <form action={rejectRequest} className="space-y-1">
                        <input
                          type="hidden"
                          name="requestId"
                          value={request.id}
                        />
                        <input
                          name="reviewComment"
                          placeholder="差戻し理由"
                          className="w-full rounded border p-1 text-xs"
                          required
                        />
                        <button
                          type="submit"
                          className="w-full rounded bg-red-600 px-3 py-1 text-xs font-medium text-white hover:bg-red-700"
                        >
                          差戻し
                        </button>
                      </form>
                    </div>
                  ) : (
                    <div className="text-xs text-gray-500">
                      {request.reviewComment ?? "-"}
                    </div>
                  )}
                </td>
              </tr>
            ))}

            {requests.length === 0 && (
              <tr>
                <td
                  colSpan={12}
                  className="p-6 text-center text-sm text-gray-500"
                >
                  扶養家族申請はありません。
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}
