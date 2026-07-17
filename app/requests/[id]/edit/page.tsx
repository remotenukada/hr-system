import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { prisma } from "../../../../lib/prisma";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function RequestEditPage({ params }: Props) {
  const { id } = await params;

  // 1. 編集対象の申請を取得
  const request = await prisma.employeeRequest.findUnique({
    where: { id },
  });

  if (!request) {
    notFound();
  }

  // 2. 選択肢用の社員一覧を取得
  const employees = await prisma.employee.findMany({
    orderBy: {
      employeeNo: "asc",
    },
  });

  // 3. 更新処理 (Server Action)
  async function updateRequest(formData: FormData) {
    "use server";

    const title = formData.get("title") as string;
    const type = formData.get("type") as string;
    const employeeId = formData.get("employeeId") as string;

    await prisma.employeeRequest.update({
      where: { id },
      data: {
        title,
        type,
        employeeId: employeeId || null,
      },
    });

    revalidatePath("/requests");
    revalidatePath(`/requests/${id}`);

    redirect(`/requests/${id}`);
  }

  return (
    <main className="p-8 max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">申請の編集</h1>
        <p className="text-sm text-gray-500 mt-1">申請内容を変更して更新してください。</p>
      </div>

      <div className="bg-white border rounded-xl p-6 shadow-sm">
        <form action={updateRequest} className="space-y-5">
          {/* タイトル入力 */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              タイトル
            </label>
            <input
              name="title"
              type="text"
              required
              defaultValue={request.title}
              className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
            />
          </div>

          {/* 申請種別選択 */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              申請種別
            </label>
            <select
              name="type"
              defaultValue={request.type}
              className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
            >
              <option value="ONBOARDING">入社申請</option>
              <option value="DEPARTMENT_CHANGE">部署変更申請</option>
              <option value="OTHER">その他</option>
            </select>
          </div>

          {/* 対象社員選択 */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              対象社員
            </label>
            <select
              name="employeeId"
              defaultValue={request.employeeId ?? ""}
              className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
            >
              <option value="">-- 社員を選択しない --</option>
              {employees.map((emp) => (
                <option key={emp.id} value={emp.id}>
                  [{emp.employeeNo}] {emp.lastName} {emp.firstName}
                </option>
              ))}
            </select>
          </div>

          {/* ボタンエリア */}
          <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2.5 rounded-lg transition-colors text-sm shadow-sm"
            >
              更新する
            </button>
            <Link
              href={`/requests/${id}`}
              className="border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 px-5 py-2.5 rounded-lg transition-colors text-sm font-medium shadow-sm"
            >
              キャンセル
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
