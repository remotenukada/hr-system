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
      employeeSalary: true,
      salaryHistories: {
        orderBy: {
          effectiveFrom: "desc",
        },
        take: 10,
      },
      leaveBalance: true,
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

  if (employee.employeeMyNumber && canManageMyNumber) {
    await logAudit({
      userId: session.user.id,
      userName: session.user.name,
      action: "VIEW_MYNUMBER",
      targetType: "Employee",
      targetId: employee.id,
      description: `${employee.employeeNo} のマイナンバーを閲覧`,
    });
  }

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


  async function updateSalary(formData: FormData) {
    "use server";

    await requireHRManager();

    const baseSalary =
      Number(formData.get("baseSalary") || 0);

    const allowance =
      Number(formData.get("allowance") || 0);

    const bonus =
      Number(formData.get("bonus") || 0);

    const currentSalary =
      await prisma.employeeSalary.findUnique({
        where: {
          employeeId: id,
        },
      });

    const updatedSalary =
      await prisma.employeeSalary.upsert({
        where: {
          employeeId: id,
        },
        update: {
          baseSalary,
          allowance,
          bonus,
        },
        create: {
          employeeId: id,
          baseSalary,
          allowance,
          bonus,
          effectiveFrom: new Date(),
        },
      });

    await prisma.salaryHistory.create({
      data: {
        employeeId: id,
        baseSalary,
        allowance,
        bonus,
        effectiveFrom: new Date(),
      },
    });

    await logAudit({
      userId: session.user.id,
      userName: session.user.name,
      action: "UPDATE_SALARY",
      targetType: "Employee",
      targetId: id,
      description: `${employee.employeeNo} の給与を更新`,
      beforeData: currentSalary,
      afterData: updatedSalary,
    });

    revalidatePath(`/employees/${id}`);
  }


  async function updateLeaveBalance(formData: FormData) {
    "use server";

    await requireHRManager();

    const grantedDays = Number(formData.get("grantedDays") || 0);
    const usedDays = Number(formData.get("usedDays") || 0);

    const currentLeave = await prisma.leaveBalance.findUnique({
      where: {
        employeeId: id,
      },
    });

    const updatedLeave = await prisma.leaveBalance.upsert({
      where: {
        employeeId: id,
      },
      update: {
        grantedDays,
        usedDays,
      },
      create: {
        employeeId: id,
        grantedDays,
        usedDays,
      },
    });

    await logAudit({
      userId: session.user.id,
      userName: session.user.name,
      action: "UPDATE_LEAVE_BALANCE",
      targetType: "Employee",
      targetId: id,
      description: `${employee.employeeNo} の有給残日数を更新`,
      beforeData: currentLeave,
      afterData: updatedLeave,
    });

    revalidatePath(`/employees/${id}`);
  }

  async function deleteEmployee() {
    "use server";

    await requireHRManager();

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

          {canManageMyNumber && (
            <>
              <Link
                href={`/employees/${employee.id}/edit`}
                className="rounded bg-gray-600 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700"
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
            </>
          )}
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
          <section className="rounded-lg border bg-white p-5">
            <h2 className="mb-4 border-b pb-2 text-lg font-semibold text-gray-800">
              給与履歴
            </h2>

            {employee.salaryHistories.length === 0 ? (
              <p className="text-sm text-gray-500">
                給与履歴はありません。
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-gray-50 text-left">
                      <th className="p-3">適用日</th>
                      <th className="p-3">基本給</th>
                      <th className="p-3">手当</th>
                      <th className="p-3">賞与</th>
                      <th className="p-3">登録日</th>
                    </tr>
                  </thead>

                  <tbody>
                    {employee.salaryHistories.map((history) => (
                      <tr key={history.id} className="border-b">
                        <td className="p-3">
                          {new Date(history.effectiveFrom).toLocaleDateString("ja-JP")}
                        </td>
                        <td className="p-3">
                          {history.baseSalary.toLocaleString("ja-JP")}円
                        </td>
                        <td className="p-3">
                          {history.allowance.toLocaleString("ja-JP")}円
                        </td>
                        <td className="p-3">
                          {history.bonus.toLocaleString("ja-JP")}円
                        </td>
                        <td className="p-3">
                          {new Date(history.createdAt).toLocaleDateString("ja-JP")}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        )}

        {canManageMyNumber && (
          <section className="rounded-lg border bg-blue-50 p-5">
            <h2 className="mb-4 border-b pb-2 text-lg font-semibold text-blue-800">
              有給管理
            </h2>

            <form action={updateLeaveBalance} className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium">
                  付与日数
                </label>

                <input
                  type="number"
                  step="0.5"
                  name="grantedDays"
                  defaultValue={employee.leaveBalance?.grantedDays ?? 0}
                  className="w-full rounded border p-2"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">
                  使用日数
                </label>

                <input
                  type="number"
                  step="0.5"
                  name="usedDays"
                  defaultValue={employee.leaveBalance?.usedDays ?? 0}
                  className="w-full rounded border p-2"
                />
              </div>

              <div className="rounded border bg-white p-3">
                <p className="text-xs text-gray-500">
                  残日数
                </p>

                <p className="text-lg font-bold text-blue-700">
                  {(
                    (employee.leaveBalance?.grantedDays ?? 0) -
                    (employee.leaveBalance?.usedDays ?? 0)
                  ).toFixed(1)}
                  日
                </p>
              </div>

              <button
                type="submit"
                className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
              >
                有給情報を保存
              </button>
            </form>
          </section>
        )}


        {canManageMyNumber && (
          <section className="rounded-lg border bg-green-50 p-5">
            <h2 className="mb-4 border-b pb-2 text-lg font-semibold text-green-800">
              給与情報
            </h2>

            <form action={updateSalary} className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div>
                <label className="mb-1 block text-sm font-medium">
                  基本給
                </label>

                <input
                  type="number"
                  name="baseSalary"
                  defaultValue={employee.employeeSalary?.baseSalary ?? ""}
                  className="w-full rounded border p-2"
                  required
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">
                  手当
                </label>

                <input
                  type="number"
                  name="allowance"
                  defaultValue={employee.employeeSalary?.allowance ?? 0}
                  className="w-full rounded border p-2"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">
                  賞与
                </label>

                <input
                  type="number"
                  name="bonus"
                  defaultValue={employee.employeeSalary?.bonus ?? 0}
                  className="w-full rounded border p-2"
                />
              </div>

              <div className="md:col-span-3">
                <button
                  type="submit"
                  className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700"
                >
                  給与情報を保存
                </button>
              </div>
            </form>
          </section>
        )}

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
