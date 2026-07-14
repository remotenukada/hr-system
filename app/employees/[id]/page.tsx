import { notFound } from "next/navigation";
import { prisma } from "../../../lib/prisma";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EmployeeDetailPage({
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

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        社員詳細
      </h1>

      <div className="space-y-2">
        <p>社員番号: {employee.employeeNo}</p>
        <p>
          氏名: {employee.lastName} {employee.firstName}
        </p>
        <p>メール: {employee.email}</p>
      </div>
    </main>
  );
}