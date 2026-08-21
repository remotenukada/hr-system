import BackLink from "@/components/BackLink";
import Link from "next/link";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireHRManager } from "@/lib/auth-guard";
import { logAudit } from "@/lib/audit-log";

const DAY_MS = 24 * 60 * 60 * 1000;

function addYears(date: Date, years: number) {
  const result = new Date(date);
  result.setFullYear(result.getFullYear() + years);
  return result;
}

function getTodayOnly() {
  const today = new Date();

  return new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  );
}

function getDaysUntil(date: Date) {
  const todayOnly = getTodayOnly();

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
    EXPIRED: "失効",
  };

  return labels[type] ?? type;
}

function getExpiredSourceId(note: string | null) {
  if (!note?.includes("失効元:")) {
    return null;
  }

  return note.split("失効元:")[1]?.split(" ")[0] ?? null;
}

function getStatusLabel(
  daysUntil: number,
  alreadyExpired: boolean,
) {
  if (alreadyExpired) {
    return "失効処理済";
  }

  if (daysUntil < 0) {
    return "失効対象";
  }

  if (daysUntil <= 30) {
    return "30日以内";
  }

  return "予定";
}

function getStatusClass(
  daysUntil: number,
  alreadyExpired: boolean,
) {
  if (alreadyExpired) {
    return "rounded bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600";
  }

  if (daysUntil < 0) {
    return "rounded bg-red-100 px-2 py-1 text-xs font-medium text-red-700";
  }

  if (daysUntil <= 30) {
    return "rounded bg-red-50 px-2 py-1 text-xs font-medium text-red-700";
  }

  return "rounded bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700";
}

async function expireLeave() {
  "use server";

  const session = await requireHRManager();

  const grants = await prisma.leaveGrantHistory.findMany({
    where: {
      grantType: {
        in: ["LEGAL", "SPECIAL", "MANUAL", "EXPIRED"],
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

  const expiredSourceIds = new Set(
    grants
      .filter((grant) => grant.grantType === "EXPIRED")
      .map((grant) => getExpiredSourceId(grant.note))
      .filter(Boolean),
  );

  const today = getTodayOnly();

  const targets = grants.filter((grant) => {
    if (
      grant.grantType !== "LEGAL" &&
      grant.grantType !== "SPECIAL" &&
      grant.grantType !== "MANUAL"
    ) {
      return false;
    }

    if (expiredSourceIds.has(grant.id)) {
      return false;
    }

    const expirationDate = addYears(
      new Date(grant.grantDate),
      2,
    );

    return expirationDate < today;
  });

  for (const grant of targets) {
    const currentBalance =
      await prisma.leaveBalance.findUnique({
        where: {
          employeeId: grant.employeeId,
        },
      });

    const currentGrantedDays =
      currentBalance?.grantedDays ?? 0;

    const currentUsedDays =
      currentBalance?.usedDays ?? 0;

    const nextGrantedDays = Math.max(
      currentUsedDays,
      currentGrantedDays - grant.grantedDays,
    );

    const updatedBalance =
      await prisma.leaveBalance.upsert({
        where: {
          employeeId: grant.employeeId,
        },
        update: {
          grantedDays: nextGrantedDays,
        },
        create: {
          employeeId: grant.employeeId,
          grantedDays: 0,
          usedDays: 0,
        },
      });

    await prisma.leaveGrantHistory.create({
      data: {
        employeeId: grant.employeeId,
        grantDate: new Date(),
        grantedDays: grant.grantedDays,
        grantType: "EXPIRED",
        note: `失効元:${grant.id} ${formatGrantType(grant.grantType)} ${grant.note ?? ""}`.trim(),
      },
    });

    await logAudit({
      userId: session.user.id,
      userName: session.user.name,
      action: "LEAVE_EXPIRED",
      targetType: "Employee",
      targetId: grant.employeeId,
      description: `${grant.employee.employeeNo} の有給 ${grant.grantedDays}日 を失効処理`,
      beforeData: currentBalance,
      afterData: updatedBalance,
    });
  }

  revalidatePath("/leave-expiration");
  revalidatePath("/leave-balances");
  revalidatePath("/leave-grants");
}

export default async function LeaveExpirationPage() {
  await requireHRManager();

  const grants = await prisma.leaveGrantHistory.findMany({
    where: {
      grantType: {
        in: ["LEGAL", "SPECIAL", "MANUAL", "EXPIRED"],
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

  const expiredSourceIds = new Set(
    grants
      .filter((grant) => grant.grantType === "EXPIRED")
      .map((grant) => getExpiredSourceId(grant.note))
      .filter(Boolean),
  );

  const expirationRows = grants
    .filter((grant) =>
      ["LEGAL", "SPECIAL", "MANUAL"].includes(grant.grantType),
    )
    .map((grant) => {
      const expirationDate = addYears(
        new Date(grant.grantDate),
        2,
      );

      const daysUntil = getDaysUntil(expirationDate);
      const alreadyExpired = expiredSourceIds.has(grant.id);

      return {
        id: grant.id,
        employeeNo: grant.employee.employeeNo,
        name: `${grant.employee.lastName} ${grant.employee.firstName}`,
        grantDate: grant.grantDate,
        expirationDate,
        daysUntil,
        alreadyExpired,
        days: grant.grantedDays,
        grantType: grant.grantType,
        note: grant.note,
      };
    });

  const soonRows = expirationRows.filter(
    (row) =>
      !row.alreadyExpired &&
      row.daysUntil >= 0 &&
      row.daysUntil <= 30,
  );

  const soonDaysTotal = soonRows.reduce(
    (sum, row) => sum + row.days,
    0,
  );

  const expiredTargets = expirationRows.filter(
    (row) =>
      !row.alreadyExpired &&
      row.daysUntil < 0,
  );

  const expiredDaysTotal = expiredTargets.reduce(
    (sum, row) => sum + row.days,
    0,
  );

  return (
    <main className="p-8">
      <BackLink href="/" label="ダッシュボードへ戻る" />
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
                失効実行対象
              </p>
              <p className="text-xl font-bold text-red-700">
                {expiredTargets.length}件 / {expiredDaysTotal.toFixed(1)}日
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
          <form action={expireLeave}>
            <button
              type="submit"
              disabled={expiredTargets.length === 0}
              className="rounded bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:bg-gray-300"
            >
              失効実行
            </button>
          </form>

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
                    !row.alreadyExpired &&
                    row.daysUntil >= 0 &&
                    row.daysUntil <= 30
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
                    <span
                      className={getStatusClass(
                        row.daysUntil,
                        row.alreadyExpired,
                      )}
                    >
                      {getStatusLabel(
                        row.daysUntil,
                        row.alreadyExpired,
                      )}
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
