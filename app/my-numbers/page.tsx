import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { requireHRManager } from "@/lib/auth-guard";

type Props = {
  searchParams?: Promise<{
    status?: string;
  }>;
};

function getStatusLabel(status: string) {
  if (status === "APPROVED") {
    return "確認済";
  }

  if (status === "REJECTED") {
    return "差戻し";
  }

  return "未確認";
}

function getStatusClass(status: string) {
  if (status === "APPROVED") {
    return "bg-green-100 text-green-800";
  }

  if (status === "REJECTED") {
    return "bg-red-100 text-red-800";
  }

  return "bg-yellow-100 text-yellow-800";
}

export default async function MyNumbersPage({
  searchParams,
}: Props) {
  await requireHRManager();

  const params = await searchParams;
  const status = params?.status;

  const validStatuses = ["PENDING", "APPROVED", "REJECTED"];
  const statusFilter =
    status && validStatuses.includes(status)
      ? status
      : undefined;

  const [
    totalCount,
    pendingCount,
    approvedCount,
    rejectedCount,
  ] = await Promise.all([
    prisma.employeeMyNumber.count(),
    prisma.employeeMyNumber.count({
      where: {
        status: "PENDING",
      },
    }),
    prisma.employeeMyNumber.count({
      where: {
        status: "APPROVED",
      },
    }),
    prisma.employeeMyNumber.count({
      where: {
        status: "REJECTED",
      },
    }),
  ]);

  const myNumbers =
    await prisma.employeeMyNumber.findMany({
      where: statusFilter
        ? {
            status: statusFilter,
          }
        : undefined,
      include: {
        employee: {
          include: {
            department: true,
          },
        },
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

  return (
    <main className="mx-auto max-w-7xl p-8">
      <div className="mb-4">
        <Link
          href="/"
          className="text-sm text-blue-600 hover:underline"
        >
          ← ダッシュボードへ戻る
        </Link>
      </div>

      <h1 className="mb-6 text-3xl font-bold">
        マイナンバー確認一覧
      </h1>

      <div className="mb-6 flex flex-wrap gap-2">
        <Link
          href="/my-numbers"
          className={`rounded border px-3 py-1.5 text-sm font-medium ${
            !statusFilter
              ? "bg-blue-600 text-white border-blue-600"
              : "border-gray-300 bg-white hover:bg-gray-50"
          }`}
        >
          すべて ({totalCount})
        </Link>

        <Link
          href="/my-numbers?status=PENDING"
          className={`rounded border px-3 py-1.5 text-sm font-medium ${
            statusFilter === "PENDING"
              ? "bg-blue-600 text-white border-blue-600"
              : "border-gray-300 bg-white hover:bg-gray-50"
          }`}
        >
          未確認 ({pendingCount})
        </Link>

        <Link
          href="/my-numbers?status=APPROVED"
          className={`rounded border px-3 py-1.5 text-sm font-medium ${
            statusFilter === "APPROVED"
              ? "bg-blue-600 text-white border-blue-600"
              : "border-gray-300 bg-white hover:bg-gray-50"
          }`}
        >
          確認済 ({approvedCount})
        </Link>

        <Link
          href="/my-numbers?status=REJECTED"
          className={`rounded border px-3 py-1.5 text-sm font-medium ${
            statusFilter === "REJECTED"
              ? "bg-blue-600 text-white border-blue-600"
              : "border-gray-300 bg-white hover:bg-gray-50"
          }`}
        >
          差戻し ({rejectedCount})
        </Link>
      </div>

      <div className="overflow-x-auto rounded-lg border bg-white shadow-sm">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 text-gray-700">
            <tr>
              <th className="border-b p-3 text-left font-medium">
                社員番号
              </th>
              <th className="border-b p-3 text-left font-medium">
                氏名
              </th>
              <th className="border-b p-3 text-left font-medium">
                部署
              </th>
              <th className="border-b p-3 text-left font-medium">
                登録状況
              </th>
              <th className="border-b p-3 text-left font-medium">
                状態
              </th>
              <th className="border-b p-3 text-left font-medium">
                更新日
              </th>
              <th className="border-b p-3 text-left font-medium">
                確認日時
              </th>
              <th className="border-b p-3 text-left font-medium">
                差戻し理由
              </th>
              <th className="border-b p-3 text-center font-medium">
                操作
              </th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {myNumbers.length === 0 ? (
              <tr>
                <td
                  colSpan={9}
                  className="p-8 text-center text-gray-500"
                >
                  該当するマイナンバー申請情報はありません。
                </td>
              </tr>
            ) : (
              myNumbers.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="p-3">
                    {item.employee.employeeNo}
                  </td>

                  <td className="p-3 font-medium text-gray-900">
                    {item.employee.lastName}{" "}
                    {item.employee.firstName}
                  </td>

                  <td className="p-3 text-gray-600">
                    {item.employee.department?.name ?? "-"}
                  </td>

                  <td className="p-3 text-gray-600">
                    登録済み
                  </td>

                  <td className="p-3">
                    <span
                      className={`inline-block rounded px-2.5 py-0.5 text-xs font-medium ${getStatusClass(
                        item.status,
                      )}`}
                    >
                      {getStatusLabel(item.status)}
                    </span>
                  </td>

                  <td className="p-3 text-gray-600">
                    {item.updatedAt.toLocaleString("ja-JP")}
                  </td>

                  <td className="p-3 text-gray-600">
                    {item.verifiedAt
                      ? item.verifiedAt.toLocaleString("ja-JP")
                      : "-"}
                  </td>

                  <td className="p-3 text-gray-700">
                    {item.reviewComment ?? "-"}
                  </td>

                  <td className="p-3 text-center">
                    <Link
                      href={`/my-numbers/${item.id}`}
                      className="rounded border border-gray-300 bg-white px-2.5 py-1 text-xs font-medium text-gray-700 hover:bg-gray-50"
                    >
                      詳細・確認
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}
