import { prisma } from "@/lib/prisma";

export default async function AuditLogsPage() {
  const logs = await prisma.auditLog.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 500,
  });

  return (
    <main className="mx-auto max-w-7xl p-8">
      <h1 className="mb-6 text-3xl font-bold">
        監査ログ
      </h1>

      <div className="overflow-x-auto rounded-lg border bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 text-left">
              <th className="border-b p-3">日時</th>
              <th className="border-b p-3">アクション</th>
              <th className="border-b p-3">対象</th>
              <th className="border-b p-3">対象ID</th>
              <th className="border-b p-3">内容</th>
            </tr>
          </thead>

          <tbody>
            {logs.map((log) => (
              <tr key={log.id}>
                <td className="border-b p-3">
                  {new Date(log.createdAt).toLocaleString("ja-JP")}
                </td>

                <td className="border-b p-3 font-medium">
                  {log.action}
                </td>

                <td className="border-b p-3">
                  {log.targetType}
                </td>

                <td className="border-b p-3 font-mono text-xs">
                  {log.targetId}
                </td>

                <td className="border-b p-3">
                  {log.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
