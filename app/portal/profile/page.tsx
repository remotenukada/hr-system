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
    <main className="mx-auto max-w-5xl p-8">
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

      <section className="mt-6 rounded-lg border bg-gray-50 p-6 shadow-sm">
        <h2 className="mb-4 border-b pb-2 text-lg font-semibold">
          基本情報
        </h2>

        <dl className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <InfoItem
            label="職員番号"
            value={employee.employeeNo}
          />

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
            label="メールアドレス"
            value={employee.email}
          />

          <InfoItem
            label="電話番号"
            value={employee.phoneNumber ?? "-"}
          />

          <InfoItem
            label="住所"
            value={employee.address ?? "-"}
          />

          <InfoItem
            label="緊急連絡先"
            value={employee.emergencyContact ?? "-"}
          />

          <InfoItem
            label="生年月日"
            value={formatDate(employee.birthDate)}
          />

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
      </section>

      <section className="mt-6 flex flex-wrap gap-3">
        <Link
          href="/mypage/profile-change"
          className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          プロフィール変更申請
        </Link>
      </section>
    </main>
  );
}
