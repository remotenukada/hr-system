// 💡 2. 先頭に Link をインポート
import Link from "next/link";
import { prisma } from "../../lib/prisma";

export default async function EmployeesPage() {
  // Prismaで社員データと一緒にリレーション先の department データも取得する
  const employees = await prisma.employee.findMany({
    include: {
      department: true,
    },
  });

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        社員一覧
      </h1>

      <table className="border-collapse border w-full">
        <thead>
          <tr className="bg-gray-50">
            <th className="border p-2 text-left">社員番号</th>
            <th className="border p-2 text-left">氏名</th>
            <th className="border p-2 text-left">メール</th>
            <th className="border p-2 text-left">部署</th>
          </tr>
        </thead>

        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id} className="hover:bg-gray-50 transition-colors">
              <td className="border p-2">
                {employee.employeeNo}
              </td>

              {/* 💡 3. 氏名列を詳細画面への Link に変更 */}
              <td className="border p-2">
                <Link
                  href={`/employees/${employee.id}`}
                  className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
                >
                  {employee.lastName} {employee.firstName}
                </Link>
              </td>

              <td className="border p-2">
                {employee.email}
              </td>

              <td className="border p-2">
                {employee.department?.name ?? "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}