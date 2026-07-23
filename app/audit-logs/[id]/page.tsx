import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireHRManager } from "@/lib/auth-guard";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function AuditLogDetailPage({
  params,
}: Props) {
  await requireHRManager();

  const { id } = await params;

  const log = await prisma.auditLog.findUnique({
    where: {
      id,
    },
  });

  if (!log) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-6xl p-8">
      <Link href="/audit-logs">
        ← 監査ログ一覧へ戻る
      </Link>

      <h1 className="mt-4 mb-6 text-3xl font-bold">
        監査ログ詳細
      </h1>

      <div className="mb-6 rounded border bg-white p-4">
        <p><strong>アクション:</strong> {log.action}</p>
        <p><strong>対象:</strong> {log.targetType}</p>
        <p><strong>対象ID:</strong> {log.targetId}</p>
        <p><strong>内容:</strong> {log.description}</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded border bg-red-50 p-4">
          <h2 className="mb-3 text-lg font-semibold">
            変更前
          </h2>

          <pre className="overflow-auto text-xs">
            {JSON.stringify(log.beforeData, null, 2)}
          </pre>
        </section>

        <section className="rounded border bg-green-50 p-4">
          <h2 className="mb-3 text-lg font-semibold">
            変更後
          </h2>

          <pre className="overflow-auto text-xs">
            {JSON.stringify(log.afterData, null, 2)}
          </pre>
        </section>
      </div>
    </main>
  );
}
