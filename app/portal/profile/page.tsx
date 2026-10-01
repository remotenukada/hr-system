import Link from "next/link";
import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

function formatDate(date: Date | null | undefined) {
  return date
    ? new Date(date).toLocaleDateString("ja-JP")
    : "-";
}

function InfoItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-lg border bg-white p-4">
      <dt className="text-sm font-medium text-gray-500">
        {label}
      </dt>
      <dd className="mt-1 text-gray-900">
        {value}
      </dd>
    </div>
  );
}

export default async function ProfilePage() {
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
      facility: true,
    },
  });

  if (!employee) {
    redirect("/");
  }

  return (
    <main className="mx-auto max-w-6xl p-8">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            現在のプロフィール
          </h1>

          <p className="mt-2 text-sm text-gray-600">
            現在登録されている職員情報を表示しています。
          </p>
        </div>

        <Link
          href="/"
          className="rounded border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          ダッシュボードへ戻る
        </Link>
      </div>

      <section className="mt-6 rounded-xl border border-blue-100 bg-blue-50 p-6 shadow-sm">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {employee.lastName} {employee.firstName}
            </h2>

            <p className="mt-1 text-sm text-gray-600">
              職員番号：{employee.employeeNo}
            </p>

            <div className="mt-2 flex flex-wrap gap-3 text-sm text-gray-700">
              <span>所属部署：{employee.department?.name ?? "-"}</span>
              <span>役職：{employee.position ?? "-"}</span>
            </div>
          </div>

          <div className="mt-3 md:mt-0">
            <Link
              href="/mypage/profile-change"
              className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              登録情報の変更申請
            </Link>
          </div>

        </div>
      </section>

      <section className="mt-6 space-y-6">
        <div className="rounded-lg border bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">
            基本情報
          </h2>

          <dl className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <InfoItem
              label="氏名"
              value={`${employee.lastName} ${employee.firstName}`}
            />

            <InfoItem
              label="氏名（カナ）"
              value={
                employee.lastNameKana || employee.firstNameKana
                  ? `${employee.lastNameKana ?? ""} ${employee.firstNameKana ?? ""}`.trim()
                  : "-"
              }
            />

            <InfoItem
              label="職員番号"
              value={employee.employeeNo}
            />

            <InfoItem
              label="生年月日"
              value={formatDate(employee.birthDate)}
            />
          </dl>
        </div>

        <div className="rounded-lg border bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">
            連絡先
          </h2>

          <dl className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <InfoItem
              label="メールアドレス"
              value={employee.email}
            />

            <InfoItem
              label="電話番号"
              value={employee.phoneNumber ?? "-"}
            />

            <div className="rounded-lg border p-4 md:col-span-2">
              <dt className="text-sm font-medium text-gray-500">
                住所
              </dt>
              <dd className="mt-2 break-words text-base text-gray-900">
                {employee.address ?? "-"}
              </dd>
            </div>

            <InfoItem
              label="緊急連絡先"
              value={employee.emergencyContact ?? "-"}
            />
          </dl>
        </div>

        <div className="rounded-lg border bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">
            勤務情報
          </h2>

          <dl className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <InfoItem
              label="所属施設"
              value={employee.facility?.name ?? "-"}
            />

            <InfoItem
              label="所属部署"
              value={employee.department?.name ?? "-"}
            />

            <InfoItem
              label="役職"
              value={employee.position ?? "-"}
            />

            <InfoItem
              label="入職日"
              value={formatDate(employee.hireDate)}
            />
          </dl>
        </div>
      </section>
    </main>
  );
}
