import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { prisma } from "../../../lib/prisma";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

function requestTypeLabel(type: string) {
  switch (type) {
    case "ONBOARDING":
      return "入社申請";
    case "DEPARTMENT_CHANGE":
      return "部署変更申請";
    case "OTHER":
      return "その他";
    default:
      return type;
  }
}

function requestStatusLabel(status: string) {
  switch (status) {
    case "PENDING":
      return "未対応";
    case "APPROVED":
      return "承認済み";
    case "REJECTED":
      return "却下";
    default:
      return status;
  }
}

export default async function RequestDetailPage({
  params,
}: Props) {
  const { id } = await params;

  const request = await prisma.employeeRequest.findUnique({
    where: {
      id,
    },
    include: {
      employee: true,
    },
  });

  if (!request) {
    notFound();
  }

  async function approveRequest() {
    "use server";

    await prisma.employeeRequest.update({
      where: {
        id,
      },
      data: {
        status: "APPROVED",
      },
    });

    revalidatePath("/requests");
    revalidatePath(`/requests/${id}`);

    redirect(`/requests/${id}`);
  }

  async function rejectRequest() {
    "use server";

    await prisma.employeeRequest.update({
      where: {
        id,
      },
      data: {
        status: "REJECTED",
      },
    });

    revalidatePath("/requests");
    revalidatePath(`/requests/${id}`);

    redirect(`/requests/${id}`);
  }

  async function deleteRequest() {
    "use server";

    await prisma.employeeRequest.delete({
      where: {
        id,
      },
    });

    revalidatePath("/requests");

    redirect("/requests");
  }

  return (
    <main className="p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        申請詳細
      </h1>

      <div className="bg-white border rounded-xl p-6 space-y-4 mb-6 shadow-sm text-gray-700">
        <p>
          <strong className="text-gray-900">タイトル:</strong> {request.title}
        </p>

        <p>
          <strong className="text-gray-900">申請種別:</strong> {requestTypeLabel(request.type)}
        </p>

        <p>
          <strong className="text-gray-900">ステータス:</strong> {requestStatusLabel(request.status)}
        </p>

        <p>
          <strong className="text-gray-900">対象社員:</strong>{" "}
          {request.employee
            ? `${request.employee.lastName} ${request.employee.firstName}`
            : "-"}
        </p>

        <p>
          <strong className="text-gray-900">作成日:</strong>{" "}
          {request.createdAt.toLocaleDateString("ja-JP")}
        </p>
      </div>

      {/* アクションエリア */}
      <div className="flex justify-between items-center mb-6">
        {/* 左側：未対応の場合のみ承認・却下ボタンを表示 */}
        <div className="flex gap-4">
          {request.status === "PENDING" ? (
            <>
              <form action={approveRequest}>
                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium shadow-sm"
                >
                  承認
                </button>
              </form>

              <form action={rejectRequest}>
                <button
                  type="submit"
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors font-medium shadow-sm"
                >
                  却下
                </button>
              </form>
            </>
          ) : (
            <p className="text-sm text-gray-500 bg-gray-50 p-2 px-3 rounded-lg border border-gray-100">
              この申請は処理済みです。
            </p>
          )}
        </div>

        {/* 右側：常に表示される削除ボタン */}
        <form action={deleteRequest}>
          <button
            type="submit"
            className="border border-red-200 text-red-600 px-4 py-2 rounded-lg hover:bg-red-50 transition-colors font-medium text-sm"
          >
            申請を削除
          </button>
        </form>
      </div>

      {/* 戻るリンク */}
      <div className="mt-6 border-t pt-4">
        <Link href="/requests" className="text-sm text-blue-600 hover:underline">
          ← 申請一覧へ戻る
        </Link>
      </div>
    </main>
  );
}
