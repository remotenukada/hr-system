import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

import { prisma } from "@/lib/prisma";
import { requireHRManager } from "@/lib/auth-guard";
import { logAudit } from "@/lib/audit-log";
import { encryptMyNumber } from "@/lib/mynumber";

type Props = {
  params: Promise<{
    id: string;
    dependentId: string;
  }>;
};

function toDateInputValue(date: Date | null | undefined) {
  if (!date) {
    return "";
  }

  return new Date(date).toISOString().slice(0, 10);
}

export default async function EditDependentPage({ params }: Props) {
  await requireHRManager();

  const cookieStore = await cookies();
  const facilityScope = cookieStore.get("facilityScope")?.value ?? "ALL";
  const { id, dependentId } = await params;

  const employee = await prisma.employee.findUnique({
    where: {
      id,
    },
  });

  if (!employee) {
    redirect("/employees");
  }

  if (facilityScope !== "ALL" && employee.facilityId !== facilityScope) {
    notFound();
  }

  const dependent = await prisma.dependent.findUnique({
    where: {
      id: dependentId,
    },
  });

  if (!dependent || dependent.employeeId !== id) {
    redirect(`/employees/${id}`);
  }

  async function updateDependent(formData: FormData) {
    "use server";

    const currentSession = await requireHRManager();

    const actionCookieStore = await cookies();
    const actionFacilityScope =
      actionCookieStore.get("facilityScope")?.value ?? "ALL";

    const targetEmployee = await prisma.employee.findUnique({
      where: {
        id,
      },
      select: {
        facilityId: true,
      },
    });

    if (!targetEmployee) {
      notFound();
    }

    if (
      actionFacilityScope !== "ALL" &&
      targetEmployee.facilityId !== actionFacilityScope
    ) {
      notFound();
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
      throw new Error("個人番号は12桁で入力してください。");
    }

    const beforeDependent = await prisma.dependent.findUnique({
      where: {
        id: dependentId,
      },
      include: {
        employee: true,
      },
    });

    if (!beforeDependent || beforeDependent.employeeId !== id) {
      redirect(`/employees/${id}`);
    }

    const updatedDependent = await prisma.dependent.update({
      where: {
        id: dependentId,
      },
      data: {
        name,
        nameKana: nameKana || null,
        relationship,
        birthDate: birthDate ? new Date(birthDate) : null,
        cohabiting,
        healthInsuranceDependent,
        annualIncome: annualIncomeRaw ? parseInt(annualIncomeRaw, 10) : null,
        note: note || null,
        encryptedMyNumber: normalizedMyNumber
          ? encryptMyNumber(normalizedMyNumber)
          : beforeDependent.encryptedMyNumber,
      },
    });

    await logAudit({
      userId: currentSession.user.id,
      userName: currentSession.user.name,
      action: "DEPENDENT_UPDATED",
      targetType: "Dependent",
      targetId: dependentId,
      description: `${beforeDependent.employee.employeeNo} の扶養家族（${name}）情報を更新`,
      beforeData: beforeDependent,
      afterData: updatedDependent,
    });

    revalidatePath(`/employees/${id}`);
    redirect(`/employees/${id}`);
  }

  return (
    <main className="mx-auto max-w-2xl p-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">扶養家族情報の編集</h1>
        <Link
          href={`/employees/${id}`}
          className="text-sm text-gray-600 hover:underline"
        >
          ← 社員詳細へ戻る
        </Link>
      </div>

      <form
        action={updateDependent}
        className="space-y-6 rounded border bg-white p-6 shadow"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700">
            氏名 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            defaultValue={dependent.name}
            required
            className="mt-1 w-full rounded border p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            フリガナ
          </label>
          <input
            type="text"
            name="nameKana"
            defaultValue={dependent.nameKana ?? ""}
            className="mt-1 w-full rounded border p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            続柄 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="relationship"
            defaultValue={dependent.relationship}
            required
            className="mt-1 w-full rounded border p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            生年月日
          </label>
          <input
            type="date"
            name="birthDate"
            defaultValue={toDateInputValue(dependent.birthDate)}
            className="mt-1 w-full rounded border p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            年収（円）
          </label>
          <input
            type="number"
            name="annualIncome"
            defaultValue={dependent.annualIncome ?? ""}
            className="mt-1 w-full rounded border p-2"
          />
        </div>

        <div className="space-y-2">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="cohabiting"
              defaultChecked={dependent.cohabiting}
              className="rounded border-gray-300"
            />
            <span className="text-sm text-gray-700">同居している</span>
          </label>

          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="healthInsuranceDependent"
              defaultChecked={dependent.healthInsuranceDependent}
              className="rounded border-gray-300"
            />
            <span className="text-sm text-gray-700">健康保険の扶養対象</span>
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            個人番号 (更新時のみ入力)
          </label>
          <input
            type="password"
            name="myNumber"
            maxLength={12}
            placeholder="変更しない場合は空欄のまま"
            className="mt-1 w-full rounded border p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            備考
          </label>
          <textarea
            name="note"
            rows={3}
            defaultValue={dependent.note ?? ""}
            className="mt-1 w-full rounded border p-2"
          />
        </div>

        <div className="flex justify-end space-x-4">
          <Link
            href={`/employees/${id}`}
            className="rounded border px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            キャンセル
          </Link>
          <button
            type="submit"
            className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            更新する
          </button>
        </div>
      </form>
    </main>
  );
}
