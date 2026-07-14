import { prisma } from "../../lib/prisma";

export default async function EmployeesPage() {
  // 💡 Prismaで社員データと一緒にリレーション先の department データも取得する
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
            {/* 💡 テーブルヘッダーに「部署」列を追加 */}
            <th className="border p-2 text-left">部署</th>
          </tr>
        </thead>

        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id} className="hover:bg-gray-50 transition-colors">
              <td className="border p-2">
                {employee.employeeNo}
              </td>

              <td className="border p-2">
                {employee.lastName} {employee.firstName}
              </td>

              <td className="border p-2">
                {employee.email}
              </td>

              {/* 💡 テーブルデータに「部署名」を追加（未設定なら "-" を表示） */}
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