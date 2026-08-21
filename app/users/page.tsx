import BackLink from "@/components/BackLink";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth-guard";

function formatRole(role: string) {
  const labels: Record<string, string> = {
    ADMIN: "管理者",
    HR_MANAGER: "人事担当",
    MANAGER: "管理職",
    USER: "一般ユーザー",
  };

  return labels[role] ?? role;
}

export default async function UsersPage() {
  await requireAdmin();

  const users = await prisma.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="mx-auto max-w-6xl p-8">
      <BackLink href="/" label="ダッシュボードへ戻る" />
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            ユーザー管理
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            ログインユーザーと権限を管理します。
          </p>
        </div>

        <div className="flex gap-2">
          <Link
            href="/users/new"
            className="rounded bg-black px-4 py-2 text-sm text-white hover:bg-gray-800"
          >
            新規ユーザー作成
          </Link>

          <Link
            href="/"
            className="rounded border bg-white px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
          >
            ダッシュボードへ戻る
          </Link>
        </div>
      </div>

      <div className="overflow-x-auto rounded border bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50">
              <th className="p-3 text-left">氏名</th>
              <th className="p-3 text-left">メールアドレス</th>
              <th className="p-3 text-left">権限</th>
              <th className="p-3 text-left">状態</th>
              <th className="p-3 text-left">作成日</th>
              <th className="p-3 text-left">操作</th>
            </tr>
          </thead>

          <tbody>
            {users.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="p-8 text-center text-gray-500"
                >
                  ユーザーが登録されていません。
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr
                  key={user.id}
                  className="border-t"
                >
                  <td className="p-3 font-medium">
                    {user.name}
                  </td>

                  <td className="p-3">
                    {user.email}
                  </td>

                  <td className="p-3">
                    {formatRole(user.role)}
                  </td>

                  <td className="p-3">
                    <span
                      className={
                        user.isActive
                          ? "rounded bg-green-100 px-2 py-1 text-xs font-medium text-green-700"
                          : "rounded bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600"
                      }
                    >
                      {user.isActive ? "有効" : "無効"}
                    </span>
                  </td>

                  <td className="p-3">
                    {user.createdAt.toLocaleDateString("ja-JP")}
                  </td>

                  <td className="p-3">
                    <Link
                      href={`/users/${user.id}/edit`}
                      className="text-blue-600 hover:underline"
                    >
                      編集
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}
