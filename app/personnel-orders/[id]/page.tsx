import BackLink from "@/components/BackLink";
import Link from "next/link";
import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";

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

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function PersonnelOrderDetailPage(
  { params }: Props,
) {
  const { id } = await params;

  const history =
    await prisma.employmentHistory.findUnique({
      where: {
        id,
      },
      include: {
        employee: true,
      },
    });

  if (!history) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-4xl p-6">
      <BackLink href="/personnel-orders" label="人事発令一覧に戻る" />

      <h1 className="mb-6 text-2xl font-bold">
        人事発令詳細
      </h1>

      <div className="rounded-lg border bg-white p-6 shadow-sm">
        <dl className="grid grid-cols-1 gap-4 md:grid-cols-2">

          <div>
            <dt className="text-sm text-gray-500">
              発令日
            </dt>
            <dd className="font-medium">
              {new Date(
                history.effectiveDate,
              ).toLocaleDateString("ja-JP")}
            </dd>
          </div>

          <div>
            <dt className="text-sm text-gray-500">
              発令区分
            </dt>
            <dd className="font-medium">
              {getActionLabel(history.action)}
            </dd>
          </div>

          <div>
            <dt className="text-sm text-gray-500">
              社員番号
            </dt>
            <dd className="font-medium">
              {history.employee.employeeNo}
            </dd>
          </div>

          <div>
            <dt className="text-sm text-gray-500">
              氏名
            </dt>
            <dd className="font-medium">
              {history.employee.lastName}{" "}
              {history.employee.firstName}
            </dd>
          </div>

          <div className="md:col-span-2">
            <dt className="text-sm text-gray-500">
              発令内容
            </dt>
            <dd className="font-medium">
              {history.reason ?? "-"}
            </dd>
          </div>

        </dl>

        <div className="mt-6 flex gap-4">
          <a
            href={`/personnel-orders/${history.id}/pdf`}
            target="_blank"
            rel="noreferrer"
            className="rounded bg-gray-800 px-4 py-2 text-sm text-white hover:bg-gray-700"
          >
            発令書PDF
          </a>

          <Link
            href={`/employees/${history.employee.id}`}
            className="text-blue-600 hover:underline"
          >
            社員詳細へ
          </Link>
        </div>
      </div>
    </main>
  );
}
