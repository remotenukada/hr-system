import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

async function createRequest(formData: FormData) {
  "use server";

  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const title = String(formData.get("title") || "");
  const comment = String(formData.get("comment") || "");
  const type = String(formData.get("type") || "");

  await prisma.employeeRequest.create({
    data: {
      title,
      comment,
      type: type as "ONBOARDING" | "DEPARTMENT_CHANGE" | "OTHER",

      userId: session.user.id,

      histories: {
        create: {
          action: "CREATED",
          actor: session.user.name || "unknown",
          comment: "申請を作成しました",
        },
      },
    },
  });

  revalidatePath("/requests/my");

  redirect("/requests/my");
}

export default async function NewRequestPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <main className="p-8 max-w-2xl mx-auto">
      <h1 className="mb-6 text-3xl font-bold">
        新規申請作成
      </h1>

      <form action={createRequest} className="space-y-4">
        <div>
          <label className="mb-1 block font-medium">タイトル</label>
          <input
            name="title"
            placeholder="タイトルを入力"
            className="w-full rounded border p-2"
            required
          />
        </div>

        <div>
          <label className="mb-1 block font-medium">申請種別</label>
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
          <label className="mb-1 block font-medium">コメント</label>
          <textarea
            name="comment"
            placeholder="コメントを入力"
            className="w-full rounded border p-2"
            rows={5}
          />
        </div>

        <button
          type="submit"
          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 font-medium"
        >
          申請を作成
        </button>
      </form>
    </main>
  );
}
