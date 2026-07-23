import { prisma } from "@/lib/prisma";

type Props = {
  searchParams: Promise<{
    q?: string;
    action?: string;
    targetType?: string;
  }>;
};

export default async function AuditLogsPage({
  searchParams,
}: Props) {
  const params = await searchParams;

  const q = params.q?.trim();
  const action = params.action?.trim();
  const targetType = params.targetType?.trim();

  const logs = await prisma.auditLog.findMany({
    where: {
      AND: [
        action
          ? {
              action,
            }
          : {},
        targetType
          ? {
              targetType,
            }
          : {},
        q
          ? {
              OR: [
                {
                  userName: {
                    contains: q,
                    mode: "insensitive",
                  },
                },
                {
                  description: {
                    contains: q,
                    mode: "insensitive",
                  },
                },
                {
                  targetId: {
                    contains: q,
                    mode: "insensitive",
                  },
                },
              ],
            }
          : {},
      ],
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 500,
  });

  const actions = await prisma.auditLog.findMany({
    distinct: ["action"],
    select: {
      action: true,
    },
    orderBy: {
      action: "asc",
    },
  });

  const targetTypes = await prisma.auditLog.findMany({
    distinct: ["targetType"],
    select: {
      targetType: true,
    },
    orderBy: {
      targetType: "asc",
    },
  });

  return (
    <main className="mx-auto max-w-7xl p-8">
      <h1 className="mb-6 text-3xl font-bold">
        監査ログ
      </h1>

      <form className="mb-6 rounded-lg border bg-white p-4">
        <div className="grid gap-3 md:grid-cols-4">
          <input
            name="q"
            defaultValue={q}
            placeholder="ユーザー名・内容・対象ID"
            className="rounded border p-2"
          />

          <select
            name="action"
            defaultValue={action}
            className="rounded border p-2"
          >
            <option value="">全アクション</option>

            {actions.map((item) => (
              <option
                key={item.action}
                value={item.action}
              >
                {item.action}
              </option>
            ))}
          </select>

          <select
            name="targetType"
            defaultValue={targetType}
            className="rounded border p-2"
          >
            <option value="">全対象</option>

            {targetTypes.map((item) => (
              <option
                key={item.targetType}
                value={item.targetType}
              >
                {item.targetType}
              </option>
            ))}
          </select>

          <button
            type="submit"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            検索
          </button>
        </div>
      </form>

      <p className="mb-4 text-sm text-gray-500">
        {logs.length} 件
      </p>

      <div className="overflow-x-auto rounded-lg border bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 text-left">
              <th className="border-b p-3">日時</th>
              <th className="border-b p-3">アクション</th>
              <th className="border-b p-3">対象</th>
              <th className="border-b p-3">対象ID</th>
              <th className="border-b p-3">ユーザー</th>
              <th className="border-b p-3">内容</th>
            </tr>
          </thead>

          <tbody>
            {logs.map((log) => (
              <tr key={log.id}>
                <td className="border-b p-3">
                  {new Date(log.createdAt).toLocaleString(
                    "ja-JP"
                  )}
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
                  {log.userName ?? "-"}
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
