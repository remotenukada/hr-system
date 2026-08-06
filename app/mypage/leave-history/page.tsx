import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

function formatDate(date: Date) {
  return date.toLocaleDateString("ja-JP");
}

function formatGrantType(type: string) {
  const labels: Record<string, string> = {
    LEGAL: "法定付与",
    SPECIAL: "特別休暇",
    MANUAL: "手動付与",
    MANUAL_DEDUCT: "手動減算",
    MANUAL_CANCEL: "取消",
  };

  return labels[type] ?? type;
}

export default async function LeaveHistoryPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const employee = await prisma.employee.findUnique({
    where: {
      userId: session.user.id,
    },
    include: {
      leaveBalance: true,
      leaveGrantHistories: {
        orderBy: {
          grantDate: "desc",
        },
      },
    },
  });

  if (!employee) {
    redirect("/mypage");
  }

  const remainingDays = employee.leaveBalance
    ? employee.leaveBalance.grantedDays -
      employee.leaveBalance.usedDays
    : 0;

  return (
    <main className="mx-auto max-w-5xl p-8">
      <div className="mb-6">
        <Link
          href="/mypage"
          className="text-sm text-blue-600 hover:underline"
        >
          ← マイページへ戻る
        </Link>

        <h1 className="mt-2 text-3xl font-bold">
          有給履歴
        </h1>
      </div>

      <section className="mb-8 rounded border bg-white p-6">
        <h2 className="mb-4 text-xl font-bold">
          現在の有給残数
        </h2>

        <div className="text-3xl font-bold text-blue-600">
          {remainingDays}日
        </div>

        <div className="mt-3 text-sm text-gray-500">
          付与: {employee.leaveBalance?.grantedDays ?? 0}日 /
          使用: {employee.leaveBalance?.usedDays ?? 0}日
        </div>
      </section>

      <section className="rounded border bg-white p-6">
        <h2 className="mb-4 text-xl font-bold">
          有給付与履歴
        </h2>

        {employee.leaveGrantHistories.length === 0 ? (
          <p className="text-sm text-gray-500">
            履歴はありません。
          </p>
        ) : (
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b bg-gray-50 text-left">
                <th className="p-3">付与日</th>
                <th className="p-3">種別</th>
                <th className="p-3">日数</th>
                <th className="p-3">備考</th>
              </tr>
            </thead>

            <tbody>
              {employee.leaveGrantHistories.map((history) => (
                <tr key={history.id} className="border-b">
                  <td className="p-3">
                    {formatDate(history.grantDate)}
                  </td>

                  <td className="p-3">
                    {formatGrantType(history.grantType)}
                  </td>

                  <td className="p-3">
                    {history.grantedDays}日
                  </td>

                  <td className="p-3">
                    {history.note ?? "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </main>
  );
}
