import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { prisma } from "../../../lib/prisma";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EmployeeDetailPage({
  params,
}: Props) {
  const { id } = await params;

  const employee = await prisma.employee.findUnique({
    where: {
      id,
    },
    include: {
      department: true,
    },
  });

  if (!employee) {
    notFound();
  }

  async function deleteEmployee() {
    "use server";

    await prisma.employee.delete({
      where: {
        id,
      },
    });

    revalidatePath("/employees");
    redirect("/employees");
  }

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        社員詳細
      </h1>

      <div className="space-y-2 mb-6 text-lg">
        <p><span className="font-medium text-gray-500">社員番号:</span> {employee.employeeNo}</p>
        <p>
          <span className="font-medium text-gray-500">氏名:</span> {employee.lastName} {employee.firstName}
        </p>
        <p><span className="font-medium text-gray-500">メール:</span> {employee.email}</p>
        <p>
          <span className="font-medium text-gray-500">所属部署:</span> {employee.department?.name ?? "-"}
        </p>
      </div>

      <div className="flex gap-4 items-center">
        {/* 💡 編集ボタンを正しい Link コンポーネントの形に修正 */}
        <Link
          href={`/employees/${employee.id}/edit`}
          className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors"
        >
          編集
        </Link>

        {/* 💡 削除フォームを正しい <form action={...}> の形に修正 */}
        <form action={deleteEmployee}>
          <button
            type="submit"
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
          >
            削除
          </button>
        </form>
      </div>
    </main>
  );
}
