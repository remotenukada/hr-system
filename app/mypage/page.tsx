import Link from "next/link";
import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export default async function MyPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const employee = await prisma.employee.findUnique({
    where: {
      userId: session.user.id,
    },
    include: {
      department: true,
    },
  });

  if (!employee) {
    return (
      <main className="mx-auto max-w-4xl p-8">
        <h1 className="text-2xl font-bold">マイページ</h1>
        <p className="mt-4 text-gray-600">
          社員情報が紐付けられていません。管理者に連絡してください。
        </p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-4xl p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">マイページ</h1>
          <p className="mt-1 text-sm text-gray-600">
            {employee.lastName} {employee.firstName} さんの個人情報ページです。
          </p>
        </div>

        <Link
          href="/"
          className="text-sm text-blue-600 hover:underline"
        >
          ← ダッシュボードへ戻る
        </Link>
      </div>

      <section className="mb-8 rounded-lg border bg-white p-6 shadow-sm">
        <h2 className="mb-4 border-b pb-2 text-lg font-semibold text-gray-800">
          本人基本情報
        </h2>

        <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <dt className="text-xs text-gray-500">社員番号</dt>
            <dd className="text-sm font-medium text-gray-900">{employee.employeeNo}</dd>
          </div>
          <div>
            <dt className="text-xs text-gray-500">部署</dt>
            <dd className="text-sm font-medium text-gray-900">{employee.department?.name ?? "-"}</dd>
          </div>
          <div>
            <dt className="text-xs text-gray-500">氏名</dt>
            <dd className="text-sm font-medium text-gray-900">
              {employee.lastName} {employee.firstName} ({employee.lastNameKana} {employee.firstNameKana})
            </dd>
          </div>
          <div>
            <dt className="text-xs text-gray-500">メールアドレス</dt>
            <dd className="text-sm font-medium text-gray-900">{employee.email}</dd>
          </div>
        </dl>
      </section>

      <section className="rounded-lg border bg-white p-6 shadow-sm">
        <h2 className="mb-4 border-b pb-2 text-lg font-semibold text-gray-800">
          各種申請・手続き
        </h2>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/mypage/my-number"
            className="rounded border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            個人番号（マイナンバー）管理
          </Link>

          <Link
            href="/mypage/dependent-requests"
            className="rounded border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            扶養家族申請履歴
          </Link>

          <Link
            href="/mypage/dependent-requests/new"
            className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            扶養家族を申請
          </Link>
        </div>
      </section>
    </main>
  );
}
