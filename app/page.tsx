import Link from "next/link";
import { prisma } from "../lib/prisma";

export default async function HomePage() {
  const employeeCount = await prisma.employee.count();
  const departmentCount = await prisma.department.count();

  // 1. 最近登録された社員（最新5名）を取得
  // 💡 もしエラー（P2021等）が出る場合は、createdAtを id: "desc" に差し替えてください
  const recentEmployees = await prisma.employee.findMany({
    take: 5,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      department: true,
    },
  });

  // 2. 部署一覧と所属人数を取得
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

  // 3. 人数の多い順にソート（ランキング用）
  const departmentRanking = [...departments].sort(
    (a, b) => b._count.employees - a._count.employees
  );

  return (
    <main className="p-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">
        社内管理システム
      </h1>

      {/* 統計カードエリア */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="rounded-xl bg-blue-50 p-6 border border-blue-100">
          <h2 className="text-lg font-semibold text-blue-700">
            社員数
          </h2>
          <p className="text-4xl font-bold mt-2 text-blue-900">
            {employeeCount}名
          </p>
        </div>

        <div className="rounded-xl bg-green-50 p-6 border border-green-100">
          <h2 className="text-lg font-semibold text-green-700">
            部署数
          </h2>
          <p className="text-4xl font-bold mt-2 text-green-900">
            {departmentCount}部署
          </p>
        </div>
      </div>

      {/* メニュー導線エリア */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Link
          href="/employees"
          className="block p-6 bg-white border rounded-xl hover:shadow-md hover:border-blue-500 transition-all group"
        >
          <h2 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
            社員管理 →
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            社員の登録、編集、詳細の確認、およびキーワードによる一括検索を行います。
          </p>
        </Link>

        <Link
          href="/departments"
          className="block p-6 bg-white border rounded-xl hover:shadow-md hover:border-green-500 transition-all group"
        >
          <h2 className="text-xl font-semibold text-gray-900 group-hover:text-green-600 transition-colors">
            部署管理 →
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            新しい部署の立ち上げ、既存組織の名称変更、および所属人数の管理を行います。
          </p>
        </Link>
      </div>

      {/* 部署別人数ランキング */}
      <div className="bg-white border rounded-xl p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          部署別人数ランキング
        </h2>

        {departmentRanking.length === 0 ? (
          <p className="text-sm text-gray-500 py-2">
            まだ部署が登録されていません
          </p>
        ) : (
          <div className="divide-y border-t border-b">
            {departmentRanking.map((department, index) => (
              <Link
                key={department.id}
                href={`/departments/${department.id}`}
                className="flex justify-between items-center py-3 px-2 hover:bg-gray-50 transition-colors group"
              >
                <div className="flex items-center">
                  <span className="text-sm text-gray-500 mr-4 font-semibold w-8">
                    {index + 1}位
                  </span>
                  <span className="font-medium text-blue-600 group-hover:underline">
                    {department.name}
                  </span>
                </div>

                <span className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded">
                  {department._count.employees}名
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* 最近登録された社員（最新5名） */}
      <div className="bg-white border rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          最近登録された社員（最新5名）
        </h2>

        {recentEmployees.length === 0 ? (
          <p className="text-sm text-gray-500 py-2">
            まだ社員が登録されていません
          </p>
        ) : (
          <div className="divide-y border-t border-b">
            {recentEmployees.map((employee) => (
              <div
                key={employee.id}
                className="flex justify-between items-center py-3 px-2 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center">
                  <Link
                    href={`/employees/${employee.id}`}
                    className="font-medium text-blue-600 hover:underline"
                  >
                    {employee.lastName} {employee.firstName}
                  </Link>
                  <span className="text-xs text-gray-400 font-mono ml-3">
                    ({employee.employeeNo})
                  </span>
                </div>

                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                  {employee.department?.name ?? "未所属"}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
