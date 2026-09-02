import BackLink from "@/components/BackLink";
import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { prisma } from "../../../../lib/prisma";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditRequestPage({ params }: Props) {
  const { id } = await params;

  const [request, employees] = await Promise.all([
    prisma.employeeRequest.findUnique({ where: { id } }),
    prisma.employee.findMany({ orderBy: { employeeNo: "asc" } }),
  ]);

  if (!request) {
    notFound();
  }

  async function updateRequest(formData: FormData) {
    "use server";

    const title = formData.get("title")?.toString() || "";
    const comment = formData.get("comment")?.toString() || null;
    const type = formData.get("type")?.toString() as "ONBOARDING" | "DEPARTMENT_CHANGE" | "PAID_LEAVE" | "OTHER";


    const employeeId = formData.get("employeeId")?.toString() || null;

    if (!title || !type) {
      throw new Error("タイトルと申請種別は必須です。");
    }

    await prisma.employeeRequest.update({
      where: { id },
      data: {
        title,
        comment,
        type,
        employeeId: employeeId || null,
        // 🔽 履歴機能の追加
        histories: {
          create: {
            action: "UPDATED",
          },
        },
      },
    });

    revalidatePath(`/requests/${id}`);
    redirect(`/requests/${id}`);
  }

  return (
    <main className="p-8 max-w-xl mx-auto space-y-6">
      <BackLink href="/requests" label="申請一覧へ戻る" />
      <div>
        <h1 className="text-2xl font-bold text-gray-800">申請内容の編集</h1>
        <p className="text-sm text-gray-500 mt-1">既存の申請内容を修正します。</p>
      </div>

      <form action={updateRequest} className="bg-white border rounded-xl p-6 shadow-sm space-y-4">
        <div className="space-y-1">
          <label htmlFor="title" className="text-sm font-semibold text-gray-700 block">申請タイトル</label>
          <input
            id="title"
            name="title"
            type="text"
            required
            defaultValue={request.title}
            className="w-full border rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="type" className="text-sm font-semibold text-gray-700 block">申請種別</label>
          <select
            id="type"
            name="type"
            required
            defaultValue={request.type}
            className="w-full border rounded-lg p-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
          >
            <option value="ONBOARDING">入社申請</option>
            <option value="DEPARTMENT_CHANGE">部署変更申請</option>
            <option value="OTHER">その他</option>
          </select>
        </div>

        <div className="space-y-1">
          <label htmlFor="employeeId" className="text-sm font-semibold text-gray-700 block">対象社員</label>
          <select
            id="employeeId"
            name="employeeId"
            defaultValue={request.employeeId || ""}
            className="w-full border rounded-lg p-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
          >
            <option value="">選択しない</option>
            {employees.map((emp) => (
              <option key={emp.id} value={emp.id}>
                {emp.lastName} {emp.firstName} ({emp.employeeNo})
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1">
          <label htmlFor="comment" className="text-sm font-semibold text-gray-700 block">申請理由・コメント</label>
          <textarea
            id="comment"
            name="comment"
            rows={4}
            defaultValue={request.comment || ""}
            className="w-full border rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
          />
        </div>

        <div className="pt-4 flex justify-between items-center">
          <Link href={`/requests/${id}`} className="text-sm text-gray-600 hover:underline">
            キャンセル
          </Link>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg text-sm transition-colors shadow-sm"
          >
            変更を保存する
          </button>
        </div>
      </form>
    </main>
  );
}
