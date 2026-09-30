import BackLink from "@/components/BackLink";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { requireHRManager } from "@/lib/auth-guard";
import {
  calculateAnnualGrantDays,
  calculateRuleBasedNextGrantDate,
} from "@/lib/leave-annual-grant";

export default async function LeaveBalancesPage() {
  await requireHRManager();

  const balances = await prisma.leaveBalance.findMany({
    include: {
      employee: {
        include: {
          department: true,
        },
      },
    },
    orderBy: {
      employee: {
        employeeNo: "asc",
      },
    },
  });

  return (
    <main className="p-8">
      <BackLink href="/" label="ダッシュボードへ戻る" />
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">年次有給休暇残高一覧</h1>
          <p className="mt-1 text-sm text-gray-500">
            職員ごとの年次有給休暇残高を管理します。
          </p>
        </div>
      </div>
    </main>
  );
}
