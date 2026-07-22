import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

function formatDate(date: Date | null) {
  if (!date) return "-";
  return new Date(date).toLocaleDateString("ja-JP");
}

function formatGender(gender: string | null) {
  if (!gender) return "-";

  const labels: Record<string, string> = {
    MALE: "男性",
    FEMALE: "女性",
    OTHER: "その他",
  };

  return labels[gender] ?? gender;
}

function formatEmploymentType(type: string | null) {
  if (!type) return "-";

  const labels: Record<string, string> = {
    FULL_TIME: "正職員",
    CONTRACT: "契約職員",
    PART_TIME: "パート",
    TEMPORARY: "派遣",
  };

  return labels[type] ?? type;
}

function formatEmployeeStatus(status: string | null) {
  if (!status) return "-";

  const labels: Record<string, string> = {
    ACTIVE: "在職",
    LEAVE: "休職",
    RETIRED: "退職",
  };

  return labels[status] ?? status;
}

function InfoItem({
  label,
  value,
}: {
  label: string;
  value: string | null | undefined;
}) {
  return (
    <div className="rounded border bg-white p-3">
      <p className="text-xs font-medium text-gray-500">{label}</p>
      <p className="mt-1 text-sm text-gray-900">{value || "-"}</p>
    </div>
  );
}

export default async function EmployeeDetailPage({ params }: Props) {
  const { id } = await params;

  const employee = await prisma.employee.findUnique({
    where: {
      id,
    },
    include: {
      department: true,
    },
  });

  if (!employee) {
    notFound();
  }

  async function deleteEmployee() {
    "use server";

    await prisma.employee.delete({
      where: {
        id,
      },
    });

    revalidatePath("/employees");
    redirect("/employees");
  }

  return (
    <main className="mx-auto max-w-5xl p-8">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <Link
            href="/employees"
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            ← 社員一覧に戻る
          </Link>

          <h1 className="mt-3 text-3xl font-bold text-gray-900">
            社員詳細
          </h1>

          <p className="mt-1 text-gray-500">
            {employee.lastName} {employee.firstName} さんの社員情報
          </p>
        </div>

        <div className="flex gap-3">
          <Link
            href={`/employees/${employee.id}/edit`}
            className="rounded bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
          >
            編集
          </Link>

          <form action={deleteEmployee}>
            <button
              type="submit"
              className="rounded bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
            >
              削除
            </button>
          </form>
        </div>
      </div>

      <div className="space-y-8">
        <section className="rounded-lg border bg-gray-50 p-5">
          <h2 className="mb-4 border-b pb-2 text-lg font-semibold text-gray-800">
            基本情報
          </h2>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <InfoItem label="社員番号" value={employee.employeeNo} />
            <InfoItem label="メールアドレス" value={employee.email} />
            <InfoItem
              label="氏名"
              value={`${employee.lastName} ${employee.firstName}`}
            />
            <InfoItem
              label="ふりがな"
              value={
                employee.lastNameKana || employee.firstNameKana
                  ? `${employee.lastNameKana ?? ""} ${employee.firstNameKana ?? ""}`.trim()
                  : "-"
              }
            />
            <InfoItem label="性別" value={formatGender(employee.gender)} />
            <InfoItem label="生年月日" value={formatDate(employee.birthDate)} />
          </div>
        </section>

        <section className="rounded-lg border bg-gray-50 p-5">
          <h2 className="mb-4 border-b pb-2 text-lg font-semibold text-gray-800">
            連絡先・住所
          </h2>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <InfoItem label="電話番号" value={employee.phoneNumber} />
            <InfoItem label="住所" value={employee.address} />
          </div>
        </section>

        <section className="rounded-lg border bg-gray-50 p-5">
          <h2 className="mb-4 border-b pb-2 text-lg font-semibold text-gray-800">
            組織・雇用情報
          </h2>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <InfoItem label="部署" value={employee.department?.name} />
            <InfoItem label="職種" value={employee.occupation} />
            <InfoItem label="役職" value={employee.position} />
            <InfoItem
              label="雇用形態"
              value={formatEmploymentType(employee.employmentType)}
            />
            <InfoItem label="入職日" value={formatDate(employee.hireDate)} />
            <InfoItem label="退職日" value={formatDate(employee.retirementDate)} />
            <InfoItem label="通勤区分" value={employee.commutingType} />
            <InfoItem
              label="ステータス"
              value={formatEmployeeStatus(employee.status)}
            />
          </div>
        </section>

        <section className="rounded-lg border bg-gray-50 p-5">
          <h2 className="mb-4 border-b pb-2 text-lg font-semibold text-gray-800">
            保険情報
          </h2>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <InfoItem
              label="被保険者番号"
              value={employee.healthInsuranceNo}
            />
            <InfoItem
              label="雇用保険番号"
              value={employee.employmentInsuranceNo}
            />
          </div>
        </section>
      </div>
    </main>
  );
}
