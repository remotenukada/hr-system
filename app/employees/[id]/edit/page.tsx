import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache"; // ← 追加
import { prisma } from "../../../../lib/prisma";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EmployeeEditPage({
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

  async function updateEmployee(formData: FormData) {
    "use server";

    const employeeNo = formData.get("employeeNo") as string;
    const lastName = formData.get("lastName") as string;
    const firstName = formData.get("firstName") as string;
    const email = formData.get("email") as string;

    await prisma.employee.update({
      where: {
        id,
      },
      data: {
        employeeNo,
        lastName,
        firstName,
        email,
      },
    });

    // 💡 変更があったページのキャッシュをクリアする
    revalidatePath(`/employees/${id}`);
    revalidatePath("/employees"); // 一覧画面もあればこちらもクリアしておくと確実です

    redirect(`/employees/${id}`);
  }

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        社員編集
      </h1>

      <form action={updateEmployee} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">社員番号</label>
          <input
            name="employeeNo"
            defaultValue={employee.employeeNo}
            className="border p-2 w-full rounded"
            placeholder="社員番号"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">姓</label>
          <input
            name="lastName"
            defaultValue={employee.lastName}
            className="border p-2 w-full rounded"
            placeholder="姓"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">名</label>
          <input
            name="firstName"
            defaultValue={employee.firstName}
            className="border p-2 w-full rounded"
            placeholder="名"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">メールアドレス</label>
          <input
            name="email"
            type="email"
            defaultValue={employee.email}
            className="border p-2 w-full rounded"
            placeholder="メールアドレス"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
        >
          更新
        </button>
      </form>
    </main>
  );
}