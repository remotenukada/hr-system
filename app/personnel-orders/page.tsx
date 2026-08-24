import BackLink from "@/components/BackLink";
import { prisma } from "@/lib/prisma";

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
                  {history.action}
                </td>

                <td className="border p-2">
                  {history.reason || "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
