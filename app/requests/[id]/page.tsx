import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { prisma } from "../../../lib/prisma";
import DeleteButton from "./DeleteButton";

type Props = {
  params: Promise<{ id: string }>;
};

async function deleteRequestAction(id: string) {
  "use server";
  await prisma.employeeRequest.delete({ where: { id } });
  revalidatePath("/requests");
  redirect("/requests");
}

export default async function RequestDetailPage({ params }: Props) {
  const { id } = await params;

  const request = await prisma.employeeRequest.findUnique({
    where: { id },
    include: { 
      employee: true,
      histories: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!request) {
    notFound();
  }

  async function approveAction(formData: FormData) {
    "use server";
    const approvalComment = formData.get("approvalComment")?.toString() || null;
    
    await prisma.employeeRequest.update({
      where: { id },
      data: { 
        status: "APPROVED",
        approvalComment,
        rejectionReason: null,
        histories: {
          create: {
            action: "APPROVED",
            comment: approvalComment,
            actor: "管理者", // 🔽 担当者を記録
          },
        },
      },
    });
    revalidatePath(`/requests/${id}`);
    redirect(`/requests/${id}`);
  }

  async function rejectAction(formData: FormData) {
    "use server";
    const rejectionReason = formData.get("rejectionReason")?.toString() || null;

    await prisma.employeeRequest.update({
      where: { id },
      data: { 
        status: "REJECTED",
        rejectionReason,
        approvalComment: null,
        histories: {
          create: {
            action: "REJECTED",
            comment: rejectionReason,
            actor: "管理者", // 🔽 担当者を記録
          },
        },
      },
    });
    revalidatePath(`/requests/${id}`);
    redirect(`/requests/${id}`);
  }

  return (
    <main className="p-8 max-w-2xl mx-auto space-y-6">
      <div className="bg-white border rounded-xl p-6 shadow-sm space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${
              request.status === 'APPROVED' ? 'bg-green-50 text-green-700 border-green-200' :
              request.status === 'REJECTED' ? 'bg-rose-50 text-rose-700 border-rose-200' :
              'bg-amber-50 text-amber-700 border-amber-200'
            }`}>
              {request.status}
            </span>
            <h1 className="text-2xl font-bold text-gray-800 mt-3">{request.title}</h1>
          </div>
          <Link href={`/requests/${id}/edit`} className="text-xs bg-gray-100 border hover:bg-gray-200 text-gray-600 px-3 py-1.5 rounded-lg transition-colors">
            編集する
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-2 text-sm border-t">
          <div>
            <span className="text-gray-400 block text-xs">申請種別</span>
            <span className="font-medium text-gray-800">{request.type}</span>
          </div>
          <div>
            <span className="text-gray-400 block text-xs">対象社員</span>
            <span className="font-medium text-gray-800">
              {request.employee ? `${request.employee.lastName} ${request.employee.firstName}` : "未割り当て"}
            </span>
          </div>
        </div>

        {request.comment && (
          <div className="bg-gray-50 p-3 rounded-lg border">
            <span className="text-gray-400 block text-xs mb-1">申請コメント</span>
            <p className="text-gray-700 whitespace-pre-wrap text-sm">{request.comment}</p>
          </div>
        )}
      </div>

      {request.status === "PENDING" && (
        <div className="bg-gray-50 border p-4 rounded-xl space-y-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-700">この申請を審査する</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <form action={approveAction} className="bg-white p-3 border rounded-lg space-y-2">
              <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded border">承認</span>
              <textarea
                name="approvalComment"
                placeholder="承認コメント（任意）"
                className="w-full text-xs border rounded p-1.5 text-gray-900"
              />
              <button type="submit" className="w-full bg-green-600 text-white font-medium py-1.5 rounded text-xs">
                承認する
              </button>
            </form>

            <form action={rejectAction} className="bg-white p-3 border rounded-lg space-y-2">
              <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded border">却下</span>
              <textarea
                name="rejectionReason"
                placeholder="却下理由（任意）"
                className="w-full text-xs border rounded p-1.5 text-gray-900"
              />
              <button type="submit" className="w-full bg-rose-600 text-white font-medium py-1.5 rounded text-xs">
                却下する
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 🔽 履歴表示領域（actor対応版） */}
      <div className="bg-white border rounded-xl p-6 shadow-sm space-y-4">
        <h2 className="text-lg font-bold text-gray-800 border-b pb-2">申請履歴アクティビティ</h2>
        
        {request.histories.length === 0 ? (
          <p className="text-sm text-gray-400 italic">履歴データがありません。</p>
        ) : (
          <div className="relative pl-6 border-l-2 border-gray-200 space-y-6 ml-2 pt-2">
            {request.histories.map((history) => (
              <div key={history.id} className="relative">
                <span className="absolute -left-[31px] top-1 bg-white p-1 rounded-full border-2 border-gray-300 block w-3 h-3"></span>
                
                <div className="flex flex-col space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                      history.action === 'APPROVED' ? 'bg-green-50 text-green-700 border-green-200' :
                      history.action === 'REJECTED' ? 'bg-rose-50 text-rose-700 border-rose-200' :
                      history.action === 'CREATED' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                      'bg-gray-50 text-gray-700 border-gray-200'
                    }`}>
                      {history.action}
                    </span>
                    {history.actor && (
                      <span className="text-xs font-semibold text-gray-600 bg-gray-100 px-1.5 py-0.5 rounded">
                        担当者: {history.actor}
                      </span>
                    )}
                    <span className="text-xs text-gray-400 font-mono">
                      {new Date(history.createdAt).toLocaleString("ja-JP")}
                    </span>
                  </div>
                  {history.comment && (
                    <p className="text-sm text-gray-600 bg-gray-50 p-2.5 rounded-lg border border-gray-100 mt-1 whitespace-pre-wrap">
                      {history.comment}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="pt-4 border-t flex justify-between items-center">
        <Link href="/requests" className="text-sm text-blue-600 hover:underline">
          ← 一覧に戻る
        </Link>
        <form action={deleteRequestAction.bind(null, id)}>
          <DeleteButton />
        </form>
      </div>
    </main>
  );
}
