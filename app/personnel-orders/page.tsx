import BackLink from "@/components/BackLink";
import Link from "next/link";
import { prisma } from "@/lib/prisma";


function getActionColor(action: string) {
  const colors: Record<string, string> = {
    HIRED: "bg-green-100 text-green-700",
    TRANSFER: "bg-blue-100 text-blue-700",
    POSITION_CHANGE: "bg-purple-100 text-purple-700",
    LEAVE_STARTED: "bg-yellow-100 text-yellow-700",
    RETURNED: "bg-green-100 text-green-700",
    RETIRED: "bg-red-100 text-red-700",
  };

  return colors[action] ?? "bg-gray-100 text-gray-700";
}

function getActionLabel(action: string) {
  const labels: Record<string, string> = {
    HIRED: "採用",
    TRANSFER: "異動",
    POSITION_CHANGE: "役職変更",
    LEAVE_STARTED: "休職",
    RETURNED: "復職",
    RETIRED: "退職",
  };

  return labels[action] ?? action;
}


export default async function PersonnelOrdersPage() {
  const histories = await prisma.employmentHistory.findMany({
    include: {
      employee: true,
    },
    orderBy: {
      effectiveDate: "desc",
    },
  });

  return (
    <main className="mx-auto max-w-7xl p-6">
      <BackLink href="/" label="ダッシュボードに戻る" />

      <h1 className="mb-6 text-2xl font-bold">
        人事発令管理
      </h1>

      <div className="overflow-x-auto rounded-lg border bg-white">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="border p-2 text-left">発令日</th>
              <th className="border p-2 text-left">社員番号</th>
              <th className="border p-2 text-left">氏名</th>
              <th className="border p-2 text-left">区分</th>
              <th className="border p-2 text-left">内容</th>
            </tr>
          </thead>

          <tbody>
            {histories.map((history) => (
              <tr key={history.id}>
                <td className="border p-2">
                  {new Date(
                    history.effectiveDate,
                  ).toLocaleDateString("ja-JP")}
                </td>

                <td className="border p-2">
                  {history.employee.employeeNo}
                </td>

                <td className="border p-2">
                  {history.employee.lastName} {history.employee.firstName}
                </td>

                <td className="border p-2">
                  <span
                    className={`rounded-full px-2 py-1 text-xs font-medium ${getActionColor(history.action)}`}
                  >
                    {getActionLabel(history.action)}
                  </span>
                </td>

                <td className="border p-2">
                  <Link
                    href={`/personnel-orders/${history.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    {history.reason || "-"}
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
