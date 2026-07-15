import Link from "next/link";
import { prisma } from "../../lib/prisma";

export default async function DepartmentsPage() {
  const departments = await prisma.department.findMany({
    include: {
      _count: {
        select: {
          employees: true,
        },
      },
    },
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
            <th className="border p-2 text-left">
              部署名
            </th>
            <th className="border p-2 text-center w-24">
              所属人数
            </th>
          </tr>
        </thead>

        <tbody>
          {departments.map((department) => (
            <tr
              key={department.id}
              className="hover:bg-gray-50 transition-colors"
            >
              <td className="border p-2">
                {/* 💡 壊れていた Link タグを綺麗に修復 */}
                <Link
                  href={`/departments/${department.id}`}
                  className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
                >
                  {department.name}
                </Link>
              </td>

              <td className="border p-2 text-center text-gray-600">
                {department._count.employees}名
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
