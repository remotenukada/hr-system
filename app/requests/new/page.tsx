import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { prisma } from "../../../lib/prisma";

type RequestTypeValue = "ONBOARDING" | "DEPARTMENT_CHANGE" | "OTHER";

async function createRequest(formData: FormData) {
  "use server";

  const title = formData.get("title") as string;
  const type = formData.get("type") as RequestTypeValue;
  const employeeId = formData.get("employeeId") as string;

  await prisma.employeeRequest.create({
    data: {
      title,
      type,
      employeeId: employeeId || null,
    },
  });

  revalidatePath("/requests");
  redirect("/requests");
}

export default async function NewRequestPage() {
  const employees = await prisma.employee.findMany({
    orderBy: {
      employeeNo: "asc",
    },
  });

  return (
    <main className="p-8 max-w-2xl mx-auto">
      {/* ページヘッダー */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">申請登録</h1>
        <p className="text-sm text-gray-500 mt-1">各種申請をシステムへ登録します。</p>
      </div>

      {/* フォームエリア */}
      <div className="bg-white border rounded-xl p-6 shadow-sm">
        {/* 💡 削れていたform開始タグをしっかり復元 */}
        <form action={createRequest} className="space-y-6">
          
          {/* 申請タイトル */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              申請タイトル
            </label>
            <input
              name="title"
              type="text"
              className="border border-gray-300 p-2.5 w-full rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm transition-all"
              placeholder="例: [4月入社] 山田 太郎の入社申請"
              required
            />
          </div>

          {/* 申請種別 */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              申請種別
            </label>
            <select
              name="type"
              className="border border-gray-300 p-2.5 w-full rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm transition-all"
              required
            >
              <option value="ONBOARDING">入社申請</option>
              <option value="DEPARTMENT_CHANGE">部署変更申請</option>
              <option value="OTHER">その他</option>
            </select>
          </div>

          {/* 対象社員 */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              対象社員
            </label>
            <select
              name="employeeId"
              className="border border-gray-300 p-2.5 w-full rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm transition-all"
            >
              <option value="">対象社員を選択（新規入社などの場合は未選択でOK）</option>
              {employees.map((employee) => (
                <option key={employee.id} value={employee.id}>
                  {employee.employeeNo} — {employee.lastName} {employee.firstName}
                </option>
              ))}
            </select>
          </div>

          {/* アクションボタン */}
          <div className="flex items-center justify-end gap-4 pt-4 border-t border-gray-100">
            <Link
              href="/requests"
              className="text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors"
            >
              キャンセル
            </Link>
            <button
              type="submit"
              className="bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 font-medium transition-colors shadow-sm text-sm"
            >
              登録する
            </button>
          </div>

        </form>
      </div>
    </main>
  );
}
