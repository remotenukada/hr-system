import BackLink from "@/components/BackLink";
import Link from "next/link";
import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";
import { requireHRManager } from "@/lib/auth-guard";
import { logAudit } from "@/lib/audit-log";

function formatDate(date: Date | null | undefined) {
  if (!date) {
    return "-";
  }

  return new Date(date).toLocaleDateString("ja-JP");
}

export default async function EmployeeLeavesPage() {
  await requireHRManager();

  async function returnEmployee(formData: FormData) {
    "use server";

    const session = await requireHRManager();

    const employeeId = String(formData.get("employeeId") ?? "").trim();

    if (!employeeId) {
      return;
    }

    const employee = await prisma.employee.findUnique({
      where: {
        id: employeeId,
      },
      include: {
        department: true,
      },
    });

    if (!employee) {
      throw new Error("対象職員が見つかりません。");
    }

    if (employee.status !== "LEAVE") {
      throw new Error("対象職員は休職中ではありません。");
    }

    const updatedEmployee = await prisma.employee.update({
      where: {
        id: employeeId,
      },
      data: {
        status: "ACTIVE",
      },
    });

    await prisma.employmentHistory.create({
      data: {
        employeeId,
        action: "RETURNED",
        effectiveDate: new Date(),
        reason: "休職・復職管理画面から復職",
      },
    });

    await logAudit({
      userId: session.user.id,
      userName: session.user.name,
      action: "EMPLOYEE_RETURNED",
      targetType: "Employee",
      targetId: employeeId,
      description: `${employee.employeeNo} を復職処理`,
      beforeData: {
        status: employee.status,
      },
      afterData: {
        status: updatedEmployee.status,
      },
    });

    revalidatePath("/employee-leaves");
    revalidatePath("/employees");
    revalidatePath(`/employees/${employeeId}`);
    revalidatePath("/");
  }

  const employees = await prisma.employee.findMany({
    where: {
      status: "LEAVE",
    },
    include: {
      department: true,
      employmentHistories: {
        where: {
          action: "LEAVE_STARTED",
        },
        orderBy: {
          effectiveDate: "desc",
        },
        take: 1,
      },
    },
    orderBy: {
      employeeNo: "asc",
    },
  });

  return (
    <main className="mx-auto max-w-7xl p-8">
      <BackLink href="/" label="ダッシュボードへ戻る" />
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            休職・復職管理
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            休職中の職員を確認し、復職処理を行います。
          </p>
        </div>

        <Link
          href="/"
          className="rounded border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          ダッシュボードへ戻る
        </Link>
      </div>

      <section className="rounded-lg border bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800">
            休職中の職員
          </h2>

          <span className="rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-800">
            {employees.length}名
          </span>
        </div>

        {employees.length === 0 ? (
          <p className="text-sm text-gray-500">
            現在、休職中の職員はいません。
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="border p-2 text-left font-medium text-gray-700">
                    社員番号
                  </th>
                  <th className="border p-2 text-left font-medium text-gray-700">
                    氏名
                  </th>
                  <th className="border p-2 text-left font-medium text-gray-700">
                    部署
                  </th>
                  <th className="border p-2 text-left font-medium text-gray-700">
                    役職
                  </th>
                  <th className="border p-2 text-left font-medium text-gray-700">
                    休職開始日
                  </th>
                  <th className="border p-2 text-left font-medium text-gray-700">
                    備考
                  </th>
                  <th className="border p-2 text-left font-medium text-gray-700">
                    操作
                  </th>
                </tr>
              </thead>

              <tbody>
                {employees.map((employee) => {
                  const leaveHistory = employee.employmentHistories[0];

                  return (
                    <tr key={employee.id} className="hover:bg-gray-50">
                      <td className="border p-2">
                        {employee.employeeNo}
                      </td>
                      <td className="border p-2 font-medium">
                        {employee.lastName} {employee.firstName}
                      </td>
                      <td className="border p-2">
                        {employee.department?.name ?? "-"}
                      </td>
                      <td className="border p-2">
                        {employee.position ?? "-"}
                      </td>
                      <td className="border p-2">
                        {formatDate(leaveHistory?.effectiveDate)}
                      </td>
                      <td className="border p-2">
                        {leaveHistory?.reason ?? "-"}
                      </td>
                      <td className="border p-2">
                        <div className="flex flex-wrap gap-2">
                          <Link
                            href={`/employees/${employee.id}`}
                            className="rounded border border-gray-300 bg-white px-3 py-1 text-xs font-medium text-gray-700 hover:bg-gray-50"
                          >
                            詳細
                          </Link>

                          <form action={returnEmployee}>
                            <input
                              type="hidden"
                              name="employeeId"
                              value={employee.id}
                            />
                            <button
                              type="submit"
                              className="rounded bg-green-600 px-3 py-1 text-xs font-medium text-white hover:bg-green-700"
                            >
                              復職処理
                            </button>
                          </form>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}
