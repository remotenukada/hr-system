import { auth } from "../../auth";
import { prisma } from "../../lib/prisma";
import { redirect } from "next/navigation";

export default async function MyPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const employee = await prisma.employee.findUnique({
    where: {
      userId: session.user.id,
    },
    include: {
      department: true,
      leaveBalance: true,
    },
  });

  const remainingLeave = employee?.leaveBalance
    ? employee.leaveBalance.grantedDays - employee.leaveBalance.usedDays
    : 0;

  if (!employee) {
    return (
      <main className="mx-auto max-w-3xl p-8">
        <h1 className="text-2xl font-bold">マイページ</h1>
        <p className="mt-4 text-red-600">
          職員情報が見つかりません。
        </p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl p-8">
      <h1 className="text-3xl font-bold">マイページ</h1>

      <div className="mt-6 rounded border bg-white p-6">
        <dl className="space-y-3">
          <div>
            <dt className="font-semibold">氏名</dt>
            <dd>
              {employee.lastName} {employee.firstName}
            </dd>
          </div>

          <div>
            <dt className="font-semibold">社員番号</dt>
            <dd>{employee.employeeNo}</dd>
          </div>

          <div>
            <dt className="font-semibold">メールアドレス</dt>
            <dd>{employee.email}</dd>
          </div>

          <div>
            <dt className="font-semibold">部署</dt>
            <dd>
              {employee.department?.name ?? "-"}
            </dd>
          </div>

          <div>
            <dt className="font-semibold">入社日</dt>
            <dd>
              {employee.hireDate
                ? employee.hireDate.toLocaleDateString("ja-JP")
                : "-"}
            </dd>
          </div>

          <div>
            <dt className="font-semibold">有給残数</dt>
            <dd>{remainingLeave} 日</dd>
          </div>
        </dl>
      </div>
    </main>
  );
}
