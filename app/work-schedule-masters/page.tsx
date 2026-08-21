import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteWorkScheduleMaster, toggleWorkScheduleMaster } from "@/app/actions/work-schedule-master";

export default async function WorkScheduleMastersPage() {
  const schedules =
    await prisma.workScheduleMaster.findMany({
      orderBy: {
        sortOrder: "asc",
      },
    });

  return (
    <main className="mx-auto max-w-5xl p-6">
      <Link
        href="/masters"
        className="mb-4 inline-block text-sm text-blue-600 hover:underline"
      >
        ← マスタ管理へ戻る
      </Link>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          勤務帯マスタ
        </h1>

        <a
          href="/work-schedule-masters/new"
          className="rounded bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
        >
          新規登録
        </a>
      </div>

      <table className="min-w-full text-sm">
        <thead className="bg-gray-50">
          <tr>
            <th className="border p-2 text-left">名称</th>
            <th className="border p-2 text-left">開始</th>
            <th className="border p-2 text-left">終了</th>
            <th className="border p-2 text-left">休憩</th>
            <th className="border p-2 text-left">状態</th>
            <th className="border p-2 text-left">操作</th>
          </tr>
        </thead>

        <tbody>
          {schedules.map((item) => (
            <tr key={item.id}>
              <td className="border p-2">
                {item.name}
              </td>
              <td className="border p-2">
                {item.startTime}
              </td>
              <td className="border p-2">
                {item.endTime}
              </td>
              <td className="border p-2">
                {item.breakMinutes}分
              </td>
              <td className="border p-2">
                {item.isActive ? "有効" : "無効"}
              </td>

              <td className="border p-2">
                <div className="flex items-center gap-3">
                  <form action={toggleWorkScheduleMaster}>
                    <input
                      type="hidden"
                      name="id"
                      value={item.id}
                    />
                    <button
                      type="submit"
                      className="text-blue-600 hover:underline"
                    >
                      {item.isActive ? "無効化" : "有効化"}
                    </button>
                  </form>

                  <a
                    href={`/work-schedule-masters/${item.id}/edit`}
                    className="text-gray-600 hover:underline"
                  >
                    編集
                  </a>

                  <form action={deleteWorkScheduleMaster}>
                    <input
                      type="hidden"
                      name="id"
                      value={item.id}
                    />
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
    </main>
  );
}
