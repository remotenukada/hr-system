import { notFound, redirect } from "next/navigation";
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
  });

  if (!employee) {
    notFound();
  }

  // Server Action: 削除処理
  async function deleteEmployee() {
    "use server";

    await prisma.employee.delete({
      where: {
        id,
      },
    });

    redirect("/employees");
  }

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        社員詳細
      </h1>

      <div className="space-y-2 mb-6">
        <p>社員番号: {employee.employeeNo}</p>
        <p>
          氏名: {employee.lastName} {employee.firstName}
        </p>
        <p>メール: {employee.email}</p>
      </div>

      {/* フォームタグで囲み、action に Server Action を指定します */}
      <form action={deleteEmployee}>
        <button
          type="submit"
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
        >
          削除
        </button>
      </form>
    </main>
  );
}