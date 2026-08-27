import Link from "next/link";
import BackLink from "@/components/BackLink";
import { prisma } from "@/lib/prisma";
import {
  toggleLeaveTypeMaster,
  deleteLeaveTypeMaster,
} from "@/app/actions/leave-type-master";

export default async function LeaveTypeMastersPage() {
  const items = await prisma.leaveType.findMany({
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
  });

  return (
    <main className="mx-auto max-w-5xl p-6">
      <BackLink href="/masters" label="マスタ管理へ戻る" />
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">休暇種別マスタ</h1>
        <Link
          href="/leave-type-masters/new"
          className="rounded bg-blue-600 px-4 py-2 text-sm text-white"
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
              <th className="border-b p-3">失効(月)</th>
              <th className="border-b p-3">申請可</th>
              <th className="border-b p-3">残高管理</th>
              <th className="border-b p-3">表示順</th>
              <th className="border-b p-3">状態</th>
              <th className="border-b p-3">編集</th>
              <th className="border-b p-3">操作</th>
              <th className="border-b p-3">削除</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td className="border-b p-3 font-mono">{item.code}</td>
                <td className="border-b p-3">{item.name}</td>
                <td className="border-b p-3">
                  {item.isPaid ? "有給" : "無給"}
                </td>

                <td className="border-b p-3">{item.expirationMonths ?? "-"}</td>

                <td className="border-b p-3">
                  {item.allowRequest ? "○" : "×"}
                </td>

                <td className="border-b p-3">
                  {item.manageBalance ? "○" : "×"}
                </td>

                <td className="border-b p-3">{item.sortOrder}</td>
                <td className="border-b p-3">
                  {item.isActive ? "有効" : "無効"}
                </td>

                <td className="border-b p-3">
                  <Link
                    href={`/leave-type-masters/${item.id}/edit`}
                    className="text-blue-600 hover:underline"
                  >
                    編集
                  </Link>
                </td>

                <td className="border-b p-3">
                  <form action={toggleLeaveTypeMaster}>
                    <input type="hidden" name="id" value={item.id} />
                    <button
                      type="submit"
                      className="text-orange-600 hover:underline"
                    >
                      {item.isActive ? "無効化" : "有効化"}
                    </button>
                  </form>
                </td>

                <td className="border-b p-3">
                  <form action={deleteLeaveTypeMaster}>
                    <input type="hidden" name="id" value={item.id} />
                    <button
                      type="submit"
                      className="text-red-600 hover:underline"
                    >
                      削除
                    </button>
                  </form>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td colSpan={11} className="p-6 text-center text-gray-500">
                  休暇種別は登録されていません。
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}
