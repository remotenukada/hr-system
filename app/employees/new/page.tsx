import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "../../../lib/prisma";

// ==========================================
// 1. Server Action (データの登録処理)
// ==========================================
async function createEmployee(formData: FormData) {
  "use server";

  // Step2-1: フォームから各種入力値を取得
  const employeeNo = formData.get("employeeNo") as string;
  const lastName = formData.get("lastName") as string;
  const firstName = formData.get("firstName") as string;
  const email = formData.get("email") as string;
  const departmentId = formData.get("departmentId") as string;

  // Step2-2: Prisma を使ってデータベースに保存
  await prisma.employee.create({
    data: {
      employeeNo,
      lastName,
      firstName,
      email,
      // 選択されていない場合は null を許可する構造
      departmentId: departmentId || null,
    },
  });

  // 社員一覧画面のキャッシュをクリアして最新データを反映させる
  revalidatePath("/employees");

  // 社員一覧へリダイレクト
  redirect("/employees");
}

// ==========================================
// 2. Page Component (画面の表示)
// ==========================================
export default async function NewEmployeePage() {
  // Step1-2: データベースから部署一覧を名前の昇順で取得
  const departments = await prisma.department.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        社員登録
      </h1>

      <form action={createEmployee} className="space-y-4 max-w-md">
        <div>
          <input
            name="employeeNo"
            className="border p-2 w-full rounded"
            placeholder="社員番号"
            required
          />
        </div>

        <div>
          <input
            name="lastName"
            className="border p-2 w-full rounded"
            placeholder="姓"
            required
          />
        </div>

        <div>
          <input
            name="firstName"
            className="border p-2 w-full rounded"
            placeholder="名"
            required
          />
        </div>

        <div>
          <input
            name="email"
            type="email"
            className="border p-2 w-full rounded"
            placeholder="メールアドレス"
            required
          />
        </div>

        {/* Step1-3: 部署選択セレクトボックス */}
        <div>
          <select
            name="departmentId"
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
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors block mt-4"
        >
          登録
        </button>
      </form>
    </main>
  );
}