import BackLink from "@/components/BackLink";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { requireManager } from "@/lib/auth-guard";

const DAY_MS = 24 * 60 * 60 * 1000;

function getTodayOnly() {
  const today = new Date();

  return new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  );
}

function addYears(date: Date, years: number) {
  const result = new Date(date);
  result.setFullYear(result.getFullYear() + years);
  return result;
}

function getDaysBetween(from: Date, to: Date) {
  const fromOnly = new Date(
    from.getFullYear(),
    from.getMonth(),
    from.getDate(),
  );

  const toOnly = new Date(
    to.getFullYear(),
    to.getMonth(),
    to.getDate(),
  );

  return Math.floor(
    (toOnly.getTime() - fromOnly.getTime()) / DAY_MS,
  );
}

function getStatusLabel(
  acquiredDays: number,
  daysUntilDue: number,
) {
  if (acquiredDays >= 5) {
    return "達成";
  }

  if (daysUntilDue < 0) {
    return "期限切れ";
  }

  return "未達";
}

function getStatusClass(
  acquiredDays: number,
  daysUntilDue: number,
) {
  if (acquiredDays >= 5) {
    return "rounded bg-green-100 px-2 py-1 text-xs font-medium text-green-700";
  }

  if (daysUntilDue < 0) {
    return "rounded bg-red-100 px-2 py-1 text-xs font-medium text-red-700";
  }

  if (daysUntilDue <= 30) {
    return "rounded bg-red-50 px-2 py-1 text-xs font-medium text-red-700";
  }

  if (daysUntilDue <= 90) {
    return "rounded bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-700";
  }

  return "rounded bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700";
}

export default async function LeaveCompliancePage() {
  await requireManager();

  const today = getTodayOnly();

  const grants =
    await prisma.leaveGrantHistory.findMany({
      where: {
        grantedDays: {
          gte: 10,
        },
        grantType: {
          in: ["LEGAL", "MANUAL"],
        },
        grantDate: {
          lte: today,
        },
        employee: {
          status: "ACTIVE",
        },
      },
      include: {
        employee: true,
      },
      orderBy: {
        grantDate: "desc",
      },
    });

  const employeeIds = Array.from(
    new Set(grants.map((grant) => grant.employeeId)),
  );

  const approvedLeaveRequests =
    await prisma.employeeRequest.findMany({
      where: {
        type: "PAID_LEAVE",
        status: "APPROVED",
        employeeId: {
          in: employeeIds,
        },
      },
      select: {
        employeeId: true,
        leaveStartDate: true,
        leaveDays: true,
      },
    });

  const rows = grants.map((grant) => {
    const dueDate = addYears(grant.grantDate, 1);

    const acquiredDays = approvedLeaveRequests
      .filter((request) => {
        if (
          !request.employeeId ||
          !request.leaveStartDate ||
          !request.leaveDays
        ) {
          return false;
        }

        return (
          request.employeeId === grant.employeeId &&
          request.leaveStartDate >= grant.grantDate &&
          request.leaveStartDate < dueDate
        );
      })
      .reduce(
        (sum, request) => sum + (request.leaveDays ?? 0),
        0,
      );

    const remainingRequiredDays = Math.max(
      0,
      5 - acquiredDays,
    );

    const elapsedDays = getDaysBetween(
      grant.grantDate,
      today,
    );

    const daysUntilDue = getDaysBetween(
      today,
      dueDate,
    );

    return {
      id: grant.id,
      employeeName: grant.employee
        ? `${grant.employee.lastName} ${grant.employee.firstName}`
        : "-",
      employeeNo: grant.employee?.employeeNo ?? "-",
      grantDate: grant.grantDate,
      dueDate,
      grantedDays: grant.grantedDays,
      acquiredDays,
      remainingRequiredDays,
      elapsedDays,
      daysUntilDue,
      statusLabel: getStatusLabel(
        acquiredDays,
        daysUntilDue,
      ),
      statusClass: getStatusClass(
        acquiredDays,
        daysUntilDue,
      ),
    };
  });

  const notCompletedRows = rows.filter(
    (row) => row.remainingRequiredDays > 0,
  );

  const expiredRows = notCompletedRows.filter(
    (row) => row.daysUntilDue < 0,
  );

  const warningRows = notCompletedRows.filter(
    (row) =>
      row.daysUntilDue >= 0 &&
      row.daysUntilDue <= 30,
  );

  return (
    <main className="mx-auto max-w-7xl p-8">
      <BackLink href="/" label="ダッシュボードへ戻る" />
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            年5日取得義務管理
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            10日以上付与された有給について、付与日から1年以内の5日取得状況を確認します。
          </p>
        </div>

        <div className="flex gap-2">
          <a
            href="/api/leave-compliance/export"
            className="rounded border bg-white px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
          >
            CSV出力
          </a>

          <a
            href="/api/leave-compliance/export-excel"
            className="rounded border bg-white px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
          >
            Excel出力
          </a>

          <Link
            href="/"
            className="rounded border bg-white px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
          >
            ダッシュボードへ戻る
          </Link>
        </div>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded border bg-white p-4">
          <p className="text-xs text-gray-500">
            未達件数
          </p>
          <p className="mt-1 text-2xl font-bold text-red-700">
            {notCompletedRows.length}件
          </p>
        </div>

        <div className="rounded border bg-white p-4">
          <p className="text-xs text-gray-500">
            期限切れ
          </p>
          <p className="mt-1 text-2xl font-bold text-red-700">
            {expiredRows.length}件
          </p>
        </div>

        <div className="rounded border bg-white p-4">
          <p className="text-xs text-gray-500">
            30日以内警告
          </p>
          <p className="mt-1 text-2xl font-bold text-yellow-700">
            {warningRows.length}件
          </p>
        </div>
      </div>

      <div className="overflow-x-auto rounded border bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50">
              <th className="p-3 text-left">社員番号</th>
              <th className="p-3 text-left">社員</th>
              <th className="p-3 text-left">付与日</th>
              <th className="p-3 text-left">期限日</th>
              <th className="p-3 text-right">付与日数</th>
              <th className="p-3 text-right">取得済</th>
              <th className="p-3 text-right">残必要</th>
              <th className="p-3 text-right">経過日数</th>
              <th className="p-3 text-right">期限まで</th>
              <th className="p-3 text-left">状態</th>
            </tr>
          </thead>

          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td
                  colSpan={10}
                  className="p-8 text-center text-gray-500"
                >
                  年5日取得義務の対象データはありません。
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr
                  key={row.id}
                  className="border-t"
                >
                  <td className="p-3">
                    {row.employeeNo}
                  </td>

                  <td className="p-3 font-medium">
                    {row.employeeName}
                  </td>

                  <td className="p-3">
                    {row.grantDate.toLocaleDateString("ja-JP")}
                  </td>

                  <td className="p-3">
                    {row.dueDate.toLocaleDateString("ja-JP")}
                  </td>

                  <td className="p-3 text-right">
                    {row.grantedDays.toFixed(1)}
                  </td>

                  <td className="p-3 text-right">
                    {row.acquiredDays.toFixed(1)}
                  </td>

                  <td className="p-3 text-right font-medium">
                    {row.remainingRequiredDays.toFixed(1)}
                  </td>

                  <td className="p-3 text-right">
                    {row.elapsedDays}日
                  </td>

                  <td className="p-3 text-right">
                    {row.daysUntilDue < 0
                      ? `${Math.abs(row.daysUntilDue)}日経過`
                      : `${row.daysUntilDue}日`}
                  </td>

                  <td className="p-3">
                    <span className={row.statusClass}>
                      {row.statusLabel}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}
