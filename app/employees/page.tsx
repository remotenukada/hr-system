import { prisma } from "../../lib/prisma";

export default async function EmployeesPage() {
  const employees = await prisma.employee.findMany();

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        社員一覧
      </h1>

      <table className="border-collapse border w-full">
        <thead>
          <tr>
            <th className="border p-2">社員番号</th>
            <th className="border p-2">氏名</th>
            <th className="border p-2">メール</th>
          </tr>
        </thead>

        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td className="border p-2">
                {employee.employeeNo}
              </td>

              <td className="border p-2">
                {employee.lastName} {employee.firstName}
              </td>

              <td className="border p-2">
                {employee.email}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}