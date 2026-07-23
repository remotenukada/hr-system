import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import Image from "next/image";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { logAudit } from "@/lib/audit-log";
import { requireHRManager } from "@/lib/auth-guard";
import {
  encryptMyNumber,
  decryptMyNumber,
  maskMyNumber,
} from "@/lib/mynumber";

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

  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const canManageMyNumber =
    session.user.role === "ADMIN" ||
    session.user.role === "HR_MANAGER";

  const employee = await prisma.employee.findUnique({
    where: {
      id,
    },
    include: {
      department: true,
      employeeMyNumber: true,
    },
  });

  if (!employee) {
    notFound();
  }

  const maskedMyNumber = employee.employeeMyNumber
    ? maskMyNumber(
        decryptMyNumber(employee.employeeMyNumber.encryptedNumber),
      )
    : null;

  async function updateMyNumber(formData: FormData) {
    "use server";

    await requireHRManager();

    const rawMyNumber = String(formData.get("myNumber") || "");
    const normalizedMyNumber = rawMyNumber.replace(/\D/g, "");

    if (normalizedMyNumber.length !== 12) {
      throw new Error("マイナンバーは12桁で入力してください。");
    }

    const currentMyNumber = await prisma.employeeMyNumber.findUnique({
      where: {
        employeeId: id,
      },
    });

    const beforeMasked = currentMyNumber
      ? maskMyNumber(decryptMyNumber(currentMyNumber.encryptedNumber))
      : null;

    const encryptedNumber = encryptMyNumber(normalizedMyNumber);
    const afterMasked = maskMyNumber(normalizedMyNumber);

    const updatedMyNumber = await prisma.employeeMyNumber.upsert({
      where: {
        employeeId: id,
      },
      update: {
        encryptedNumber,
      },
      create: {
        employeeId: id,
        encryptedNumber,
      },
    });

    await logAudit({
      userId: session.user.id,
      userName: session.user.name,
      action: "UPDATE_MYNUMBER",
      targetType: "Employee",
      targetId: id,
      description: `${employee.employeeNo} のマイナンバーを更新`,
      beforeData: {
        maskedMyNumber: beforeMasked,
      },
      afterData: {
        maskedMyNumber: afterMasked,
        recordId: updatedMyNumber.id,
      },
    });

    revalidatePath(`/employees/${id}`);
  }

  async function deleteEmployee() {
    "use server";

    const deletedEmployee = await prisma.employee.delete({
      where: {
        id,
      },
    });

    await logAudit({
      action: "EMPLOYEE_DELETED",
      targetType: "Employee",
      targetId: deletedEmployee.id,
      description: `${deletedEmployee.employeeNo} を削除`,
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
          <a
            href={`/api/employees/${employee.id}/pdf`}
            className="rounded border border-gray-300 bg-white px-4 py-2 text-sm font-medium hover:bg-gray-50"
          >
            PDF出力
          </a>

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
            プロフィール写真
          </h2>

          <div className="flex justify-center">
            {employee.photoPath ? (
              <Image
                src={employee.photoPath}
                alt={`${employee.lastName} ${employee.firstName}`}
                width={200}
                height={200}
                className="h-48 w-48 rounded-full object-cover border shadow-sm"
              />
            ) : (
              <div className="flex h-48 w-48 items-center justify-center rounded-full border bg-gray-200 text-sm text-gray-500">
                写真なし
              </div>
            )}
          </div>
        </section>
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

        {canManageMyNumber && (
          <section className="rounded-lg border bg-red-50 p-5">
            <h2 className="mb-4 border-b pb-2 text-lg font-semibold text-red-800">
              マイナンバー管理
            </h2>

            <div className="mb-4 rounded border bg-white p-3">
              <p className="text-xs font-medium text-gray-500">
                登録状況
              </p>
              <p className="mt-1 text-sm font-semibold text-gray-900">
                {maskedMyNumber ?? "未登録"}
              </p>
              <p className="mt-1 text-xs text-red-600">
                ※ マイナンバーは暗号化して保存されます。画面には下4桁のみ表示します。
              </p>
            </div>

            <form action={updateMyNumber} className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  マイナンバー
                </label>
                <input
                  name="myNumber"
                  inputMode="numeric"
                  maxLength={12}
                  placeholder="12桁の番号を入力"
                  className="w-full rounded border bg-white p-2"
                  required
                />
              </div>

              <button
                type="submit"
                className="rounded bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
              >
                マイナンバーを保存
              </button>
            </form>
          </section>
        )}
      </div>
    </main>
  );
}
