import { notFound, redirect } from "next/navigation";
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

    redirect(`/employees/${id}`);
  }

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        社員編集
      </h1>

      <form action={updateEmployee} className="space-y-4">
        <input
          name="employeeNo"
          defaultValue={employee.employeeNo}
          className="border p-2 w-full"
          placeholder="社員番号"
          required
        />

        <input
          name="lastName"
          defaultValue={employee.lastName}
          className="border p-2 w-full"
          placeholder="姓"
          required
        />

        <input
          name="firstName"
          defaultValue={employee.firstName}
          className="border p-2 w-full"
          placeholder="名"
          required
        />

        <input
          name="email"
          type="email"
          defaultValue={employee.email}
          className="border p-2 w-full"
          placeholder="メールアドレス"
          required
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          更新
        </button>
      </form>
    </main>
  );
}
