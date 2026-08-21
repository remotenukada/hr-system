import BackLink from "@/components/BackLink";
import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "../../../../lib/prisma";

type Props = {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    error?: string;
  }>;
};

export default async function DepartmentEditPage({
  params,
  searchParams,
}: Props) {
  const { id } = await params;
  const { error } = await searchParams;

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

    const employeeCount = await prisma.employee.count({
      where: {
        departmentId: id,
      },
    });

    // 💡 所属社員がいる場合は、クエリパラメータを付与して編集画面にリダイレクト
    if (employeeCount > 0) {
      redirect(`/departments/${id}/edit?error=hasEmployees`);
    }

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
      <BackLink href="/departments" label="部署一覧へ戻る" />
      <h1 className="text-3xl font-bold mb-6">
        部署編集
      </h1>

      {/* 💡 ユーザー体験を高めるエラーアラート表示 */}
      {error === "hasEmployees" && (
        <div className="mb-4 rounded border border-red-300 bg-red-50 p-3 text-red-700 max-w-md">
          所属社員がいるため、この部署は削除できません。
        </div>
      )}

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
