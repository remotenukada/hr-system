import { prisma } from "../../lib/prisma";

export default async function DepartmentsPage() {
  const departments = await prisma.department.findMany();

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        部署一覧
      </h1>

      <table className="border-collapse border w-full">
        <thead>
          <tr>
            <th className="border p-2">
              部署名
            </th>
          </tr>
        </thead>

        <tbody>
          {departments.map((department) => (
            <tr key={department.id}>
              <td className="border p-2">
                {department.name}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}