import Link from "next/link";
import { prisma } from "../lib/prisma";

export default async function HomePage() {
  const employeeCount = await prisma.employee.count();
  const departmentCount = await prisma.department.count();

  const pendingRequestCount = await prisma.employeeRequest.count({
    where: {
      status: "PENDING",
    },
  });

  const approvedRequestCount = await prisma.employeeRequest.count({
    where: {
      status: "APPROVED",
    },
  });

  const rejectedRequestCount = await prisma.employeeRequest.count({
    where: {
      status: "REJECTED",
    },
  });

  const recentEmployees = await prisma.employee.findMany({
    take: 5,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      department: true,
    },
  });

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
    <main className="p-8 max-w-6xl mx-auto space-y-8">
      {/* ヘッダー */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">人事管理システム</h1>
        <p className="text-sm text-gray-500 mt-1">組織の状況および各種申請のステータスを俯瞰します。</p>
      </div>

      {/* サマリーメトリクス */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* 社員総数 */}
        <Link href="/employees" className="block bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">社員総数</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{employeeCount} <span className="text-sm font-normal text-gray-500">名</span></p>
        </Link>

        {/* 部署総数 */}
        <Link href="/departments" className="block bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">部署総数</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{departmentCount} <span className="text-sm font-normal text-gray-500">部署</span></p>
        </Link>

        {/* 未対応申請 */}
        <Link href="/requests?status=PENDING" className="block bg-amber-50 p-6 rounded-xl border border-amber-200 shadow-sm hover:shadow-md transition-shadow">
          <p className="text-xs font-medium text-amber-700 uppercase tracking-wider">未対応の申請</p>
          <p className="text-3xl font-bold text-amber-900 mt-2">{pendingRequestCount} <span className="text-sm font-normal text-amber-600">件</span></p>
        </Link>

        {/* 承認済み申請 */}
        <Link href="/requests?status=APPROVED" className="block bg-green-50 p-6 rounded-xl border border-green-200 shadow-sm hover:shadow-md transition-shadow">
          <p className="text-xs font-medium text-green-700 uppercase tracking-wider">承認済みの申請</p>
          <p className="text-3xl font-bold text-green-900 mt-2">{approvedRequestCount} <span className="text-sm font-normal text-green-600">件</span></p>
        </Link>

        {/* 却下された申請 */}
        <Link href="/requests?status=REJECTED" className="block bg-rose-50 p-6 rounded-xl border border-rose-200 shadow-sm hover:shadow-md transition-shadow">
          <p className="text-xs font-medium text-rose-700 uppercase tracking-wider">却下された申請</p>
          <p className="text-3xl font-bold text-rose-900 mt-2">{rejectedRequestCount} <span className="text-sm font-normal text-rose-600">件</span></p>
        </Link>
      </div>

      {/* 2カラムレイアウト */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 左側：最近登録された社員 */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-800">最近追加された社員</h2>
            <Link href="/employees" className="text-sm text-blue-600 hover:underline">
              全員見る →
            </Link>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            {recentEmployees.length === 0 ? (
              <div className="p-6 text-center text-gray-500 text-sm">社員データがありません。</div>
            ) : (
              <div className="divide-y divide-gray-100">
                {recentEmployees.map((emp) => (
                  <div key={emp.id} className="p-4 flex justify-between items-center hover:bg-gray-50/50 transition-colors">
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        {emp.lastName} {emp.firstName}
                      </p>
                      <p className="text-xs text-gray-400 font-mono mt-0.5">社員番号: {emp.employeeNo}</p>
                    </div>
                    <div className="text-right">
                      <span className="inline-block text-xs font-medium px-2.5 py-1 bg-gray-100 rounded-md border text-gray-700">
                        {emp.department?.name || "未所属"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* 右側：部署の所属状況 */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-800">部署別の所属人数</h2>
            <Link href="/departments" className="text-sm text-blue-600 hover:underline">
              部署管理 →
            </Link>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            {departments.length === 0 ? (
              <div className="p-6 text-center text-gray-500 text-sm">部署データがありません。</div>
            ) : (
              <div className="divide-y divide-gray-100">
                {departments.map((dept) => (
                  <div key={dept.id} className="p-4 flex justify-between items-center hover:bg-gray-50/50 transition-colors">
                    <span className="text-sm font-medium text-gray-800">{dept.name}</span>
                    <span className="text-xs bg-blue-50 text-blue-700 font-semibold px-2.5 py-1 rounded-full border border-blue-100">
                      {dept._count.employees} 名
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* クイックリンクエリア */}
      <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 flex flex-wrap gap-4 items-center justify-between">
        <div className="text-sm text-gray-600 font-medium">クイックアクション:</div>
        <div className="flex flex-wrap gap-3">
          <Link href="/employees/new" className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg text-sm shadow-sm transition-colors font-medium">
            ＋ 社員を追加
          </Link>
          <Link href="/requests/new" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm shadow-sm transition-colors font-medium">
            ＋ 新規申請を作成
          </Link>
        </div>
      </div>
    </main>
  );
}
