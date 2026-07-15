import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "../../../lib/prisma";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function DepartmentDetailPage({
  params,
}: Props) {
  const { id } = await params;

  // Prismaで部署データと一緒に所属する社員一覧も取得
  const department = await prisma.department.findUnique({
    where: {
      id,
    },
    include: {
      employees: true,
    },
  });

  if (!department) {
    notFound();
  }

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        部署詳細
      </h1>

      <div className="mb-6 bg-gray-50 p-4 rounded border max-w-md">
        <p className="text-lg">
          <span className="font-medium text-gray-500">部署名:</span> {department.name}
        </p>
      </div>

      <h2 className="text-xl font-semibold mb-3">
        所属社員一覧
      </h2>

      {department.employees.length === 0 ? (
        <p className="text-gray-500 mb-6">- 所属している社員はいません -</p>
      ) : (
        <ul className="list-disc pl-6 space-y-1 mb-6 text-gray-700">
          {department.employees.map((employee) => (
            <li key={employee.id}>
              {/* 💡 リンク化：社員名をクリックすると社員詳細へジャンプ */}
              <Link
                href={`/employees/${employee.id}`}
                className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
              >
                {employee.lastName} {employee.firstName} ({employee.employeeNo})
              </Link>
            </li>
          ))}
        </ul>
      )}

      {/* 導線コントロールエリア */}
      <div className="flex gap-4 items-center pt-4 border-t max-w-md">
        <Link
          href="/departments"
          className="text-sm text-gray-600 hover:underline"
        >
          ← 部署一覧へ戻る
        </Link>
        <Link
          href={`/departments/${department.id}/edit`}
          className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors ml-auto"
        >
          この部署を編集
        </Link>
      </div>
    </main>
  );
}
