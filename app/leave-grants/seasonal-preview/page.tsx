import BackLink from "@/components/BackLink";
import {
  grantSummerLeave,
  grantWinterLeave,
} from "@/app/actions/seasonal-leave-grant";
import { requireHRManager } from "@/lib/auth-guard";
import { prisma } from "@/lib/prisma";

function formatDate(value: Date | null) {
  return value ? new Intl.DateTimeFormat("ja-JP").format(value) : "未設定";
}

export default async function SeasonalLeavePreviewPage() {
  await requireHRManager();

  const year = new Date().getFullYear();
  const summerBaseDate = new Date(year, 4, 31);

  const employees = await prisma.employee.findMany({
    where: {
      status: "ACTIVE",
      employmentType: "FULL_TIME",
    },
    include: {
      department: true,
    },
    orderBy: {
      employeeNo: "asc",
    },
  });

  const existingGrants = await prisma.leaveGrantHistory.findMany({
    where: {
      OR: [
        {
          note: {
            contains: `AUTO_SUMMER:${year}`,
          },
        },
        {
          note: {
            contains: `AUTO_WINTER:${year}`,
          },
        },
      ],
    },
    select: {
      employeeId: true,
      note: true,
    },
  });

  const summerGrantedIds = new Set(
    existingGrants
      .filter((grant) => grant.note?.includes(`AUTO_SUMMER:${year}`))
      .map((grant) => grant.employeeId),
  );

  const winterGrantedIds = new Set(
    existingGrants
      .filter((grant) => grant.note?.includes(`AUTO_WINTER:${year}`))
      .map((grant) => grant.employeeId),
  );

  const rows = employees.map((employee) => {
    let summerDays: number | null = null;

    if (employee.hireDate) {
      const oneYearDate = new Date(employee.hireDate);
      oneYearDate.setFullYear(oneYearDate.getFullYear() + 1);

      summerDays = oneYearDate <= summerBaseDate ? 4 : 2;
    }

    return {
      ...employee,
      summerDays,
      summerGranted: summerGrantedIds.has(employee.id),
      winterDays: 4,
      winterGranted: winterGrantedIds.has(employee.id),
    };
  });

  const pendingSummer = rows.filter(
    (row) => row.summerDays !== null && !row.summerGranted,
  );

  const pendingWinter = rows.filter((row) => !row.winterGranted);

  return (
    <main className="mx-auto max-w-7xl p-6">
      <BackLink href="/leave-grants" label="有休付与管理に戻る" />

      <div className="mb-6">
        <h1 className="text-2xl font-bold">季節休暇付与対象者確認</h1>

        <p className="mt-2 text-sm text-gray-600">
          {year}年度の正職員を対象に、夏季・冬季休暇の 付与予定を確認します。
        </p>
      </div>

      <div className="mb-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg border bg-orange-50 p-4">
          <p className="text-sm text-gray-600">夏季休暇 未付与対象</p>
          <p className="mt-1 text-2xl font-bold text-orange-800">
            {pendingSummer.length}人
          </p>

          <form action={grantSummerLeave} className="mt-4">
            <button
              type="submit"
              disabled={pendingSummer.length === 0}
              className="rounded bg-orange-600 px-4 py-2 text-sm font-medium text-white hover:bg-orange-700 disabled:bg-gray-300"
            >
              夏季休暇を付与
            </button>
          </form>
        </div>

        <div className="rounded-lg border bg-cyan-50 p-4">
          <p className="text-sm text-gray-600">冬季休暇 未付与対象</p>
          <p className="mt-1 text-2xl font-bold text-cyan-800">
            {pendingWinter.length}人
          </p>

          <form action={grantWinterLeave} className="mt-4">
            <button
              type="submit"
              disabled={pendingWinter.length === 0}
              className="rounded bg-cyan-700 px-4 py-2 text-sm font-medium text-white hover:bg-cyan-800 disabled:bg-gray-300"
            >
              冬季休暇を付与
            </button>
          </form>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border bg-white shadow-sm">
        <table className="w-full text-left text-sm text-gray-600">
          <thead className="bg-gray-50 text-xs uppercase text-gray-700">
            <tr>
              <th className="px-4 py-3">社員番号</th>
              <th className="px-4 py-3">氏名</th>
              <th className="px-4 py-3">部署</th>
              <th className="px-4 py-3">入社日</th>
              <th className="px-4 py-3 text-center">夏季付与日数</th>
              <th className="px-4 py-3 text-center">夏季ステータス</th>
              <th className="px-4 py-3 text-center">冬季付与日数</th>
              <th className="px-4 py-3 text-center">冬季ステータス</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {rows.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-900">
                  {row.employeeNo}
                </td>
                <td className="px-4 py-3 font-medium text-gray-900">
                  {row.lastName} {row.firstName}
                </td>
                <td className="px-4 py-3">{row.department?.name ?? "-"}</td>
                <td className="px-4 py-3">{formatDate(row.hireDate)}</td>
                <td className="px-4 py-3 text-center">
                  {row.summerDays !== null ? `${row.summerDays}日` : "-"}
                </td>
                <td className="px-4 py-3 text-center">
                  {row.summerGranted ? (
                    <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                      付与済
                    </span>
                  ) : (
                    <span className="inline-flex rounded-full bg-yellow-100 px-2 text-xs font-semibold leading-5 text-yellow-800">
                      未付与
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 text-center">{row.winterDays}日</td>
                <td className="px-4 py-3 text-center">
                  {row.winterGranted ? (
                    <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                      付与済
                    </span>
                  ) : (
                    <span className="inline-flex rounded-full bg-yellow-100 px-2 text-xs font-semibold leading-5 text-yellow-800">
                      未付与
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
