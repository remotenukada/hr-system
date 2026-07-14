import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache"; // 💡 キャッシュ更新のために追加
import { prisma } from "../../../lib/prisma";

async function createDepartment(formData: FormData) {
  "use server";

  const name = formData.get("name") as string;

  await prisma.department.create({
    data: {
      name,
    },
  });

  // 💡 部署一覧画面のキャッシュをクリアして、新しい部署が即座に表示されるようにする
  revalidatePath("/departments");

  redirect("/departments");
}

export default function NewDepartmentPage() {
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        部署登録
      </h1>

      {/* 💡 フォームの開始タグを正しく記述し、actionにServer Actionを渡します */}
      <form action={createDepartment} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            部署名
          </label>
          <input
            name="name"
            className="border p-2 w-full rounded"
            placeholder="部署名を入力"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors mt-2"
        >
          登録
        </button>
      </form>
    </main>
  );
}