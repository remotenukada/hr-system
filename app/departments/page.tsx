// 💡 1. 先頭に Link をインポート
import Link from "next/link";
import { prisma } from "../../lib/prisma";

export default async function DepartmentsPage() {
  const departments = await prisma.department.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        部署一覧
      </h1>

      <table className="border-collapse border w-full max-w-xl">
        <thead>
          <tr className="bg-gray-50">
            <th className="border p-2 text-left">部署名</th>
          </tr>
        </thead>

        <tbody>
          {departments.map((department) => (
            <tr key={department.id} className="hover:bg-gray-50 transition-colors">
              {/* 💡 2. 部署名を編集画面（/departments/[id]/edit）への Link に変更 */}
              <td className="border p-2">
                <Link
                  href={`/departments/${department.id}/edit`}
                  className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
                >
                  {department.name}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}