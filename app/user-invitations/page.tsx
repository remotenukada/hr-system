import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth-guard";

function getStatusText(invitation: {
  acceptedAt: Date | null;
  expiresAt: Date;
}) {
  if (invitation.acceptedAt) {
    return "登録済";
  }

  if (invitation.expiresAt < new Date()) {
    return "期限切れ";
  }

  return "未登録";
}

function getStatusClass(invitation: {
  acceptedAt: Date | null;
  expiresAt: Date;
}) {
  if (invitation.acceptedAt) {
    return "rounded bg-green-100 px-2 py-1 text-xs font-medium text-green-700";
  }

  if (invitation.expiresAt < new Date()) {
    return "rounded bg-red-100 px-2 py-1 text-xs font-medium text-red-700";
  }

  return "rounded bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-700";
}

export default async function UserInvitationsPage() {
  await requireAdmin();

  const invitations = await prisma.userInvitation.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="mx-auto max-w-7xl p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            招待管理
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            雇用予定者向けのセルフ登録用招待URLを管理します。
          </p>
        </div>

        <div className="flex gap-2">
          <Link
            href="/user-invitations/new"
            className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            新規招待作成
          </Link>
          <Link
            href="/users"
            className="rounded border bg-white px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
          >
            ユーザー一覧へ
          </Link>
        </div>
      </div>

      <div className="overflow-x-auto rounded border bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50">
              <th className="p-3 text-left">社員番号</th>
              <th className="p-3 text-left">氏名</th>
              <th className="p-3 text-left">メール</th>
              <th className="p-3 text-left">入職予定日</th>
              <th className="p-3 text-left">期限</th>
              <th className="p-3 text-left">状態</th>
              <th className="p-3 text-left">招待URL</th>
              <th className="p-3 text-left">QR</th>
              <th className="p-3 text-left">印刷</th>
              <th className="p-3 text-left">再発行</th>
            </tr>
          </thead>

          <tbody>
            {invitations.length === 0 ? (
              <tr>
                <td
                  colSpan={10}
                  className="p-8 text-center text-gray-500"
                >
                  招待はまだありません。
                </td>
              </tr>
            ) : (
              invitations.map((invitation) => (
                <tr
                  key={invitation.id}
                  className="border-t"
                >
                  <td className="p-3">
                    {invitation.employeeNo}
                  </td>

                  <td className="p-3 font-medium">
                    {invitation.lastName} {invitation.firstName}
                  </td>

                  <td className="p-3">
                    {invitation.email}
                  </td>

                  <td className="p-3">
                    {invitation.expectedHireDate
                      ? invitation.expectedHireDate.toLocaleDateString("ja-JP")
                      : "-"}
                  </td>

                  <td className="p-3">
                    {invitation.expiresAt.toLocaleDateString("ja-JP")}
                  </td>

                  <td className="p-3">
                    <span className={getStatusClass(invitation)}>
                      {getStatusText(invitation)}
                    </span>
                  </td>

                  <td className="p-3 font-mono text-xs">
                    <Link
                      href={`/register/${invitation.token}`}
                      className="text-blue-600 underline hover:text-blue-800"
                    >
                      /register/{invitation.token}
                    </Link>
                  </td>
                  <td className="p-3">
                    <Link
                      href={`/user-invitations/${invitation.id}/qr`}
                      className="text-blue-600 hover:underline"
                    >
                      QRコード
                    </Link>
                  </td>
                  <td className="p-3">
                    <Link
                      href={`/user-invitations/${invitation.id}/print`}
                      className="text-blue-600 hover:underline"
                    >
                      印刷
                    </Link>
                  </td>
                  <td className="p-3">
                    {!invitation.acceptedAt ? (
                      <form
                        action={`/api/user-invitations/${invitation.id}/reissue`}
                        method="POST"
                      >
                        <button
                          type="submit"
                          className="text-red-600 hover:underline"
                        >
                          再発行
                        </button>
                      </form>
                    ) : (
                      "-"
                    )}
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
