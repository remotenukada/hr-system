import Link from "next/link";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import BackLink from "@/components/BackLink";
import { requireAdmin } from "@/lib/auth-guard";
import { logAudit } from "@/lib/audit-log";
import { prisma } from "@/lib/prisma";

type Props = {
  searchParams: Promise<{
    updated?: string;
    error?: string;
  }>;
};

async function assignEmployeeNumber(formData: FormData) {
  "use server";

  const session = await requireAdmin();

  const employeeId = String(
    formData.get("employeeId") ?? "",
  ).trim();

  const employeeNo = String(
    formData.get("employeeNo") ?? "",
  ).trim();

  if (!employeeId || !employeeNo) {
    redirect(
      "/employee-number-assignments?error=required",
    );
  }

  if (employeeNo.startsWith("TMP-")) {
    redirect(
      "/employee-number-assignments?error=temporary",
    );
  }

  const employee = await prisma.employee.findUnique({
    where: { id: employeeId },
    select: {
      id: true,
      employeeNo: true,
      lastName: true,
      firstName: true,
    },
  });

  if (!employee) {
    redirect(
      "/employee-number-assignments?error=notFound",
    );
  }

  const duplicate = await prisma.employee.findUnique({
    where: { employeeNo },
    select: { id: true },
  });

  if (duplicate && duplicate.id !== employeeId) {
    redirect(
      "/employee-number-assignments?error=duplicate",
    );
  }

  await prisma.$transaction(async (tx) => {
    await tx.employee.update({
      where: { id: employeeId },
      data: { employeeNo },
    });

    await tx.userInvitation.updateMany({
      where: {
        createdEmployeeId: employeeId,
      },
      data: {
        employeeNo,
      },
    });
  });

  await logAudit({
    userId: session.user.id,
    userName: session.user.name,
    action: "EMPLOYEE_NUMBER_ASSIGNED",
    targetType: "Employee",
    targetId: employee.id,
    description:
      `職員番号採番: ${employee.lastName} ${employee.firstName}`,
    beforeData: {
      employeeNo: employee.employeeNo,
    },
    afterData: {
      employeeNo,
    },
  });

  revalidatePath("/employees");
  revalidatePath("/employee-number-assignments");

  redirect(
    "/employee-number-assignments?updated=1",
  );
}

export default async function EmployeeNumberAssignmentsPage({
  searchParams,
}: Props) {
  await requireAdmin();

  const params = await searchParams;

  const employees = await prisma.employee.findMany({
    where: {
      OR: [
        {
          employeeNo: {
            startsWith: "TMP-",
          },
        },
        {
          employeeNo: "",
        },
      ],
    },
    include: {
      facility: true,
      department: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  return (
    <main className="mx-auto max-w-6xl p-8">
      <BackLink href="/employees" label="職員一覧へ戻る" />

      <div className="mt-4">
        <h1 className="text-3xl font-bold">
          職員番号採番
        </h1>

        <p className="mt-2 text-sm text-gray-600">
          未採番または仮番号の職員へ正式な職員番号を設定します。
        </p>
      </div>

      {params.updated === "1" && (
        <div className="mt-4 rounded border border-green-200 bg-green-50 p-3 text-sm text-green-700">
          職員番号を更新しました。
        </div>
      )}

      {params.error && (
        <div className="mt-4 rounded border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {params.error === "duplicate"
            ? "その職員番号は既に使用されています。"
            : params.error === "temporary"
              ? "正式な職員番号を入力してください。"
              : "入力内容を確認してください。"}
        </div>
      )}

      <section className="mt-6 overflow-x-auto rounded-lg border bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 text-left">
              <th className="p-3">現在番号</th>
              <th className="p-3">氏名</th>
              <th className="p-3">施設</th>
              <th className="p-3">部署</th>
              <th className="p-3">正式職員番号</th>
              <th className="p-3">操作</th>
            </tr>
          </thead>

          <tbody>
            {employees.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="p-8 text-center text-gray-500"
                >
                  採番待ちの職員はいません。
                </td>
              </tr>
            ) : (
              employees.map((employee) => (
                <tr
                  key={employee.id}
                  className="border-t"
                >
                  <td className="p-3 font-mono text-xs">
                    {employee.employeeNo || "未採番"}
                  </td>

                  <td className="p-3 font-medium">
                    {employee.lastName}{" "}
                    {employee.firstName}
                  </td>

                  <td className="p-3">
                    {employee.facility?.name ?? "-"}
                  </td>

                  <td className="p-3">
                    {employee.department?.name ?? "-"}
                  </td>

                  <td
                    className="p-3"
                    colSpan={2}
                  >
                    <form action={assignEmployeeNumber} className="flex items-center gap-2">
                      <input
                        type="hidden"
                        name="employeeId"
                        value={employee.id}
                      />

                      <input
                        name="employeeNo"
                        required
                        placeholder="正式職員番号"
                        className="w-48 rounded border px-3 py-2"
                      />

                      <button
                        type="submit"
                        className="rounded bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
                      >
                        採番
                      </button>

                      <Link
                        href={`/employees/${employee.id}`}
                        className="ml-2 text-sm text-blue-600 hover:underline"
                      >
                        職員詳細
                      </Link>
                    </form>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </section>
    </main>
  );
}
