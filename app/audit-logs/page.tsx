import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { requireHRManager } from "@/lib/auth-guard";

type Props = {
  searchParams: Promise<{
    q?: string;
    action?: string;
    targetType?: string;
    from?: string;
    to?: string;
  }>;
};

export default async function AuditLogsPage({
  searchParams,
}: Props) {
  await requireHRManager();
  const params = await searchParams;

  const q = params.q?.trim();
  const action = params.action?.trim();
  const targetType = params.targetType?.trim();
  const from = params.from?.trim();
  const to = params.to?.trim();

  const createdAtFilter =
    from || to
      ? {
          createdAt: {
            ...(from ? { gte: new Date(`${from}T00:00:00`) } : {}),
            ...(to ? { lte: new Date(`${to}T23:59:59`) } : {}),
          },
        }
      : {};

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
        createdAtFilter,
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
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          監査ログ
        </h1>

        <div className="flex gap-2">
          <a
            href="/api/audit-logs/export"
            className="rounded border border-gray-300 bg-white px-4 py-2 text-sm font-medium hover:bg-gray-50"
          >
            CSVエクスポート
          </a>

          <a
            href="/api/audit-logs/export-excel"
            className="rounded bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
          >
            Excelエクスポート
          </a>
        </div>
      </div>

      <form className="mb-6 rounded-lg border bg-white p-4">
        <div className="grid gap-3 md:grid-cols-6">
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

          <input
            type="date"
            name="from"
            defaultValue={from}
            className="rounded border p-2"
          />

          <input
            type="date"
            name="to"
            defaultValue={to}
            className="rounded border p-2"
          />

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
              <th className="border-b p-3">詳細</th>
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

                <td className="border-b p-3">
                  <Link href={`/audit-logs/${log.id}`}>
                    詳細
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-6">
        <Link
          href="/"
          className="text-sm text-blue-600 hover:underline"
        >
          ← ダッシュボードに戻る
        </Link>
      </div>
    </main>
  );
}
