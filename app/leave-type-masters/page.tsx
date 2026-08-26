import Link from "next/link";
import BackLink from "@/components/BackLink";
import {
  deleteLeaveTypeMaster,
  toggleLeaveTypeMaster,
} from "@/app/actions/leave-type-master";
import { prisma } from "@/lib/prisma";

export default async function LeaveTypeMastersPage() {
  const leaveTypes = await prisma.leaveType.findMany({
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
  });

  return (
    <main className="mx-auto max-w-5xl p-6">
      <BackLink href="/masters" label="マスタ管理へ戻る" />

      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">休暇種別マスタ</h1>

        <Link
          href="/leave-type-masters/new"
          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          新規登録
        </Link>
      </div>

      <div className="overflow-x-auto rounded-lg border bg-white">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gray-50 text-left">
              <th className="border-b p-3">コード</th>
              <th className="border-b p-3">名称</th>
              <th className="border-b p-3">給与区分</th>
              <th className="border-b p-3">表示順</th>
              <th className="border-b p-3">状態</th>
              <th className="border-b p-3">操作</th>
            </tr>
          </thead>

          <tbody>
            {leaveTypes.map((item) => (
              <tr key={item.id}>
                <td className="border-b p-3 font-mono">{item.code}</td>
                <td className="border-b p-3">{item.name}</td>
                <td className="border-b p-3">
                  {item.isPaid ? "有給" : "無給"}
                </td>
                <td className="border-b p-3">{item.sortOrder}</td>
                <td className="border-b p-3">
                  {item.isActive ? (
                    <span className="rounded bg-green-100 px-2 py-1 text-xs text-green-800">
                      有効
                    </span>
                  ) : (
                    <span className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-800">
                      無効
                    </span>
                  )}
                </td>
                <td className="border-b p-3">
                  <div className="flex items-center space-x-2">
                    <Link
                      href={`/leave-type-masters/${item.id}/edit`}
                      className="text-blue-600 hover:underline"
                    >
                      編集
                    </Link>
                    <form action={toggleLeaveTypeMaster}
                      <input
                        type="hidden"
                        name="id"
                        value={item.id}
                      />
                      <input
                        type="hidden"
                        name="id"
                        value={item.id}
                      />>
                      <button
                        type="submit"
                        className="text-gray-600 hover:underline"
                      >
                        {item.isActive ? "無効化" : "有効化"}
                      </button>
                    </form>
                    <form action={deleteLeaveTypeMaster}
                      <input
                        type="hidden"
                        name="id"
                        value={item.id}
                      />
                      <input
                        type="hidden"
                        name="id"
                        value={item.id}
                      />>
                      <button
                        type="submit"
                        className="text-red-600 hover:underline"
                      >
                        削除
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
