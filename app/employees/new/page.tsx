import { redirect } from "next/navigation";
import { prisma } from "../../../lib/prisma";

async function createEmployee(formData: FormData) {
  "use server";

  const employeeNo = formData.get("employeeNo") as string;
  const lastName = formData.get("lastName") as string;
  const firstName = formData.get("firstName") as string;
  const email = formData.get("email") as string;

  await prisma.employee.create({
    data: {
      employeeNo,
      lastName,
      firstName,
      email,
    },
  });

  redirect("/employees");
}

export default function NewEmployeePage() {
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        社員登録
      </h1>

      <form action={createEmployee}>
        <input
          name="employeeNo"
          className="border p-2 w-full"
          placeholder="社員番号"
          required
        />

        <input
          name="lastName"
          className="border p-2 w-full"
          placeholder="姓"
          required
        />

        <input
          name="firstName"
          className="border p-2 w-full"
          placeholder="名"
          required
        />

        <input
          name="email"
          type="email"
          className="border p-2 w-full"
          placeholder="メールアドレス"
          required
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          登録
        </button>
      </form>
    </main>
  );
}
