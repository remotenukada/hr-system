import BackLink from "@/components/BackLink";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { requireManager } from "@/lib/auth-guard";

type Props = {
  searchParams: Promise<{
    month?: string;
  }>;
};

export default async function LeaveCalendarPage({
  searchParams,
}: Props) {
  await requireManager();

  const params = await searchParams;

  const currentMonth =
    params.month ??
    new Date().toISOString().slice(0, 7);

  const startDate = new Date(`${currentMonth}-01`);

  const endDate = new Date(startDate);
  endDate.setMonth(endDate.getMonth() + 1);

  const requests = await prisma.employeeRequest.findMany({
    where: {
      type: "PAID_LEAVE",
      status: "APPROVED",
      leaveStartDate: {
        gte: startDate,
        lt: endDate,
      },
    },
    include: {
      employee: true,
    },
    orderBy: {
      leaveStartDate: "asc",
    },
  });

  return (
    <main className="mx-auto max-w-6xl p-8">
      <BackLink href="/" label="ダッシュボードへ戻る" />
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          有給取得予定
        </h1>

        <form>
          <input
            type="month"
            name="month"
            defaultValue={currentMonth}
            className="rounded border p-2"
          />

          <button
            type="submit"
            className="ml-2 rounded bg-blue-600 px-4 py-2 text-white"
          >
            表示
          </button>
        </form>
      </div>

      <p className="mb-4 text-sm text-gray-500">
        {currentMonth} の有給取得予定: {requests.length}件
      </p>

      <div className="overflow-x-auto rounded border bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50">
              <th className="p-3 text-left">開始日</th>
              <th className="p-3 text-left">終了日</th>
              <th className="p-3 text-left">社員</th>
              <th className="p-3 text-left">日数</th>
              <th className="p-3 text-left">タイトル</th>
            </tr>
          </thead>

          <tbody>
            {requests.map((request) => (
              <tr key={request.id} className="border-t">
                <td className="p-3">
                  {request.leaveStartDate?.toLocaleDateString("ja-JP") ?? "-"}
                </td>

                <td className="p-3">
                  {request.leaveEndDate?.toLocaleDateString("ja-JP") ?? "-"}
                </td>

                <td className="p-3">
                  {request.employee
                    ? `${request.employee.lastName} ${request.employee.firstName}`
                    : "-"}
                </td>

                <td className="p-3">
                  {request.leaveDays ?? 0}日
                </td>

                <td className="p-3">
                  <Link href={`/requests/${request.id}`}>
                    {request.title}
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6">
        <Link href="/">
          ← ダッシュボードへ戻る
        </Link>
      </div>
    </main>
  );
}
