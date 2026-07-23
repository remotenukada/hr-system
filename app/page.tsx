import { auth, signOut } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";

function StatCard({
  title,
  value,
  description,
  color = "blue",
}: {
  title: string;
  value: number;
  description?: string;
  color?: "blue" | "green" | "yellow" | "red" | "gray" | "purple";
}) {
  const colorClasses = {
    blue: "border-blue-200 bg-blue-50 text-blue-700",
    green: "border-green-200 bg-green-50 text-green-700",
    yellow: "border-yellow-200 bg-yellow-50 text-yellow-700",
    red: "border-red-200 bg-red-50 text-red-700",
    gray: "border-gray-200 bg-gray-50 text-gray-700",
    purple: "border-purple-200 bg-purple-50 text-purple-700",
  };

  return (
    <div className={`rounded-lg border p-5 ${colorClasses[color]}`}>
      <p className="text-sm font-medium">{title}</p>
      <p className="mt-2 text-3xl font-bold">{value}</p>
      {description && (
        <p className="mt-1 text-xs opacity-80">
          {description}
        </p>
      )}
    </div>
  );
}

function SimpleBarChart({
  title,
  items,
}: {
  title: string;
  items: {
    label: string;
    value: number;
  }[];
}) {
  const maxValue = Math.max(...items.map((item) => item.value), 1);

  return (
    <div className="rounded-lg border bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-lg font-semibold text-gray-800">
        {title}
      </h3>

      {items.length === 0 ? (
        <p className="text-sm text-gray-500">データがありません。</p>
      ) : (
        <div className="space-y-4">
          {items.map((item) => {
            const width = Math.max((item.value / maxValue) * 100, 4);

            return (
              <div key={item.label}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="font-medium text-gray-700">
                    {item.label}
                  </span>
                  <span className="text-gray-500">
                    {item.value}件
                  </span>
                </div>

                <div className="h-3 overflow-hidden rounded-full bg-gray-100">
                  <div
                    className="h-full rounded-full bg-blue-500"
                    style={{ width: `${width}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const user = session.user;
  const isAdmin = user.role === "ADMIN";

  const [
    totalEmployees,
    activeEmployees,
    leaveEmployees,
    retiredEmployees,
    totalDepartments,
    totalRequests,
    pendingRequests,
    approvedRequests,
    rejectedRequests,
    myRequests,
    myPendingRequests,
    myApprovedRequests,
    myRejectedRequests,
  ] = await Promise.all([
    prisma.employee.count(),
    prisma.employee.count({
      where: {
        status: "ACTIVE",
      },
    }),
    prisma.employee.count({
      where: {
        status: "LEAVE",
      },
    }),
    prisma.employee.count({
      where: {
        status: "RETIRED",
      },
    }),
    prisma.department.count(),
    prisma.employeeRequest.count(),
    prisma.employeeRequest.count({
      where: {
        status: "PENDING",
      },
    }),
    prisma.employeeRequest.count({
      where: {
        status: "APPROVED",
      },
    }),
    prisma.employeeRequest.count({
      where: {
        status: "REJECTED",
      },
    }),
    prisma.employeeRequest.count({
      where: {
        userId: user.id,
      },
    }),
    prisma.employeeRequest.count({
      where: {
        userId: user.id,
        status: "PENDING",
      },
    }),
    prisma.employeeRequest.count({
      where: {
        userId: user.id,
        status: "APPROVED",
      },
    }),
    prisma.employeeRequest.count({
      where: {
        userId: user.id,
        status: "REJECTED",
      },
    }),
  ]);

  const recentRequests = await prisma.employeeRequest.findMany({
    include: {
      user: true,
      employee: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 5,
  });

  const departmentsWithCounts = await prisma.department.findMany({
    include: {
      _count: {
        select: {
          employees: true,
        },
      },
    },
    orderBy: {
      name: "asc",
    },
  });

  const employmentTypeCounts = await prisma.employee.groupBy({
    by: ["employmentType"],
    _count: {
      _all: true,
    },
    where: {
      employmentType: {
        not: null,
      },
    },
  });

  const requestStatusCounts = await prisma.employeeRequest.groupBy({
    by: ["status"],
    _count: {
      _all: true,
    },
  });

  const employmentTypeLabels: Record<string, string> = {
    FULL_TIME: "正職員",
    CONTRACT: "契約職員",
    PART_TIME: "パート",
    TEMPORARY: "派遣",
  };

  const requestStatusLabels: Record<string, string> = {
    PENDING: "承認待ち",
    APPROVED: "承認済み",
    REJECTED: "却下",
  };

  const departmentChartItems = departmentsWithCounts.map((department) => ({
    label: department.name,
    value: department._count.employees,
  }));

  const employmentTypeChartItems = employmentTypeCounts.map((item) => ({
    label: item.employmentType
      ? employmentTypeLabels[item.employmentType] ?? item.employmentType
      : "未設定",
    value: item._count._all,
  }));

  const requestStatusChartItems = requestStatusCounts.map((item) => ({
    label: requestStatusLabels[item.status] ?? item.status,
    value: item._count._all,
  }));

  const allRequestsForMonthlyChart = await prisma.employeeRequest.findMany({
    select: {
      createdAt: true,
      status: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  const monthlyRequestMap = new Map<
    string,
    {
      total: number;
      approved: number;
      rejected: number;
      pending: number;
    }
  >();

  for (const request of allRequestsForMonthlyChart) {
    const monthKey = request.createdAt.toISOString().slice(0, 7);

    const current = monthlyRequestMap.get(monthKey) ?? {
      total: 0,
      approved: 0,
      rejected: 0,
      pending: 0,
    };

    current.total += 1;

    if (request.status === "APPROVED") {
      current.approved += 1;
    }

    if (request.status === "REJECTED") {
      current.rejected += 1;
    }

    if (request.status === "PENDING") {
      current.pending += 1;
    }

    monthlyRequestMap.set(monthKey, current);
  }

  const monthlyRequestChartItems = Array.from(monthlyRequestMap.entries())
    .slice(-12)
    .map(([month, value]) => ({
      label: month,
      value: value.total,
    }));

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <header className="mb-8 flex items-start justify-between border-b pb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            人事管理システム
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            ようこそ、{user.name} さん（権限: {user.role}）
          </p>
        </div>

        <form
          action={async () => {
            "use server";
            await signOut({
              redirectTo: "/login",
            });
          }}
        >
          <button
            type="submit"
            className="rounded bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
          >
            ログアウト
          </button>
        </form>
      </header>

      <section className="mb-8">
        <h2 className="mb-4 text-xl font-semibold text-gray-800">
          ダッシュボード
        </h2>

        {isAdmin ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            <StatCard
              title="総社員数"
              value={totalEmployees}
              description="登録されている社員数"
              color="blue"
            />
            <StatCard
              title="在職者数"
              value={activeEmployees}
              description="現在在職中の社員"
              color="green"
            />
            <StatCard
              title="休職者数"
              value={leaveEmployees}
              description="休職中の社員"
              color="yellow"
            />
            <StatCard
              title="退職者数"
              value={retiredEmployees}
              description="退職済みの社員"
              color="gray"
            />
            <StatCard
              title="部署数"
              value={totalDepartments}
              description="登録部署数"
              color="purple"
            />
            <StatCard
              title="総申請数"
              value={totalRequests}
              description="全申請件数"
              color="blue"
            />
            <StatCard
              title="承認待ち"
              value={pendingRequests}
              description="未対応の申請"
              color="yellow"
            />
            <StatCard
              title="承認済み"
              value={approvedRequests}
              description="承認された申請"
              color="green"
            />
            <StatCard
              title="却下"
              value={rejectedRequests}
              description="却下された申請"
              color="red"
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            <StatCard
              title="自分の申請数"
              value={myRequests}
              description="自分が提出した申請"
              color="blue"
            />
            <StatCard
              title="承認待ち"
              value={myPendingRequests}
              description="未対応の申請"
              color="yellow"
            />
            <StatCard
              title="承認済み"
              value={myApprovedRequests}
              description="承認された申請"
              color="green"
            />
            <StatCard
              title="却下"
              value={myRejectedRequests}
              description="却下された申請"
              color="red"
            />
          </div>
        )}
      </section>

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-lg border bg-white p-6 shadow-sm">
          <h3 className="mb-3 text-lg font-semibold text-gray-800">
            申請管理
          </h3>
          <p className="text-sm text-gray-600">
            各種申請の作成、確認、承認状況の確認を行います。
          </p>

          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/requests"
              className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              申請一覧へ
            </Link>

            <Link
              href="/requests/new"
              className="rounded border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              新規申請
            </Link>

            <Link
              href="/requests/my"
              className="rounded border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              マイ申請
            </Link>
          </div>
        </div>

        {isAdmin && (
          <div className="rounded-lg border bg-white p-6 shadow-sm">
            <h3 className="mb-3 text-lg font-semibold text-gray-800">
              管理者メニュー
            </h3>
            <p className="text-sm text-gray-600">
              社員マスタ、部署マスタの管理を行います。
            </p>

            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                href="/employees"
                className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
              >
                社員一覧へ
              </Link>

              <Link
                href="/employees/new"
                className="rounded border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                社員登録
              </Link>

              <Link
                href="/departments"
                className="rounded border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                部署管理
              </Link>

              <Link
                href="/audit-logs"
                className="rounded border border-gray-300 bg-white px-4 py-2 text-sm font-medium hover:bg-gray-50"
              >
                監査ログ
              </Link>
            </div>
          </div>
        )}
      </section>

      {isAdmin && (
        <section className="mt-8">
          <h2 className="mb-4 text-xl font-semibold text-gray-800">
            グラフ
          </h2>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <SimpleBarChart
              title="部署別人数"
              items={departmentChartItems}
            />
            <SimpleBarChart
              title="雇用形態別人数"
              items={employmentTypeChartItems}
            />
            <SimpleBarChart
              title="申請ステータス別件数"
              items={requestStatusChartItems}
            />
          </div>

          <div className="mt-6">
            <SimpleBarChart
              title="月別申請件数"
              items={monthlyRequestChartItems}
            />
          </div>
        </section>
      )}

      {isAdmin && (
        <section className="mt-8 rounded-lg border bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-gray-800">
            最近の申請
          </h3>

          {recentRequests.length === 0 ? (
            <p className="text-sm text-gray-500">
              最近の申請はありません。
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-gray-50 text-left">
                    <th className="p-3">タイトル</th>
                    <th className="p-3">申請者</th>
                    <th className="p-3">対象社員</th>
                    <th className="p-3">ステータス</th>
                    <th className="p-3">作成日</th>
                  </tr>
                </thead>

                <tbody>
                  {recentRequests.map((request) => (
                    <tr key={request.id} className="border-b">
                      <td className="p-3">
                        <Link
                          href={`/requests/${request.id}`}
                          className="font-medium text-blue-600 hover:underline"
                        >
                          {request.title}
                        </Link>
                      </td>
                      <td className="p-3">
                        {request.user?.name ?? "-"}
                      </td>
                      <td className="p-3">
                        {request.employee
                          ? `${request.employee.lastName} ${request.employee.firstName}`
                          : "-"}
                      </td>
                      <td className="p-3">
                        {request.status}
                      </td>
                      <td className="p-3">
                        {new Date(request.createdAt).toLocaleDateString("ja-JP")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      )}
    </main>
  );
}
