import Link from "next/link";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { requireHRManager } from "@/lib/auth-guard";

const TASKS = [
  { key: "RESIDENCE", label: "住居届" },
  { key: "COMMUTING", label: "通勤届" },
  { key: "DEPENDENTS", label: "扶養家族情報" },
  { key: "CERTIFICATIONS", label: "免許・資格等" },
  { key: "BANK_ACCOUNT", label: "口座情報" },
  { key: "MY_NUMBER", label: "マイナンバー" },
] as const;

const TASK_KEYS = TASKS.map((task) => task.key);

function getSkippedItems(value: unknown): string[] {
  if (!Array.isArray(value)) return [];

  return value.filter(
    (item): item is string =>
      typeof item === "string" &&
      TASK_KEYS.includes(
        item as (typeof TASK_KEYS)[number],
      ),
  );
}

async function saveOnboardingSettings(formData: FormData) {
  "use server";

  await requireHRManager();

  const employeeId = String(
    formData.get("employeeId") ?? "",
  );

  const cookieStore = await cookies();
  const facilityScope =
    cookieStore.get("facilityScope")?.value ?? "ALL";

  const employee = await prisma.employee.findFirst({
    where: {
      id: employeeId,
      ...(facilityScope !== "ALL"
        ? { facilityId: facilityScope }
        : {}),
    },
    select: { id: true },
  });

  if (!employee) {
    notFound();
  }

  const selected = formData
    .getAll("items")
    .map(String)
    .filter((item) =>
      TASK_KEYS.includes(
        item as (typeof TASK_KEYS)[number],
      ),
    );

  await prisma.employee.update({
    where: { id: employee.id },
    data: {
      onboardingSkippedItems: selected,
    },
  });

  redirect(
    `/employees/${employee.id}/onboarding-settings?saved=1`,
  );
}

export default async function OnboardingSettingsPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ saved?: string }>;
}) {
  await requireHRManager();

  const { id } = await params;
  const query = await searchParams;

  const cookieStore = await cookies();
  const facilityScope =
    cookieStore.get("facilityScope")?.value ?? "ALL";

  const employee = await prisma.employee.findFirst({
    where: {
      id,
      ...(facilityScope !== "ALL"
        ? { facilityId: facilityScope }
        : {}),
    },
    include: {
      facility: true,
      department: true,
    },
  });

  if (!employee) {
    notFound();
  }

  const skippedItems = getSkippedItems(
    employee.onboardingSkippedItems,
  );

  return (
    <main className="mx-auto max-w-3xl p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">
            初回登録の事前設定
          </h1>

          <p className="mt-2 text-sm text-gray-600">
            {employee.lastName} {employee.firstName}
            （{employee.employeeNo}）
          </p>
        </div>

        <Link
          href="/onboarding-management"
          className="rounded border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          進捗管理へ戻る
        </Link>
      </div>

      {query.saved === "1" && (
        <div className="mt-5 rounded border border-green-200 bg-green-50 p-3 text-sm text-green-700">
          初回登録の事前設定を保存しました。
        </div>
      )}

      <section className="mt-6 rounded-lg border bg-white p-6 shadow-sm">
        <p className="text-sm text-gray-600">
          初回登録時に該当しないことが確認できている項目を選択してください。
        </p>

        <form action={saveOnboardingSettings} className="mt-6 space-y-6">
          <input
            type="hidden"
            name="employeeId"
            value={employee.id}
          />

          <div className="space-y-3">
            {TASKS.map((task) => (
              <label
                key={task.key}
                className="flex cursor-pointer items-center space-x-3 rounded border p-3 hover:bg-gray-50"
              >
                <input
                  type="checkbox"
                  name="items"
                  value={task.key}
                  defaultChecked={skippedItems.includes(task.key)}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-900">
                  {task.label}
                </span>
              </label>
            ))}
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              設定を保存する
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
