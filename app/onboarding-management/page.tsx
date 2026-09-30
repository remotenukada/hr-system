import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { requireHRManager } from "@/lib/auth-guard";
import { sendSystemMailSafely } from "@/lib/mail";

async function sendOnboardingReminder(formData: FormData) {
  "use server";

  await requireHRManager();

  const employeeId = String(formData.get("employeeId") ?? "");

  const employee = await prisma.employee.findUnique({
    where: { id: employeeId },
    select: {
      email: true,
      firstName: true,
      lastName: true,
      hireDate: true,
      onboardingCompletedAt: true,
    },
  });

  if (!employee || employee.onboardingCompletedAt || !employee.email) {
    redirect("/onboarding-management?status=followup&mail=invalid");
  }

  const daysSinceHire = employee.hireDate
    ? Math.floor(
        (Date.now() - new Date(employee.hireDate).getTime()) /
          (1000 * 60 * 60 * 24),
      )
    : null;

  if (daysSinceHire === null || daysSinceHire < 30) {
    redirect("/onboarding-management?status=followup&mail=invalid");
  }

  const sent = await sendSystemMailSafely({
    to: employee.email,
    subject: "【FY Nexus One】初回登録のご確認",
    text: `${employee.lastName} ${employee.firstName} さん\n\nFY Nexus Oneの初回登録に未完了の項目があります。\n\nログイン後、「初回登録」画面から登録を完了してください。\n該当しない項目は「該当なし」を選択できます。\n\nFY Nexus One\n人事担当`,
  });

  redirect(
    `/onboarding-management?status=followup&mail=${
      sent ? "sent" : "failed"
    }`,
  );
}

const TASK_KEYS = [
  "PROFILE",
  "PLEDGE",
  "RESIDENCE",
  "COMMUTING",
  "DEPENDENTS",
  "CERTIFICATIONS",
  "BANK_ACCOUNT",
  "MY_NUMBER",
] as const;

type TaskKey = (typeof TASK_KEYS)[number];
type ItemStatus = "completed" | "skipped" | "pending";

const taskLabels: Record<string, string> = {
  PROFILE: "プロフィール",
  PLEDGE: "誓約書",
  RESIDENCE: "住居届",
  COMMUTING: "通勤届",
  DEPENDENTS: "扶養家族",
  CERTIFICATIONS: "免許・資格等",
  BANK_ACCOUNT: "口座情報",
  MY_NUMBER: "マイナンバー",
};

function getSkippedItems(value: unknown): string[] {
  if (!Array.isArray(value)) return [];

  return value.filter(
    (item): item is string => typeof item === "string",
  );
}

function getStatusLabel(status: ItemStatus) {
  if (status === "completed") return "完了";
  if (status === "skipped") return "該当なし";
  return "未対応";
}

function getStatusClass(status: ItemStatus) {
  if (status === "completed") {
    return "bg-green-100 text-green-800";
  }

  if (status === "skipped") {
    return "bg-gray-100 text-gray-700";
  }

  return "bg-yellow-100 text-yellow-800";
}

export default async function OnboardingManagementPage({
  searchParams,
}: {
  searchParams?: Promise<{ status?: string; mail?: string }>;
}) {
  await requireHRManager();

  const params = await searchParams;
  const filterStatus = params?.status ?? "all";

  const cookieStore = await cookies();
  const facilityScope =
    cookieStore.get("facilityScope")?.value ?? "ALL";

  const employees = await prisma.employee.findMany({
    where:
      facilityScope !== "ALL"
        ? { facilityId: facilityScope }
        : undefined,
    include: {
      facility: true,
      department: true,
      pledges: {
        select: {
          id: true,
          status: true,
          submissionMethod: true,
          filePath: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
      residenceRequests: {
        select: { id: true },
      },
      commutingRequests: {
        select: { id: true },
      },
      dependentRequests: {
        select: { id: true },
      },
      certifications: {
        select: { id: true },
      },
      bankAccount: {
        select: { id: true },
      },
      employeeMyNumber: {
        select: { id: true },
      },
    },
    orderBy: [
      { facilityId: "asc" },
      { departmentId: "asc" },
      { employeeNo: "asc" },
    ],
  });

  const rows = employees.map((employee) => {
    const skipped = getSkippedItems(
      employee.onboardingSkippedItems,
    );

    const legacyCompleted =
      employee.onboardingCompletedAt !== null;

    const latestPledge = employee.pledges?.[0] ?? null;

    const itemStatus: Record<TaskKey, ItemStatus> = {
      PROFILE: "completed",
      PLEDGE:
        employee.pledges?.some((p: any) => p.status === "COMPLETED") ||
        latestPledge?.status === "COMPLETED"
          ? "completed"
          : "pending",
      RESIDENCE:
        legacyCompleted || employee.residenceRequests.length > 0
          ? "completed"
          : skipped.includes("RESIDENCE")
            ? "skipped"
            : "pending",

      COMMUTING:
        legacyCompleted || employee.commutingRequests.length > 0
          ? "completed"
          : skipped.includes("COMMUTING")
            ? "skipped"
            : "pending",

      DEPENDENTS:
        legacyCompleted || employee.dependentRequests.length > 0
          ? "completed"
          : skipped.includes("DEPENDENTS")
            ? "skipped"
            : "pending",

      CERTIFICATIONS:
        legacyCompleted || employee.certifications.length > 0
          ? "completed"
          : skipped.includes("CERTIFICATIONS")
            ? "skipped"
            : "pending",

      BANK_ACCOUNT:
        legacyCompleted || Boolean(employee.bankAccount)
          ? "completed"
          : skipped.includes("BANK_ACCOUNT")
            ? "skipped"
            : "pending",

      MY_NUMBER:
        legacyCompleted || Boolean(employee.employeeMyNumber)
          ? "completed"
          : skipped.includes("MY_NUMBER")
            ? "skipped"
            : "pending",
    };

    const progress = TASK_KEYS.filter(
      (key) => itemStatus[key] !== "pending",
    ).length;

    const status =
      progress === 0
        ? "未着手"
        : progress === TASK_KEYS.length
          ? "完了"
          : "進行中";

    

    const missingItems = TASK_KEYS
      .filter((key) => itemStatus[key] === "pending")
      .map((key) => taskLabels[key]);

    const daysSinceHire = employee.hireDate
      ? Math.floor(
          (Date.now() - new Date(employee.hireDate).getTime())
          / (1000 * 60 * 60 * 24)
        )
      : null;

    const needsFollowUp =
      status !== "完了" &&
      daysSinceHire !== null &&
      daysSinceHire >= 30;

    return {
      employee,
      latestPledge,
      itemStatus,
      progress,
      status,
      missingItems,
      daysSinceHire,
      needsFollowUp,
    };
  });

  const completedCount = rows.filter(
    (row) => row.status === "完了",
  ).length;

  const incompleteCount = rows.length - completedCount;

  const followUpCount = rows.filter(
    (row) => row.needsFollowUp,
  ).length;

  const completionRate =
    rows.length === 0
      ? 0
      : Math.round(
          (completedCount / rows.length) * 1000
        ) / 10;

  const completedDays = rows
    .filter(
      (row) =>
        row.employee.hireDate &&
        row.employee.onboardingCompletedAt,
    )
    .map((row) =>
      Math.floor(
        (
          new Date(row.employee.onboardingCompletedAt!).getTime() -
          new Date(row.employee.hireDate!).getTime()
        ) /
          (1000 * 60 * 60 * 24),
      ),
    );

  const averageCompletionDays =
    completedDays.length === 0
      ? 0
      : Math.round(
          (
            completedDays.reduce((a, b) => a + b, 0) /
            completedDays.length
          ) * 10,
        ) / 10;

  const completedWithin7Days = rows.filter(
    (row) =>
      row.employee.hireDate &&
      row.employee.onboardingCompletedAt &&
      (
        new Date(row.employee.onboardingCompletedAt).getTime() -
        new Date(row.employee.hireDate).getTime()
      ) /
        (1000 * 60 * 60 * 24) <= 7,
  ).length;

  const completedEmployees = rows.filter(
    (row) => row.status === "完了",
  ).length;

  const completedWithin7Rate =
    completedEmployees === 0
      ? 0
      : Math.round(
          (completedWithin7Days /
            completedEmployees) *
            1000,
        ) / 10;

  const overdueIncomplete = rows.filter(
    (row) => row.needsFollowUp,
  ).length;

  const overdueIncompleteRate =
    rows.length === 0
      ? 0
      : Math.round(
          (overdueIncomplete / rows.length) *
            1000,
        ) / 10;

  const filteredRows = rows.filter((row) => {
    if (filterStatus === "completed") {
      return row.status === "完了";
    }

    if (filterStatus === "incomplete") {
      return row.status !== "完了";
    }

    if (filterStatus === "followup") {
      return row.needsFollowUp;
    }

    return true;
  });

  return (
    <main className="mx-auto max-w-7xl space-y-6 px-4 py-8 sm:px-6 lg:px-8">
      <div>
        <Link
          href="/"
          className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
        >
          ← ダッシュボードへ戻る
        </Link>
      </div>
      <div>
        <h1 className="text-2xl font-bold">
          初回登録進捗管理
        </h1>

        <p className="mt-2 text-sm text-gray-600">
          職員ごとの初回登録状況を確認します。
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        <Link
          href="/onboarding-management"
          className={`rounded-md px-3 py-1.5 text-sm font-medium ${
            filterStatus === "all"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          全員 ({rows.length})
        </Link>
        <Link
          href="/onboarding-management?status=incomplete"
          className={`rounded-md px-3 py-1.5 text-sm font-medium ${
            filterStatus === "incomplete"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          未完了のみ ({incompleteCount})
        </Link>
        <Link
          href="/onboarding-management?status=completed"
          className={`rounded-md px-3 py-1.5 text-sm font-medium ${
            filterStatus === "completed"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          完了のみ ({completedCount})
        </Link>
        <Link
          href="/onboarding-management?status=followup"
          className={`rounded-md px-3 py-1.5 text-sm font-medium ${
            filterStatus === "followup"
              ? "bg-red-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          要フォローのみ ({rows.filter((r) => r.needsFollowUp).length})
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <div className="rounded-lg border bg-white p-5 shadow-sm">
          <div className="text-sm text-gray-500">対象者数</div>
          <div className="mt-2 text-2xl font-bold">
            {rows.length}名
          </div>
        </div>

        <div className="rounded-lg border bg-white p-5 shadow-sm">
          <div className="text-sm text-gray-500">完了者数</div>
          <div className="mt-2 text-2xl font-bold text-green-600">
            {completedCount}名
          </div>
        </div>

        <div className="rounded-lg border bg-white p-5 shadow-sm">
          <div className="text-sm text-gray-500">未完了者数</div>
          <div className="mt-2 text-2xl font-bold text-amber-600">
            {incompleteCount}名
          </div>
        </div>

        <div className="rounded-lg border bg-white p-5 shadow-sm">
          <div className="text-sm text-gray-500">要フォロー</div>
          <div className="mt-2 text-2xl font-bold text-red-600">
            {followUpCount}名
          </div>
        </div>

        <div className="rounded-lg border bg-white p-5 shadow-sm">
          <div className="text-sm text-gray-500">完了率</div>
          <div className="mt-2 text-2xl font-bold text-blue-600">
            {completionRate}%
          </div>
        </div>
      </div>

      <section className="rounded-lg border bg-white p-5 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900">
          オンボーディング分析
        </h2>

        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded border p-4">
            <div className="text-sm text-gray-500">
              平均完了日数
            </div>
            <div className="mt-2 text-2xl font-bold text-blue-600">
              {averageCompletionDays}日
            </div>
          </div>

          <div className="rounded border p-4">
            <div className="text-sm text-gray-500">
              7日以内完了率
            </div>
            <div className="mt-2 text-2xl font-bold text-green-600">
              {completedWithin7Rate}%
            </div>
          </div>

          <div className="rounded border p-4">
            <div className="text-sm text-gray-500">
              30日超未完了率
            </div>
            <div className="mt-2 text-2xl font-bold text-red-600">
              {overdueIncompleteRate}%
            </div>
          </div>
        </div>
      </section>

      <div className="flex flex-wrap gap-4 text-xs">
        <span className="rounded bg-green-100 px-2 py-1 text-green-800">
          完了
        </span>
        <span className="rounded bg-gray-100 px-2 py-1 text-gray-700">
          該当なし
        </span>
        <span className="rounded bg-yellow-100 px-2 py-1 text-yellow-800">
          未対応
        </span>
      </div>

      <section className="rounded-lg border bg-white shadow-sm">
        <div className="border-b px-5 py-4">
          <h2 className="text-lg font-semibold text-gray-900">
            対象職員一覧
          </h2>
          <p className="mt-1 text-sm text-gray-600">
            不足している初回登録項目を確認できます。
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-[1050px] w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-3 text-left">職員番号</th>
                <th className="p-3 text-left">氏名</th>
                <th className="p-3 text-left">施設</th>
                <th className="p-3 text-left">部署</th>
                <th className="p-3 text-center">進捗</th>
                <th className="p-3 text-left">不足項目</th>
                <th className="p-3 text-left">状態</th>
                <th className="p-3 text-center">入職後</th>
                <th className="p-3 text-center">フォロー</th>
                <th className="p-3 text-center">操作</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {filteredRows.length === 0 ? (
                <tr>
                  <td colSpan={10} className="p-8 text-center text-gray-500">
                    該当する職員データはありません。
                  </td>
                </tr>
              ) : (
                filteredRows.map((row) => (
                  <tr
                    key={row.employee.id}
                    className="align-top hover:bg-gray-50 transition-colors"
                  >
                    <td className="p-3 text-gray-700">
                      {row.employee.employeeNo}
                    </td>

                    <td className="p-3 font-medium">
                      <Link
                        href={`/employees/${row.employee.id}`}
                        className="text-blue-600 hover:underline"
                      >
                        {row.employee.lastName} {row.employee.firstName}
                      </Link>
                    </td>

                    <td className="p-3 text-gray-600">
                      {row.employee.facility?.name ?? "-"}
                    </td>

                    <td className="p-3 text-gray-600">
                      {row.employee.department?.name ?? "-"}
                    </td>

                    <td className="p-3 text-center font-medium">
                      {row.progress}/{TASK_KEYS.length}
                    </td>

                    <td className="p-3">
                      <div className="flex flex-wrap gap-1">
                        {row.missingItems.length === 0 ? (
                          <span className="text-xs text-gray-400">なし</span>
                        ) : (
                          row.missingItems.map((item) => (
                            <span
                              key={item}
                              className="inline-block rounded bg-red-50 px-2 py-0.5 text-xs text-red-600 border border-red-100"
                            >
                              {taskLabels[item] ?? item}
                            </span>
                          ))
                        )}
                      </div>
                    </td>

                    <td className="p-3">
                      <span className="inline-flex min-w-[110px] justify-center items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
                        {row.status}
                      </span>
                    </td>

                    <td className="p-3 text-center text-gray-600">
                      {row.daysSinceHire}日
                    </td>

                    <td className="p-3 text-center">
                      {row.needsFollowUp ? (
                        <span className="inline-flex min-w-[110px] justify-center items-center rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-800">
                          要対応
                        </span>
                      ) : (
                        <span className="text-xs text-gray-400">-</span>
                      )}
                    </td>

                                        <td className="p-3">
                      <div className="flex flex-wrap items-center justify-center gap-2">
                        <Link
                          href={`/employees/${row.employee.id}`}
                          className="inline-flex min-w-[110px] justify-center items-center rounded border border-gray-300 bg-white px-2.5 py-1 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                        >
                          職員詳細
                        </Link>

                        <Link
                          href={`/employees/${row.employee.id}/onboarding-settings`}
                          className="inline-flex min-w-[110px] justify-center items-center rounded border border-gray-300 bg-white px-2.5 py-1 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                        >
                          初回登録設定
                        </Link>

                        <Link
                          href="/pledges"
                          className="inline-flex min-w-[110px] justify-center items-center rounded border border-gray-300 bg-white px-2.5 py-1 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                        >
                          誓約書確認
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

  </main>
  );
}