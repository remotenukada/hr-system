import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "../../../../lib/prisma";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function DepartmentEditPage({
  params,
}: Props) {
  const { id } = await params;

  const department = await prisma.department.findUnique({
    where: {
      id,
    },
  });

  if (!department) {
    notFound();
  }

  async function updateDepartment(formData: FormData) {
    "use server";

    const name = formData.get("name") as string;

    await prisma.department.update({
      where: {
        id,
      },
      data: {
        name,
      },
    });

    revalidatePath("/departments");
    revalidatePath("/employees");

    redirect("/departments");
  }

  async function deleteDepartment() {
    "use server";

    await prisma.department.delete({
      where: {
        id,
      },
    });

    revalidatePath("/departments");
    revalidatePath("/employees");

    redirect("/departments");
  }

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        部署編集
      </h1>

      {/* 💡 開始タグを <form action={updateDepartment} ...> に修正 */}
      <form action={updateDepartment} className="space-y-4 max-w-md">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            部署名
          </label>
          <input
            name="name"
            defaultValue={department.name}
            className="border p-2 w-full rounded"
            placeholder="部署名"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors block mt-6"
        >
          更新
        </button>
      </form>

      {/* 💡 開始タグを <form action={deleteDepartment} ...> に修正 */}
      <form action={deleteDepartment} className="max-w-md">
        <button
          type="submit"
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors mt-4"
        >
          削除
        </button>
      </form>
    </main>
  );
}
