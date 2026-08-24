import Link from "next/link";
import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

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

export default async function MyDependentRequestsPage() {
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

  const requests = await prisma.dependentRequest.findMany({
    where: {
      employeeId: employee.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="mx-auto max-w-6xl p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            扶養家族申請履歴
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            自分が提出した扶養家族申請の状況を確認できます。
          </p>
        </div>

        <div className="flex gap-2">
          <Link
            href="/mypage/dependent-requests/new"
            className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            新規申請
          </Link>

          <Link
            href="/mypage"
            className="rounded border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            マイページへ戻る
          </Link>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 text-left">
              <th className="border-b p-3">状態</th>
              <th className="border-b p-3">扶養家族</th>
              <th className="border-b p-3">続柄</th>
              <th className="border-b p-3">生年月日</th>
              <th className="border-b p-3">年収</th>
              <th className="border-b p-3">同居</th>
              <th className="border-b p-3">健保扶養</th>
              <th className="border-b p-3">個人番号情報</th>
              <th className="border-b p-3">申請日</th>
              <th className="border-b p-3">確認コメント</th>
            </tr>
          </thead>

          <tbody>
            {requests.map((request) => (
              <tr key={request.id} className="align-top border-b hover:bg-gray-50">
                <td className="p-3">
                  <span
                    className={`rounded px-2 py-1 text-xs font-medium ${getStatusClass(
                      request.status,
                    )}`}
                  >
                    {getStatusLabel(request.status)}
                  </span>
                </td>

                <td className="p-3">
                  <div className="font-medium text-gray-900">{request.name}</div>
                  {request.nameKana && (
                    <div className="text-xs text-gray-500">{request.nameKana}</div>
                  )}
                </td>

                <td className="p-3 text-gray-700">{request.relationship}</td>

                <td className="p-3 text-gray-700">{formatDate(request.birthDate)}</td>

                <td className="p-3 text-right text-gray-700">
                  {request.annualIncome != null
                    ? `${request.annualIncome.toLocaleString("ja-JP")}円`
                    : "-"}
                </td>

                <td className="p-3 text-gray-700">
                  {request.cohabiting ? "同居" : "別居"}
                </td>

                <td className="p-3 text-gray-700">
                  {request.healthInsuranceDependent ? "対象" : "対象外"}
                </td>

                <td className="p-3 text-gray-700">
                  {request.encryptedMyNumber ? "登録あり" : "未登録"}
                </td>

                <td className="p-3 text-gray-700">
                  {request.createdAt.toLocaleDateString("ja-JP")}
                </td>

                <td className="p-3 text-gray-500">
                  {request.reviewComment ?? "-"}
                </td>
              </tr>
            ))}

            {requests.length === 0 && (
              <tr>
                <td
                  colSpan={10}
                  className="p-6 text-center text-sm text-gray-500"
                >
                  提出された扶養家族申請はありません。
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}
