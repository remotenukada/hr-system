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

  const employee = await prisma.employee.findUnique({
    where: {
      id,
    },
  });

  if (!employee) {
    notFound();
  }

  const departments = await prisma.department.findMany({
    orderBy: {
      name: "asc",
    },
  });

  async function updateEmployee(formData: FormData) {
    "use server";

    const employeeNo = formData.get("employeeNo") as string;
    const lastName = formData.get("lastName") as string;
    const firstName = formData.get("firstName") as string;
    const email = formData.get("email") as string;
    const departmentId = formData.get("departmentId") as string;

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

    revalidatePath(`/employees/${id}`);
    revalidatePath("/employees");

    redirect(`/employees/${id}`);
  }

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        社員編集
      </h1>

      {/* 💡 開始タグを <form action={updateEmployee} ...> に修正、ラベルを追加してレイアウトを整備 */}
      <form action={updateEmployee} className="space-y-4 max-w-md">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            社員番号
          </label>
          <input
            name="employeeNo"
            defaultValue={employee.employeeNo}
            className="border p-2 w-full rounded"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              姓
            </label>
            <input
              name="lastName"
              defaultValue={employee.lastName}
              className="border p-2 w-full rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              名
            </label>
            <input
              name="firstName"
              defaultValue={employee.firstName}
              className="border p-2 w-full rounded"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            メールアドレス
          </label>
          <input
            name="email"
            type="email"
            defaultValue={employee.email}
            className="border p-2 w-full rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            所属部署
          </label>
          <select
            name="departmentId"
            defaultValue={employee.departmentId ?? ""}
            className="border p-2 w-full rounded"
          >
            <option value="">
              部署を選択（未所属）
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

        <div className="pt-2">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors w-full md:w-auto"
          >
            更新
          </button>
        </div>
      </form>
    </main>
  );
}
