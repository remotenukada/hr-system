import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import Link from "next/link";

async function createRequest(formData: FormData) {
  "use server";

  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const title = String(formData.get("title") || "");
  const commentValue = String(formData.get("comment") || "");
  const typeValue = String(formData.get("type") || "");
  const employeeIdValue = String(formData.get("employeeId") || "");

  if (!title) {
    throw new Error("タイトルは必須です");
  }

  if (
    typeValue !== "ONBOARDING" &&
    typeValue !== "DEPARTMENT_CHANGE" &&
    typeValue !== "OTHER"
  ) {
    throw new Error("申請種別が不正です");
  }

  await prisma.employeeRequest.create({
    data: {
      title,
      comment: commentValue || null,
      type: typeValue,
      userId: session.user.id,
      employeeId: employeeIdValue || null,

      histories: {
        create: {
          action: "CREATED",
          actor: session.user.name || "unknown",
          comment: "申請を作成しました",
        },
      },
    },
  });

  revalidatePath("/requests");
  revalidatePath("/requests/my");

  redirect("/requests/my");
}

export default async function NewRequestPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const employees = await prisma.employee.findMany({
    orderBy: [
      {
        lastName: "asc",
      },
      {
        firstName: "asc",
      },
    ],
  });

  return (
    <main className="p-8 max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">新規申請作成</h1>
        <p className="mt-2 text-gray-600">
          各種申請を作成します。
        </p>
      </div>

      <form action={createRequest} className="space-y-6">
        <div>
          <label className="mb-1 block font-medium">
            タイトル
          </label>
          <input
            name="title"
            className="w-full rounded border p-2"
            placeholder="例：入社申請、部署変更申請など"
            required
          />
        </div>

        <div>
          <label className="mb-1 block font-medium">
            申請種別
          </label>
          <select
            name="type"
            className="w-full rounded border bg-white p-2"
            required
          >
            <option value="ONBOARDING">入社</option>
            <option value="DEPARTMENT_CHANGE">部署変更</option>
            <option value="OTHER">その他</option>
          </select>
        </div>

        <div>
          <label className="mb-1 block font-medium">
            対象社員
          </label>
          <select
            name="employeeId"
            className="w-full rounded border bg-white p-2"
          >
            <option value="">対象社員なし</option>

            {employees.map((employee) => (
              <option key={employee.id} value={employee.id}>
                {employee.lastName} {employee.firstName}（{employee.employeeNo}）
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1 block font-medium">
            コメント
          </label>
          <textarea
            name="comment"
            rows={5}
            className="w-full rounded border p-2"
            placeholder="申請内容の補足を入力してください"
          />
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 font-medium"
          >
            申請を作成
          </button>

          <Link
            href="/requests/my"
            className="rounded border px-4 py-2 hover:bg-gray-50"
          >
            キャンセル
          </Link>
        </div>
      </form>
    </main>
  );
}
