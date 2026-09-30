import Link from "next/link";
import { cookies } from "next/headers";

import { prisma } from "@/lib/prisma";
import { requireHRManager } from "@/lib/auth-guard";

const TASK_KEYS = [
  "RESIDENCE",
  "COMMUTING",
  "DEPENDENTS",
  "CERTIFICATIONS",
  "BANK_ACCOUNT",
  "MY_NUMBER",
] as const;

type TaskKey = (typeof TASK_KEYS)[number];
type ItemStatus = "completed" | "skipped" | "pending";

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
  searchParams?: Promise<{ status?: string }>;
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

    const itemStatus: Record<TaskKey, ItemStatus> = {
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

    const taskLabels: Record<TaskKey, string> = {
      RESIDENCE: "住居",
      COMMUTING: "通勤",
      DEPENDENTS: "扶養",
      CERTIFICATIONS: "免許・資格等",
      BANK_ACCOUNT: "口座",
      MY_NUMBER: "マイナンバー",
    };

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

  const filteredRows = rows.filter((row) => {
    if (filterStatus === "completed") {
      return row.status === "完了";
    }

    if (filterStatus === "incomplete") {
      return row.status !== "完了";
    }

    return true;
  });

  return (
    <main className="space-y-6">
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
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
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
      </div>

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

      <div className="overflow-x-auto rounded-lg border bg-white shadow-sm">
        <table className="min-w-[1250px] text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3 text-left">職員番号</th>
              <th className="p-3 text-left">氏名</th>
              <th className="p-3 text-left">施設</th>
              <th className="p-3 text-left">部署</th>
              <th className="p-3 text-center">住所</th>
              <th className="p-3 text-center">通勤</th>
              <th className="p-3 text-center">扶養</th>
              <th className="p-3 text-center">資格</th>
              <th className="p-3 text-center">口座</th>
              <th className="p-3 text-center">個人番号</th>
              <th className="p-3 text-left">不足項目</th>
              <th className="p-3 text-center">進捗</th>
              <th className="p-3 text-center">状態</th>
              <th className="p-3 text-center">入職後</th>
              <th className="p-3 text-center">フォロー</th>
              <th className="p-3 text-center">操作</th>
            </tr>
          </thead>
          <tbody>
            {filteredRows.map((row) => (
              <tr key={row.employee.id} className="border-t">
                <td className="p-3">{row.employee.employeeNo}</td>
                <td className="p-3">
                  <Link
                    href={`/employees/${row.employee.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    {row.employee.lastName} {row.employee.firstName}
                  </Link>
                </td>
                <td className="p-3">{row.employee.facility?.name ?? "-"}</td>
                <td className="p-3">{row.employee.department?.name ?? "-"}</td>
                {TASK_KEYS.map((key) => {
                  const itemSt = row.itemStatus[key];
                  return (
                    <td key={key} className="p-3 text-center">
                      <span
                        className={`inline-block rounded px-2 py-0.5 text-xs font-medium ${getStatusClass(
                          itemSt,
                        )}`}
                      >
                        {getStatusLabel(itemSt)}
                      </span>
                    </td>
                  );
                })}
                <td className="p-3">
                  {row.missingItems.length > 0 ? (
                    <div className="flex flex-wrap gap-1">
                      {row.missingItems.map((item) => (
                        <span
                          key={item}
                          className="rounded bg-yellow-100 px-2 py-0.5 text-xs text-yellow-800 whitespace-nowrap"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span className="text-xs text-green-700 font-medium">なし</span>
                  )}
                </td>

                <td className="p-3 text-center font-medium">
                  {row.progress}/{TASK_KEYS.length}
                </td>
                <td className="p-3 text-center">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      row.status === "完了"
                        ? "bg-green-100 text-green-800"
                        : row.status === "進行中"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {row.status}
                  </span>
                </td>

                <td className="p-3 text-center text-xs text-gray-600">
                  {row.daysSinceHire !== null ? `${row.daysSinceHire}日` : "-"}
                </td>

                <td className="p-3 text-center">
                  {row.needsFollowUp ? (
                    <span className="inline-flex items-center rounded bg-red-100 px-2 py-0.5 text-xs font-medium text-red-800">
                      要フォロー
                    </span>
                  ) : (
                    <span className="text-xs text-gray-400">-</span>
                  )}
                </td>

                <td className="p-3 text-center text-xs text-gray-600">
                  {row.daysSinceHire !== null ? `${row.daysSinceHire}日` : "-"}
                </td>

                <td className="p-3 text-center">
                  {row.needsFollowUp ? (
                    <span className="inline-flex items-center rounded bg-red-100 px-2 py-0.5 text-xs font-medium text-red-800">
                      要対応
                    </span>
                  ) : (
                    <span className="text-xs text-gray-400">-</span>
                  )}
                </td>

                <td className="p-3 text-center">
                  <Link
                    href={`/employees/${row.employee.id}`}
                    className="text-xs text-blue-600 hover:underline"
                  >
                    詳細
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
