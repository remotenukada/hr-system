import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
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

  // 社員データの取得
  const employee = await prisma.employee.findUnique({
    where: {
      id,
    },
  });

  if (!employee) {
    notFound();
  }

  // 💡 Step1: 部署一覧を名前の昇順で取得
  const departments = await prisma.department.findMany({
    orderBy: {
      name: "asc",
    },
  });

  // Server Action: 社員情報の更新処理
  async function updateEmployee(formData: FormData) {
    "use server";

    // 💡 Step2: フォームから各種入力値と departmentId を取得
    const employeeNo = formData.get("employeeNo") as string;
    const lastName = formData.get("lastName") as string;
    const firstName = formData.get("firstName") as string;
    const email = formData.get("email") as string;
    const departmentId = formData.get("departmentId") as string;

    // 💡 Step2: Prisma の update に departmentId を追加
    await prisma.employee.update({
      where: {
        id,
      },
      data: {
        employeeNo,
        lastName,
        firstName,
        email,
        departmentId: departmentId || null,
      },
    });

    // 変更があったページのキャッシュをクリアする
    revalidatePath(`/employees/${id}`);
    revalidatePath("/employees");

    redirect(`/employees/${id}`);
  }

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        社員編集
      </h1>

      <form action={updateEmployee} className="space-y-4 max-w-md">
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

        {/* 💡 Step3: 画面に部署プルダウンを追加（現在の所属を defaultValue にセット） */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            所属部署
          </label>
          <select
            name="departmentId"
            defaultValue={employee.departmentId ?? ""}
            className="border p-2 w-full rounded bg-white"
          >
            <option value="">
              部署を選択
            </option>
            {departments.map((department) => (
              <option
                key={department.id}
                value={department.id}
              >
                {department.name}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors block mt-6"
        >
          更新
        </button>
      </form>
    </main>
  );
}