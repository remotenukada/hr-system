import Link from "next/link";
import { prisma } from "../../lib/prisma";

type Props = {
  searchParams: Promise<{
    q?: string;
  }>;
};

export default async function EmployeesPage({
  searchParams,
}: Props) {
  const { q } = await searchParams;

  // 💡 Prismaで「姓」または「名」に部分一致する社員を検索
  const employees = await prisma.employee.findMany({
    where: q
      ? {
          OR: [
            {
              lastName: {
                contains: q,
                mode: "insensitive", // 大文字小文字を区別しない
              },
            },
            {
              firstName: {
                contains: q,
                mode: "insensitive", // 大文字小文字を区別しない
              },
            },
          ],
        }
      : undefined,
    include: {
      department: true,
    },
    orderBy: {
      employeeNo: "asc", // 社員番号順に並べ替え
    },
  });

  return (
    <main className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          社員一覧
        </h1>
        {/* 新規追加ボタンもあると便利なので配置 */}
        <Link
          href="/employees/new"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
        >
          新規登録
        </Link>
      </div>

      {/* 検索フォーム */}
      <form className="mb-6 flex gap-2 items-center">
        <input
          name="q"
          defaultValue={q}
          placeholder="氏名で検索..."
          className="border p-2 rounded w-80"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
        >
          検索
        </button>

        {/* 💡 検索中の場合はクリアボタンを表示 */}
        {q && (
          <Link
            href="/employees"
            className="text-sm text-gray-500 hover:text-gray-700 hover:underline"
          >
            クリア
          </Link>
        )}
      </form>

      <table className="border-collapse border w-full">
        <thead>
          <tr className="bg-gray-50">
            <th className="border p-2 text-left w-32">社員番号</th>
            <th className="border p-2 text-left">氏名</th>
            <th className="border p-2 text-left">メール</th>
            <th className="border p-2 text-left">部署</th>
          </tr>
        </thead>

        <tbody>
          {employees.length === 0 ? (
            <tr>
              <td colSpan={4} className="border p-8 text-center text-gray-500">
                該当する社員が見つかりません。
              </td>
            </tr>
          ) : (
            employees.map((employee) => (
              <tr
                key={employee.id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="border p-2 font-mono">
                  {employee.employeeNo}
                </td>

                <td className="border p-2">
                  {/* 💡 壊れていた Link タグを綺麗に修復 */}
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
                  {employee.department?.name ?? (
                    <span className="text-gray-400">未所属</span>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </main>
  );
}
