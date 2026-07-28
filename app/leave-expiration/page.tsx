import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { requireHRManager } from "@/lib/auth-guard";

const DAY_MS = 24 * 60 * 60 * 1000;

function addYears(date: Date, years: number) {
  const result = new Date(date);
  result.setFullYear(result.getFullYear() + years);
  return result;
}

function getDaysUntil(date: Date) {
  const today = new Date();

  const todayOnly = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  );

  const targetOnly = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
  );

  return Math.ceil(
    (targetOnly.getTime() - todayOnly.getTime()) / DAY_MS,
  );
}

function formatGrantType(type: string) {
  const labels: Record<string, string> = {
    LEGAL: "法定付与",
    SPECIAL: "特別休暇",
    MANUAL: "手動付与",
  };

  return labels[type] ?? type;
}

function getStatusLabel(daysUntil: number) {
  if (daysUntil < 0) {
    return "失効済";
  }

  if (daysUntil <= 30) {
    return "30日以内";
  }

  return "予定";
}

function getStatusClass(daysUntil: number) {
  if (daysUntil < 0) {
    return "rounded bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600";
  }

  if (daysUntil <= 30) {
    return "rounded bg-red-50 px-2 py-1 text-xs font-medium text-red-700";
  }

  return "rounded bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700";
}

export default async function LeaveExpirationPage() {
  await requireHRManager();

  const grants = await prisma.leaveGrantHistory.findMany({
    where: {
      grantType: {
        in: ["LEGAL", "SPECIAL", "MANUAL"],
      },
      employee: {
        status: "ACTIVE",
      },
    },
    include: {
      employee: true,
    },
    orderBy: {
      grantDate: "asc",
    },
  });

  const expirationRows = grants.map((grant) => {
    const expirationDate = addYears(
      new Date(grant.grantDate),
      2,
    );

    const daysUntil = getDaysUntil(expirationDate);

    return {
      id: grant.id,
      employeeNo: grant.employee.employeeNo,
      name: `${grant.employee.lastName} ${grant.employee.firstName}`,
      grantDate: grant.grantDate,
      expirationDate,
      daysUntil,
      days: grant.grantedDays,
      grantType: grant.grantType,
      note: grant.note,
    };
  });

  const soonRows = expirationRows.filter(
    (row) => row.daysUntil >= 0 && row.daysUntil <= 30,
  );

  const soonDaysTotal = soonRows.reduce(
    (sum, row) => sum + row.days,
    0,
  );

  return (
    <main className="p-8">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">
            有給失効管理
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            付与日から2年後に失効する有給を確認します。
          </p>

          <div className="mt-4 flex flex-wrap gap-3">
            <div className="rounded border bg-white px-4 py-3">
              <p className="text-xs text-gray-500">
                30日以内の失効件数
              </p>
              <p className="text-xl font-bold text-red-700">
                {soonRows.length}件
              </p>
            </div>

            <div className="rounded border bg-white px-4 py-3">
              <p className="text-xs text-gray-500">
                30日以内の失効日数
              </p>
              <p className="text-xl font-bold text-red-700">
                {soonDaysTotal.toFixed(1)}日
              </p>
            </div>

            <div className="rounded border bg-white px-4 py-3">
              <p className="text-xs text-gray-500">
                表示件数
              </p>
              <p className="text-xl font-bold text-gray-800">
                {expirationRows.length}件
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <Link
            href="/leave-balances"
            className="rounded border border-gray-300 bg-white px-4 py-2 text-sm font-medium hover:bg-gray-50"
          >
            有給管理一覧へ
          </Link>

          <Link
            href="/leave-grants"
            className="rounded border border-gray-300 bg-white px-4 py-2 text-sm font-medium hover:bg-gray-50"
          >
            有給付与履歴へ
          </Link>
        </div>
      </div>

      <div className="overflow-x-auto rounded border bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 text-left">
              <th className="p-3">社員番号</th>
              <th className="p-3">氏名</th>
              <th className="p-3">付与日</th>
              <th className="p-3">失効予定日</th>
              <th className="p-3">残り日数</th>
              <th className="p-3">失効予定日数</th>
              <th className="p-3">区分</th>
              <th className="p-3">状態</th>
              <th className="p-3">備考</th>
            </tr>
          </thead>

          <tbody>
            {expirationRows.length === 0 ? (
              <tr>
                <td
                  colSpan={9}
                  className="p-8 text-center text-gray-500"
                >
                  失効管理対象の有給はありません。
                </td>
              </tr>
            ) : (
              expirationRows.map((row) => (
                <tr
                  key={row.id}
                  className={
                    row.daysUntil >= 0 && row.daysUntil <= 30
                      ? "border-t bg-red-50"
                      : "border-t"
                  }
                >
                  <td className="p-3">
                    {row.employeeNo}
                  </td>

                  <td className="p-3 font-medium">
                    {row.name}
                  </td>

                  <td className="p-3">
                    {new Date(row.grantDate).toLocaleDateString("ja-JP")}
                  </td>

                  <td className="p-3 font-medium text-red-700">
                    {row.expirationDate.toLocaleDateString("ja-JP")}
                  </td>

                  <td className="p-3">
                    {row.daysUntil < 0
                      ? `${Math.abs(row.daysUntil)}日経過`
                      : `${row.daysUntil}日`}
                  </td>

                  <td className="p-3 font-medium">
                    {row.days.toFixed(1)}日
                  </td>

                  <td className="p-3">
                    {formatGrantType(row.grantType)}
                  </td>

                  <td className="p-3">
                    <span className={getStatusClass(row.daysUntil)}>
                      {getStatusLabel(row.daysUntil)}
                    </span>
                  </td>

                  <td className="p-3">
                    {row.note ?? "-"}
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
