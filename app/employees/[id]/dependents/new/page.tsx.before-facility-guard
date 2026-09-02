import Link from "next/link";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";
import { requireHRManager } from "@/lib/auth-guard";
import { logAudit } from "@/lib/audit-log";
import { encryptMyNumber } from "@/lib/mynumber";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function NewDependentPage({ params }: Props) {
  await requireHRManager();

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
    redirect("/employees");
  }

  async function createDependent(formData: FormData) {
    "use server";

    const session = await requireHRManager();

    const targetEmployee = await prisma.employee.findUnique({
      where: {
        id,
      },
    });

    if (!targetEmployee) {
      throw new Error("対象社員が見つかりません。");
    }

    const name = String(formData.get("name") ?? "").trim();
    const nameKana = String(formData.get("nameKana") ?? "").trim();
    const relationship = String(formData.get("relationship") ?? "").trim();
    const birthDate = String(formData.get("birthDate") ?? "").trim();
    const annualIncomeRaw = String(formData.get("annualIncome") ?? "").trim();
    const myNumberRaw = String(formData.get("myNumber") ?? "").trim();
    const note = String(formData.get("note") ?? "").trim();

    const cohabiting = formData.get("cohabiting") === "on";
    const healthInsuranceDependent =
      formData.get("healthInsuranceDependent") === "on";

    if (!name || !relationship) {
      throw new Error("氏名と続柄は必須です。");
    }

    const normalizedMyNumber = myNumberRaw.replace(/\D/g, "");

    if (normalizedMyNumber && normalizedMyNumber.length !== 12) {
      throw new Error("マイナンバーは12桁で入力してください。");
    }

    const dependent = await prisma.dependent.create({
      data: {
        employeeId: id,
        name,
        nameKana: nameKana || null,
        relationship,
        birthDate: birthDate ? new Date(birthDate) : null,
        annualIncome: annualIncomeRaw ? Number(annualIncomeRaw) : null,
        cohabiting,
        healthInsuranceDependent,
        encryptedMyNumber: normalizedMyNumber
          ? encryptMyNumber(normalizedMyNumber)
          : null,
        note: note || null,
      },
    });

    await logAudit({
      userId: session.user.id,
      userName: session.user.name,
      action: "DEPENDENT_CREATED",
      targetType: "Dependent",
      targetId: dependent.id,
      description: `${targetEmployee.employeeNo} ${targetEmployee.lastName} ${targetEmployee.firstName} の扶養家族を登録`,
      afterData: {
        employeeId: id,
        dependentId: dependent.id,
        name,
        relationship,
        hasMyNumber: Boolean(normalizedMyNumber),
      },
    });

    revalidatePath(`/employees/${id}`);
    redirect(`/employees/${id}`);
  }

  return (
    <main className="mx-auto max-w-4xl p-8">
      <div className="mb-6">
        <Link
          href={`/employees/${id}`}
          className="text-sm text-blue-600 hover:underline"
        >
          ← 社員詳細へ戻る
        </Link>
      </div>

      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          扶養家族登録
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          {employee.lastName} {employee.firstName} さんの扶養家族情報を登録します。
        </p>
      </div>

      <form action={createDependent} className="space-y-6">
        <section className="rounded-lg border bg-white p-6 shadow-sm">
          <h2 className="mb-4 border-b pb-2 text-lg font-semibold text-gray-800">
            基本情報
          </h2>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                氏名 <span className="text-red-500">*</span>
              </label>
              <input
                name="name"
                required
                className="w-full rounded border p-2"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                ふりがな
              </label>
              <input
                name="nameKana"
                className="w-full rounded border p-2"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                続柄 <span className="text-red-500">*</span>
              </label>
              <input
                name="relationship"
                required
                placeholder="配偶者、長男、長女など"
                className="w-full rounded border p-2"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                生年月日
              </label>
              <input
                type="date"
                name="birthDate"
                className="w-full rounded border p-2"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                年間収入 (円)
              </label>
              <input
                type="number"
                name="annualIncome"
                min="0"
                className="w-full rounded border p-2"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                個人番号（マイナンバー）
              </label>
              <input
                name="myNumber"
                inputMode="numeric"
                maxLength={12}
                placeholder="12桁の半角数字"
                className="w-full rounded border p-2"
              />
              <p className="mt-1 text-xs text-gray-500">
                入力された個人番号は暗号化して安全に保存されます。
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-lg border bg-white p-6 shadow-sm">
          <h2 className="mb-4 border-b pb-2 text-lg font-semibold text-gray-800">
            扶養・健保情報
          </h2>

          <div className="space-y-3">
            <label className="flex items-center gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                name="cohabiting"
                defaultChecked
                className="rounded border-gray-300"
              />
              同居している
            </label>

            <label className="flex items-center gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                name="healthInsuranceDependent"
                defaultChecked
                className="rounded border-gray-300"
              />
              健康保険の扶養対象
            </label>
          </div>
        </section>

        <section className="rounded-lg border bg-white p-6 shadow-sm">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            備考
          </label>
          <textarea
            name="note"
            className="h-24 w-full rounded border p-2"
          />
        </section>

        <div className="flex justify-end gap-3">
          <Link
            href={`/employees/${id}`}
            className="rounded border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            キャンセル
          </Link>

          <button
            type="submit"
            className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            登録する
          </button>
        </div>
      </form>
    </main>
  );
}
