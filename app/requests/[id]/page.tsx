import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import Link from "next/link";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function RequestDetailPage({ params }: PageProps) {
  const { id } = await params;
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const request = await prisma.employeeRequest.findUnique({
    where: { id },
    include: {
      attachments: {
        orderBy: { createdAt: "desc" },
      },
      histories: {
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!request) {
    return <div className="p-8">申請が見つかりません。</div>;
  }

  // --- 承認処理（Server Action） ---
  async function approveAction(formData: FormData) {
    "use server";

    const currentSession = await auth();
    const approvalComment =
      formData.get("approvalComment")?.toString() || null;

    const actorName =
      currentSession?.user?.name ||
      currentSession?.user?.email ||
      "管理者";

    await prisma.employeeRequest.update({
      where: { id },
      data: {
        status: "APPROVED",
        histories: {
          create: {
            action: "APPROVED",
            actor: actorName,
            comment: approvalComment || "申請を承認しました",
          },
        },
      },
    });

    revalidatePath(`/requests/${id}`);
    revalidatePath("/requests");
  }

  // --- 却下処理（Server Action） ---
  async function rejectAction(formData: FormData) {
    "use server";

    const currentSession = await auth();
    const rejectionReason =
      formData.get("rejectionReason")?.toString() || null;

    const actorName =
      currentSession?.user?.name ||
      currentSession?.user?.email ||
      "管理者";

    await prisma.employeeRequest.update({
      where: { id },
      data: {
        status: "REJECTED",
        histories: {
          create: {
            action: "REJECTED",
            actor: actorName,
            comment: rejectionReason || "申請を却下しました",
          },
        },
      },
    });

    revalidatePath(`/requests/${id}`);
    revalidatePath("/requests");
  }

  const isAdmin = session.user.role === "ADMIN";

  return (
    <main className="p-8 max-w-4xl mx-auto">
      <div className="mb-6">
        <Link href="/requests" className="text-blue-600 hover:underline">
          ← 申請一覧に戻る
        </Link>
        <h1 className="text-3xl font-bold mt-2">{request.title}</h1>
        <p className="text-gray-500 mt-1">
          ステータス: <span className="font-semibold text-black">{request.status}</span>
        </p>
      </div>

      <div className="bg-white p-6 rounded border mb-8">
        <h2 className="text-xl font-bold mb-2">申請内容</h2>
        <p className="text-gray-700 whitespace-pre-wrap">{request.comment || "コメントなし"}</p>
      </div>

      <div className="bg-white p-6 rounded border mb-8">
        <h2 className="text-xl font-bold mb-4">添付ファイル</h2>

        {request.attachments.length === 0 ? (
          <p className="text-gray-500">添付ファイルはありません。</p>
        ) : (
          <ul className="space-y-3">
            {request.attachments.map((attachment) => (
              <li
                key={attachment.id}
                className="flex items-center justify-between rounded border bg-gray-50 p-3"
              >
                <div>
                  <p className="font-medium text-gray-800">
                    {attachment.fileName}
                  </p>
                  <p className="text-xs text-gray-500">
                    {attachment.mimeType || "unknown"} /{" "}
                    {attachment.fileSize
                      ? `${Math.ceil(attachment.fileSize / 1024)} KB`
                      : "-"}
                  </p>
                </div>

                <a
                  href={attachment.filePath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded border bg-white px-3 py-1 text-xs font-medium text-gray-700 hover:bg-gray-100"
                >
                  開く
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* 管理者用：承認・却下フォーム */}
      {isAdmin && request.status === "PENDING" && (
        <div className="bg-gray-50 p-6 rounded border mb-8 space-y-6">
          <h2 className="text-xl font-bold">管理者操作</h2>

          {/* 承認フォーム */}
          <form action={approveAction} className="space-y-2">
            <input
              type="text"
              name="approvalComment"
              placeholder="承認コメント（任意）"
              className="w-full p-2 border rounded"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 font-medium"
            >
              承認する
            </button>
          </form>

          <hr />

          {/* 却下フォーム */}
          <form action={rejectAction} className="space-y-2">
            <input
              type="text"
              name="rejectionReason"
              placeholder="却下理由（任意）"
              className="w-full p-2 border rounded"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 font-medium"
            >
              却下する
            </button>
          </form>
        </div>
      )}

      {/* 履歴表示 */}
      <div className="border-t pt-6">
        <h2 className="text-xl font-bold mb-4">処理履歴</h2>
        <div className="space-y-4">
          {request.histories.map((h) => (
            <div key={h.id} className="p-4 bg-gray-50 rounded border">
              <div className="flex justify-between text-sm text-gray-600">
                <span>アクション: <strong>{h.action}</strong></span>
                <span>担当者: <strong>{h.actor}</strong></span>
              </div>
              <p className="mt-2">{h.comment}</p>
              <span className="text-xs text-gray-400 mt-1 block">
                {new Date(h.createdAt).toLocaleString("ja-JP")}
              </span>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
