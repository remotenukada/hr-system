import { auth, signOut } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";

const DAY_MS = 24 * 60 * 60 * 1000;

function addYears(date: Date, years: number) {
  const result = new Date(date);
  result.setFullYear(result.getFullYear() + years);
  return result;
}

function getTodayOnly() {
  const today = new Date();

  const todayStart = new Date(today);
  todayStart.setHours(0, 0, 0, 0);

  const todayEnd = new Date(today);
  todayEnd.setHours(23, 59, 59, 999);

  return new Date(today.getFullYear(), today.getMonth(), today.getDate());
}

function getDaysUntil(date: Date) {
  const todayOnly = getTodayOnly();

  const targetOnly = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
  );

  return Math.ceil((targetOnly.getTime() - todayOnly.getTime()) / DAY_MS);
}

function getExpiredSourceId(note: string | null) {
  if (!note?.includes("失効元:")) {
    return null;
  }

  return note.split("失効元:")[1]?.split(" ")[0] ?? null;
}

function getAlertClass(count: number) {
  if (count >= 5) {
    return "text-red-700 font-semibold";
  }

  if (count >= 1) {
    return "text-yellow-700 font-medium";
  }

  return "text-green-700";
}

function StatCard({
  title,
  value,
  description,
  color = "blue",
  href,
}: {
  title: string;
  value: number | string;
  description?: string;
  color?: "blue" | "green" | "yellow" | "red" | "gray" | "purple";
  href?: string;
}) {
  const colorClasses = {
    blue: "border-blue-200 bg-blue-50 text-blue-700",
    green: "border-green-200 bg-green-50 text-green-700",
    yellow: "border-yellow-200 bg-yellow-50 text-yellow-700",
    red: "border-red-200 bg-red-50 text-red-700",
    gray: "border-gray-200 bg-gray-50 text-gray-700",
    purple: "border-purple-200 bg-purple-50 text-purple-700",
  };

  const card = (
    <div
      className={`rounded-lg border p-5 ${colorClasses[color]} ${
        href ? "transition hover:opacity-80" : ""
      }`}
    >
      <p className="text-sm font-medium">{title}</p>
      <p className="mt-2 text-3xl font-bold">{value}</p>
      {description && <p className="mt-1 text-xs opacity-80">{description}</p>}
    </div>
  );

  if (href) {
    return <Link href={href}>{card}</Link>;
  }

  return card;
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
      <h3 className="mb-4 text-lg font-semibold text-gray-800">{title}</h3>

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
                  <span className="text-gray-500">{item.value}件</span>
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
  const isHRManager = user.role === "ADMIN" || user.role === "HR_MANAGER";

  const canApprove =
    user.role === "ADMIN" ||
    user.role === "HR_MANAGER" ||
    user.role === "MANAGER";

  const canViewEmployees =
    user.role === "ADMIN" ||
    user.role === "HR_MANAGER" ||
    user.role === "MANAGER";

  const currentMonthStart = new Date();
  currentMonthStart.setDate(1);
  currentMonthStart.setHours(0, 0, 0, 0);

  const currentMonthEnd = new Date(
    currentMonthStart.getFullYear(),
    currentMonthStart.getMonth() + 1,
    0,
    23,
    59,
    59,
    999,
  );

  const contractTodayStart = new Date();
  contractTodayStart.setHours(0, 0, 0, 0);

  const contractEnd30DaysLater = new Date(contractTodayStart);
  contractEnd30DaysLater.setDate(contractEnd30DaysLater.getDate() + 30);
  contractEnd30DaysLater.setHours(23, 59, 59, 999);

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
    pendingProfileChanges,
    pendingCertificationRequests,
    pendingBankAccounts,
    pendingMyNumbers,
    myCertificationCount,
    myLeaveBalance,
    myPendingProfileChanges,
    preHireEmployees,
    totalJobTitles,
    totalPositions,
    totalEmploymentContracts,
    employeesWithoutContract,
    contractsEndingSoon,
    monthlyTransfers,
    monthlyPositionChanges,
    monthlyLeaves,
    monthlyRetirements,
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
    prisma.profileChangeRequest.count({
      where: {
        status: "PENDING",
      },
    }),
    prisma.employeeCertification.count({
      where: {
        status: "PENDING",
      },
    }),
    prisma.employeeBankAccount.count({
      where: {
        verifiedAt: null,
      },
    }),
    prisma.employeeMyNumber.count({
      where: {
        status: "PENDING",
      },
    }),
    prisma.employeeCertification.count({
      where: {
        employee: {
          userId: user.id,
        },
        status: "APPROVED",
      },
    }),
    prisma.leaveBalance.findFirst({
      where: {
        employee: {
          userId: user.id,
        },
      },
    }),
    prisma.profileChangeRequest.count({
      where: {
        employee: {
          userId: user.id,
        },
        status: "PENDING",
      },
    }),

    prisma.employee.count({
      where: {
        status: "PRE_HIRE",
      },
    }),

    prisma.jobTitleMaster.count(),

    prisma.positionMaster.count(),

    prisma.employmentContract.count(),

    prisma.employee.count({
      where: {
        status: {
          not: "RETIRED",
        },
        employmentContracts: {
          none: {},
        },
      },
    }),

    prisma.employmentContract.count({
      where: {
        isCurrent: true,
        endDate: {
          gte: contractTodayStart,
          lte: contractEnd30DaysLater,
        },
      },
    }),

    prisma.employmentHistory.count({
      where: {
        action: "TRANSFER",
        effectiveDate: {
          gte: currentMonthStart,
          lte: currentMonthEnd,
        },
      },
    }),

    prisma.employmentHistory.count({
      where: {
        action: "POSITION_CHANGE",
        effectiveDate: {
          gte: currentMonthStart,
          lte: currentMonthEnd,
        },
      },
    }),

    prisma.employmentHistory.count({
      where: {
        action: "LEAVE_STARTED",
        effectiveDate: {
          gte: currentMonthStart,
          lte: currentMonthEnd,
        },
      },
    }),

    prisma.employmentHistory.count({
      where: {
        action: "RETIRED",
        effectiveDate: {
          gte: currentMonthStart,
          lte: currentMonthEnd,
        },
      },
    }),
  ]);

  const retirementAlerts = await prisma.employee.findMany({
    where: {
      retirementDate: {
        not: null,
      },
      NOT: {
        status: "RETIRED",
      },
    },
    include: {
      department: true,
    },
    orderBy: {
      retirementDate: "asc",
    },
    take: 5,
  });

  const recentEmploymentHistories = await prisma.employmentHistory.findMany({
    include: {
      employee: true,
    },
    orderBy: {
      effectiveDate: "desc",
    },
    take: 10,
  });

  const myEmployee = await prisma.employee.findUnique({
    where: {
      userId: user.id,
    },
    include: {
      department: true,
    },
  });

  const leaveBalances = await prisma.leaveBalance.findMany();

  const totalGrantedLeaveDays = leaveBalances.reduce(
    (sum, item) => sum + item.grantedDays,
    0,
  );

  const totalUsedLeaveDays = leaveBalances.reduce(
    (sum, item) => sum + item.usedDays,
    0,
  );

  const totalRemainingLeaveDays = leaveBalances.reduce(
    (sum, item) => sum + (item.grantedDays - item.usedDays),
    0,
  );

  const leaveExpirationGrants = await prisma.leaveGrantHistory.findMany({
    where: {
      grantType: {
        in: ["LEGAL", "SPECIAL", "MANUAL", "EXPIRED"],
      },
      employee: {
        status: "ACTIVE",
      },
    },
    select: {
      id: true,
      grantDate: true,
      grantType: true,
      note: true,
    },
  });

  const expiredSourceIds = new Set(
    leaveExpirationGrants
      .filter((grant) => grant.grantType === "EXPIRED")
      .map((grant) => getExpiredSourceId(grant.note))
      .filter((id): id is string => Boolean(id)),
  );

  const expirationRows = leaveExpirationGrants
    .filter((grant) => ["LEGAL", "SPECIAL", "MANUAL"].includes(grant.grantType))
    .map((grant) => {
      const expirationDate = addYears(new Date(grant.grantDate), 2);

      return {
        id: grant.id,
        daysUntil: getDaysUntil(expirationDate),
        alreadyExpired: expiredSourceIds.has(grant.id),
      };
    });

  const soonExpiringLeaveCount = expirationRows.filter(
    (row) => !row.alreadyExpired && row.daysUntil >= 0 && row.daysUntil <= 30,
  ).length;

  const expiredLeaveTargetCount = expirationRows.filter(
    (row) => !row.alreadyExpired && row.daysUntil < 0,
  ).length;

  const myNextLeaveExpiration =
    expirationRows
      .filter((row) => !row.alreadyExpired && row.daysUntil >= 0)
      .sort((a, b) => a.daysUntil - b.daysUntil)[0] ?? null;

  const complianceToday = getTodayOnly();

  const leaveComplianceGrants = await prisma.leaveGrantHistory.findMany({
    where: {
      grantedDays: {
        gte: 10,
      },
      grantType: {
        in: ["LEGAL", "MANUAL"],
      },
      grantDate: {
        lte: complianceToday,
      },
      employee: {
        status: "ACTIVE",
      },
    },
    select: {
      employeeId: true,
      grantDate: true,
    },
  });

  const leaveComplianceEmployeeIds = Array.from(
    new Set(leaveComplianceGrants.map((grant) => grant.employeeId)),
  );

  const leaveComplianceRequests = await prisma.employeeRequest.findMany({
    where: {
      type: "PAID_LEAVE",
      status: "APPROVED",
      employeeId: {
        in: leaveComplianceEmployeeIds,
      },
    },
    select: {
      employeeId: true,
      leaveStartDate: true,
      leaveDays: true,
    },
  });

  const leaveComplianceNotCompletedEmployeeIds = new Set(
    leaveComplianceGrants
      .filter((grant) => {
        const dueDate = addYears(grant.grantDate, 1);

        const acquiredDays = leaveComplianceRequests
          .filter((request) => {
            if (
              !request.employeeId ||
              !request.leaveStartDate ||
              !request.leaveDays
            ) {
              return false;
            }

            return (
              request.employeeId === grant.employeeId &&
              request.leaveStartDate >= grant.grantDate &&
              request.leaveStartDate < dueDate
            );
          })
          .reduce((sum, request) => sum + (request.leaveDays ?? 0), 0);

        return acquiredDays < 5;
      })
      .map((grant) => grant.employeeId),
  );

  const leaveComplianceNotCompletedCount =
    leaveComplianceNotCompletedEmployeeIds.size;

  const leaveComplianceWarningRows = leaveComplianceGrants.filter((grant) => {
    const dueDate = addYears(grant.grantDate, 1);
    const daysUntilDue = getDaysUntil(dueDate);

    const acquiredDays = leaveComplianceRequests
      .filter((request) => {
        if (
          !request.employeeId ||
          !request.leaveStartDate ||
          !request.leaveDays
        ) {
          return false;
        }

        return (
          request.employeeId === grant.employeeId &&
          request.leaveStartDate >= grant.grantDate &&
          request.leaveStartDate < dueDate
        );
      })
      .reduce((sum, request) => sum + (request.leaveDays ?? 0), 0);

    return acquiredDays < 5 && daysUntilDue >= 0;
  });

  const leaveComplianceWarning90Count = leaveComplianceWarningRows.filter(
    (grant) => {
      const dueDate = addYears(grant.grantDate, 1);
      return getDaysUntil(dueDate) <= 90;
    },
  ).length;

  const leaveComplianceWarning30Count = leaveComplianceWarningRows.filter(
    (grant) => {
      const dueDate = addYears(grant.grantDate, 1);
      return getDaysUntil(dueDate) <= 30;
    },
  ).length;

  const today = new Date();

  const todayStart = new Date(today);
  todayStart.setHours(0, 0, 0, 0);

  const todayEnd = new Date(today);
  todayEnd.setHours(23, 59, 59, 999);

  const todayLeaveRequests = await prisma.employeeRequest.findMany({
    where: {
      type: "PAID_LEAVE",
      status: "APPROVED",
      leaveStartDate: {
        lte: todayEnd,
      },
      leaveEndDate: {
        gte: todayStart,
      },
    },
    include: {
      employee: true,
    },
    take: 10,
  });

  const weekStart = new Date(today);
  weekStart.setDate(today.getDate() - today.getDay());

  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 6);

  const thisWeekLeaveRequests = await prisma.employeeRequest.findMany({
    where: {
      type: "PAID_LEAVE",
      status: "APPROVED",
      leaveStartDate: {
        lte: weekEnd,
      },
      leaveEndDate: {
        gte: weekStart,
      },
    },
    include: {
      employee: true,
    },
    take: 20,
  });

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
      ? (employmentTypeLabels[item.employmentType] ?? item.employmentType)
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
          <h1 className="text-3xl font-bold text-gray-900">人事管理システム</h1>
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

        {isHRManager && retirementAlerts.length > 0 && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4">
            <h3 className="mb-3 font-semibold text-red-800">
              ⚠ 退職予定者アラート
            </h3>

            <div className="space-y-2">
              {retirementAlerts.map((employee) => (
                <div
                  key={employee.id}
                  className="rounded border border-red-100 bg-white p-3 text-sm"
                >
                  <div className="font-medium">
                    {employee.lastName} {employee.firstName}
                  </div>

                  <div className="text-gray-600">
                    {employee.department?.name ?? "-"}
                  </div>

                  <div className="text-red-700">
                    退職予定日:{" "}
                    {employee.retirementDate
                      ? new Date(employee.retirementDate).toLocaleDateString(
                          "ja-JP",
                        )
                      : "-"}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {isHRManager ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            <StatCard
              title="総職員数"
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
            <StatCard
              title="総有給付与日数"
              value={totalGrantedLeaveDays.toFixed(1)}
              description="全社員の付与日数合計"
              color="blue"
            />
            <StatCard
              title="総有給使用日数"
              value={totalUsedLeaveDays.toFixed(1)}
              description="全社員の使用日数合計"
              color="yellow"
            />
            <StatCard
              title="総有給残日数"
              value={totalRemainingLeaveDays.toFixed(1)}
              description="全社員の残日数合計"
              color="green"
            />
            <StatCard
              title="30日以内失効件数"
              value={soonExpiringLeaveCount}
              description="30日以内に失効予定の付与履歴"
              color="yellow"
            />
            <StatCard
              title="失効実行対象件数"
              value={expiredLeaveTargetCount}
              description="失効実行が必要な付与履歴"
              color="red"
            />
            <StatCard
              title="5日取得義務未達"
              value={leaveComplianceNotCompletedCount}
              description="年10日以上付与者の5日未達者"
              color="red"
              href="/leave-compliance"
            />
            <StatCard
              title="5日取得義務 90日以内"
              value={leaveComplianceWarning90Count}
              description="期限90日以内の未達者"
              color="yellow"
              href="/leave-compliance"
            />
            <StatCard
              title="5日取得義務 30日以内"
              value={leaveComplianceWarning30Count}
              description="期限30日以内の未達者"
              color="red"
              href="/leave-compliance"
            />

            <StatCard
              title="今月の異動"
              value={monthlyTransfers}
              description="今月の部署異動"
              color="blue"
              href="/personnel-orders"
            />

            <StatCard
              title="今月の役職変更"
              value={monthlyPositionChanges}
              description="今月の昇進・昇格"
              color="purple"
              href="/personnel-orders"
            />

            <StatCard
              title="今月の休職"
              value={monthlyLeaves}
              description="休職開始"
              color="yellow"
              href="/personnel-orders"
            />

            <StatCard
              title="今月の退職"
              value={monthlyRetirements}
              description="退職処理"
              color="red"
              href="/personnel-orders"
            />

            <StatCard
              title="採用予定者数"
              value={preHireEmployees}
              description="入社前の職員"
              color="blue"
            />
            <StatCard
              title="職種数"
              value={totalJobTitles}
              description="登録済み職種マスタ"
              color="purple"
            />
            <StatCard
              title="役職数"
              value={totalPositions}
              description="登録済み役職マスタ"
              color="purple"
            />
            <StatCard
              title="雇用条件書数"
              value={totalEmploymentContracts}
              description="登録済み雇用条件書"
              color="green"
            />
            <StatCard
              title="契約終了30日以内"
              value={contractsEndingSoon}
              description="30日以内に契約更新が必要"
              color="yellow"
              href="/employees"
            />
            <StatCard
              title="雇用条件書未作成者"
              value={employeesWithoutContract}
              description="雇用条件書が登録されていない職員"
              color="red"
              href="/employees"
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
            <StatCard
              title="保有資格数"
              value={myCertificationCount}
              description="承認済み資格"
              color="purple"
            />
            <StatCard
              title="有給残日数"
              value={
                myLeaveBalance
                  ? (
                      myLeaveBalance.grantedDays - myLeaveBalance.usedDays
                    ).toFixed(1)
                  : "0"
              }
              description="利用可能な有給残数"
              color="green"
            />
            <StatCard
              title="プロフィール変更"
              value={myPendingProfileChanges}
              description="承認待ち申請"
              color="yellow"
            />

            <StatCard
              title="次回失効有給"
              value={
                myNextLeaveExpiration
                  ? `${myNextLeaveExpiration.daysUntil}日`
                  : "-"
              }
              description="次回失効まで"
              color="yellow"
            />
          </div>
        )}
      </section>

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="rounded-lg border bg-white p-6 shadow-sm">
          <h3 className="mb-3 text-lg font-semibold text-gray-800">申請管理</h3>
          <p className="text-sm text-gray-600">
            各種申請の作成、確認、承認状況の確認を行います。
          </p>

          <div className="mt-4 flex flex-wrap gap-3">
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

            <Link
              href="/mypage/employment-contracts"
              className="rounded border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              雇用条件書
            </Link>
          </div>
        </div>

        <div className="rounded-lg border bg-white p-6 shadow-sm">
          <h3 className="mb-3 text-lg font-semibold text-gray-800">
            マイページ
          </h3>
          <p className="text-sm text-gray-600">
            個人情報、資格・免許、有給履歴の確認を行います。
          </p>

          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/mypage/certifications"
              className="rounded border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              資格・免許管理
            </Link>
            <Link
              href="/mypage/profile-change"
              className="rounded border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              プロフィール変更
            </Link>
            <Link
              href="/mypage/bank-account"
              className="rounded border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              口座情報管理
            </Link>

            <Link
              href="/mypage/my-number"
              className="rounded border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              マイナンバー管理
            </Link>
            <Link
              href="/mypage/dependent-requests/new"
              className="rounded border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              扶養家族申請
            </Link>
          </div>
        </div>

        <div className="rounded-lg border bg-white p-6 shadow-sm">
          <h3 className="mb-3 text-lg font-semibold text-gray-800">自分情報</h3>

          <div className="space-y-2 text-sm text-gray-700">
            <div>
              <span className="font-medium">社員番号:</span>{" "}
              {myEmployee?.employeeNo ?? "-"}
            </div>

            <div>
              <span className="font-medium">所属部署:</span>{" "}
              {myEmployee?.department?.name ?? "-"}
            </div>

            <div>
              <span className="font-medium">入社日:</span>{" "}
              {myEmployee?.hireDate
                ? new Date(myEmployee.hireDate).toLocaleDateString("ja-JP")
                : "-"}
            </div>

            <div>
              <span className="font-medium">役職:</span>{" "}
              {myEmployee?.position ?? "-"}
            </div>
          </div>
        </div>

        <div className="rounded-lg border bg-white p-6 shadow-sm">
          <h3 className="mb-3 text-lg font-semibold text-gray-800">お知らせ</h3>

          <ul className="space-y-2 text-sm text-gray-700">
            {myPendingRequests > 0 && (
              <li>・承認待ちの申請が {myPendingRequests} 件あります</li>
            )}

            {myPendingProfileChanges > 0 && (
              <li>・プロフィール変更申請が承認待ちです</li>
            )}

            {myNextLeaveExpiration && myNextLeaveExpiration.daysUntil <= 30 && (
              <li>
                ・有給失効まで残り {myNextLeaveExpiration.daysUntil}
                日です
              </li>
            )}

            {myPendingRequests === 0 &&
              myPendingProfileChanges === 0 &&
              (!myNextLeaveExpiration ||
                myNextLeaveExpiration.daysUntil > 30) && (
                <li>現在お知らせはありません。</li>
              )}
          </ul>
        </div>

        {canApprove && (
          <div className="rounded-lg border bg-white p-6 shadow-sm">
            <h3 className="mb-3 text-lg font-semibold text-gray-800">
              承認メニュー
            </h3>
            <p className="text-sm text-gray-600">
              承認待ちの申請を確認し、承認・却下を行います。
            </p>

            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                href="/requests?status=PENDING"
                className="rounded bg-yellow-100 px-4 py-2 text-sm font-medium text-yellow-800 hover:bg-yellow-200"
              >
                承認待ち申請
              </Link>

              <Link
                href="/profile-change-requests"
                className="rounded border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                プロフィール変更申請 ({pendingProfileChanges})
              </Link>
              <Link
                href="/dependent-requests"
                className="rounded border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                扶養家族申請
              </Link>

              <Link
                href="/certification-requests"
                className="rounded border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                資格承認 ({pendingCertificationRequests})
              </Link>

              <Link
                href="/requests"
                className="rounded border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                申請一覧
              </Link>
            </div>
          </div>
        )}

        {canViewEmployees && !isHRManager && (
          <div className="rounded-lg border bg-white p-6 shadow-sm">
            <h3 className="mb-3 text-lg font-semibold text-gray-800">
              職員閲覧メニュー
            </h3>
            <p className="text-sm text-gray-600">職員情報の閲覧を行います。</p>

            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                href="/employees"
                className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
              >
                職員一覧へ
              </Link>
            </div>
          </div>
        )}

        {isHRManager && (
          <div className="rounded-lg border bg-white p-6 shadow-sm">
            <h3 className="mb-3 text-lg font-semibold text-gray-800">
              人事管理メニュー
            </h3>
            <p className="text-sm text-gray-600">
              職員マスタ、部署マスタの管理を行います。
            </p>

            <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-4">
              <h4 className="text-sm font-semibold text-amber-900">
                要確認事項
              </h4>

              <ul className="mt-2 space-y-1 text-sm text-amber-800">
                <li className={getAlertClass(pendingProfileChanges)}>
                  プロフィール変更申請: {pendingProfileChanges}件
                </li>
                <li className={getAlertClass(pendingCertificationRequests)}>
                  資格承認: {pendingCertificationRequests}件
                </li>
                <li className={getAlertClass(pendingBankAccounts)}>
                  口座情報確認: {pendingBankAccounts}件
                </li>
                <li className={getAlertClass(pendingMyNumbers ?? 0)}>
                  マイナンバー確認: {pendingMyNumbers ?? 0}件
                </li>
              </ul>
            </div>

            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                href="/employees"
                className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
              >
                社員一覧へ
              </Link>
              <Link
                href="/employees/new"
                className="rounded border border-gray-300 bg-white px-4 py-2 text-sm font-medium hover:bg-gray-50"
              >
                新規社員登録
              </Link>
              <Link
                href="/departments"
                className="rounded border border-gray-300 bg-white px-4 py-2 text-sm font-medium hover:bg-gray-50"
              >
                部署一覧
              </Link>
              <Link
                href="/leave-balances"
                className="rounded border border-gray-300 bg-white px-4 py-2 text-sm font-medium hover:bg-gray-50"
              >
                有給管理一覧
              </Link>
              <Link
                href="/leave-grants"
                className="rounded border border-gray-300 bg-white px-4 py-2 text-sm font-medium hover:bg-gray-50"
              >
                有給付与履歴
              </Link>
              <Link
                href="/leave-grants/pending"
                className="rounded border border-gray-300 bg-white px-4 py-2 text-sm font-medium hover:bg-gray-50"
              >
                有給付与対象者一覧
              </Link>

              <Link
                href="/leave-expiration"
                className="rounded border border-gray-300 bg-white px-4 py-2 text-sm font-medium hover:bg-gray-50"
              >
                有給失効管理
              </Link>
              <Link
                href="/employee-leaves"
                className="rounded border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                休職・復職管理
              </Link>

              <Link
                href="/employee-retirements"
                className="rounded border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                退職管理
              </Link>

              <Link
                href="/organization-history"
                className="rounded border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                組織変更履歴レポート
              </Link>

              <Link
                href="/employee-transfers"
                className="rounded border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                異動履歴一覧
              </Link>
              <Link
                href="/personnel-orders"
                className="rounded border border-indigo-300 bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-700 hover:bg-indigo-100"
              >
                人事発令管理
              </Link>

              <Link
                href="/retirement-management"
                className="rounded border border-red-300 bg-red-50 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-100"
              >
                退職予定者管理
              </Link>
              <Link
                href="/masters"
                className="rounded border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                マスタ管理
              </Link>
              <Link
                href="/employee-contracts"
                className="rounded border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                雇用契約書一覧
              </Link>
              <Link
                href="/employee-contracts/new"
                className="rounded border border-green-300 bg-green-50 px-4 py-2 text-sm font-medium text-green-700 hover:bg-green-100"
              >
                雇用契約書作成
              </Link>
              <Link
                href="/employee-contract-templates"
                className="rounded border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                雇用契約テンプレート
              </Link>
              <Link
                href="/bank-accounts"
                className="rounded border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                口座情報確認 ({pendingBankAccounts})
              </Link>

              <Link
                href="/my-numbers"
                className="rounded border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                マイナンバー確認 ({pendingMyNumbers ?? 0})
              </Link>
              <Link
                href="/audit-logs"
                className="rounded border border-gray-300 bg-white px-4 py-2 text-sm font-medium hover:bg-gray-50"
              >
                監査ログ一覧
              </Link>

              <Link
                href="/role-permissions"
                className="rounded border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                権限マトリクス
              </Link>

              {user.role === "ADMIN" && (
                <>
                  <Link
                    href="/users"
                    className="rounded bg-purple-600 px-4 py-2 text-sm text-white hover:bg-purple-700"
                  >
                    ユーザー管理
                  </Link>
                  <Link
                    href="/user-invitations"
                    className="rounded border border-purple-300 bg-white px-4 py-2 text-sm font-medium text-purple-700 hover:bg-purple-50"
                  >
                    ユーザー招待
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </section>

      {isHRManager && (
        <section className="mt-8">
          <h2 className="mb-4 text-xl font-semibold text-gray-800">グラフ</h2>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <SimpleBarChart title="部署別人数" items={departmentChartItems} />
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

      {isHRManager && (
        <section className="mt-8 rounded-lg border bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-gray-800">
            本日の休暇取得者
          </h3>

          {todayLeaveRequests.length === 0 ? (
            <p className="text-sm text-gray-500">
              本日の休暇取得者はいません。
            </p>
          ) : (
            <div className="space-y-2">
              {todayLeaveRequests.map((request) => (
                <div key={request.id} className="rounded border p-3">
                  {request.employee
                    ? `${request.employee.lastName} ${request.employee.firstName}`
                    : "-"}{" "}
                  ({request.leaveDays ?? 0}日)
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {isHRManager && (
        <section className="mt-8 rounded-lg border bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-gray-800">
            今週の休暇取得者
          </h3>

          {thisWeekLeaveRequests.length === 0 ? (
            <p className="text-sm text-gray-500">
              今週の休暇取得者はいません。
            </p>
          ) : (
            <div className="space-y-2">
              {thisWeekLeaveRequests.map((request) => (
                <div key={request.id} className="rounded border p-3">
                  <div className="font-medium text-gray-800">
                    {request.employee
                      ? `${request.employee.lastName} ${request.employee.firstName}`
                      : "-"}
                  </div>
                  <div className="mt-1 text-sm text-gray-500">
                    {request.leaveStartDate?.toLocaleDateString("ja-JP") ?? "-"}
                    {" 〜 "}
                    {request.leaveEndDate?.toLocaleDateString("ja-JP") ?? "-"}
                    {" / "}
                    {request.leaveDays ?? 0}日
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {isHRManager && (
        <section className="mt-8 rounded-lg border bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-gray-800">
            最近の申請
          </h3>

          {recentRequests.length === 0 ? (
            <p className="text-sm text-gray-500">最近の申請はありません。</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-gray-50 text-left">
                    <th className="p-3">タイトル</th>
                    <th className="p-3">申請者</th>
                    <th className="p-3">対象職員</th>
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
                      <td className="p-3">{request.user?.name ?? "-"}</td>
                      <td className="p-3">
                        {request.employee
                          ? `${request.employee.lastName} ${request.employee.firstName}`
                          : "-"}
                      </td>
                      <td className="p-3">{request.status}</td>
                      <td className="p-3">
                        {new Date(request.createdAt).toLocaleDateString(
                          "ja-JP",
                        )}
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
