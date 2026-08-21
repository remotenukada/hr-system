import Link from "next/link";
import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export default async function MyEmploymentContractsPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const employee =
    await prisma.employee.findUnique({
      where: {
        userId: session.user.id,
      },
    });

  if (!employee) {
    redirect("/mypage");
  }

  const contracts =
    await prisma.employmentContract.findMany({
      where: {
        employeeId: employee.id,
      },
      include: {
        employmentContractConsents: true,
      },
      orderBy: {
        version: "desc",
      },
    });

  return (
    <main className="mx-auto max-w-4xl p-6">
      <h1 className="mb-6 text-2xl font-bold">
        雇用条件書
      </h1>

      <table className="min-w-full text-sm">
        <thead>
          <tr>
            <th className="border p-2 text-left">
              Version
            </th>

            <th className="border p-2 text-left">
              契約区分
            </th>

            <th className="border p-2 text-left">
              開始日
            </th>

            <th className="border p-2 text-left">
              PDF
            </th>

            <th className="border p-2 text-left">
              状態
            </th>

            <th className="border p-2 text-left">
              操作
            </th>
          </tr>
        </thead>

        <tbody>
          {contracts.map((item) => (
            <tr key={item.id}>
              <td className="border p-2">
                v{item.version}
              </td>

              <td className="border p-2">
                {item.contractType}
              </td>

              <td className="border p-2">
                {new Date(
                  item.startDate,
                ).toLocaleDateString("ja-JP")}
              </td>

              <td className="border p-2">
                <a
                  href={`/employee-contracts/${item.id}/pdf`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  PDF
                </a>
              </td>

              

              <td className="border p-2">
                {item.employmentContractConsents?.length > 0
                  ? "同意済"
                  : "未同意"}
              </td>

              <td className="border p-2">
                {item.employmentContractConsents?.length > 0 ? (
                  <span className="text-green-600 font-medium">
                    完了
                  </span>
                ) : (
                  <Link
                    href={`/mypage/employment-contracts/${item.id}`}
                    className="rounded bg-blue-600 px-3 py-1 text-xs text-white hover:bg-blue-500"
                  >
                    電子同意
                  </Link>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
