import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "../../../../lib/prisma";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

function formatDate(date: Date | null) {
  if (!date) return "-";
  return date.toLocaleDateString("ja-JP");
}

export default async function CertificationEmployeesPage({
  params,
}: Props) {
  const { id } = await params;

  const certification =
    await prisma.certification.findUnique({
      where: {
        id,
      },
      include: {
        employeeCertifications: {
          include: {
            employee: {
              include: {
                department: true,
              },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

  if (!certification) {
    notFound();
  }

  return (
    <main className="p-8">
      <div className="mb-6">
        <Link
          href="/certification-reports"
          className="text-sm text-blue-600 hover:underline"
        >
          ← 資格保有レポートへ戻る
        </Link>

        <h1 className="mt-2 text-3xl font-bold">
          {certification.name} 保有者一覧
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          この資格を登録している職員の一覧です。
        </p>
      </div>

      {certification.employeeCertifications.length === 0 ? (
        <p className="text-sm text-gray-500">
          この資格を保有している職員はまだ登録されていません。
        </p>
      ) : (
        <table className="w-full max-w-5xl border-collapse border">
          <thead>
            <tr className="bg-gray-50">
              <th className="border p-2 text-left">
                社員番号
              </th>
              <th className="border p-2 text-left">
                氏名
              </th>
              <th className="border p-2 text-left">
                部署
              </th>
              <th className="border p-2 text-left">
                取得日
              </th>
              <th className="border p-2 text-left">
                有効期限
              </th>
            </tr>
          </thead>

          <tbody>
            {certification.employeeCertifications.map((item) => (
              <tr key={item.id}>
                <td className="border p-2">
                  {item.employee.employeeNo}
                </td>
                <td className="border p-2">
                  <Link
                    href={`/employees/${item.employee.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    {item.employee.lastName} {item.employee.firstName}
                  </Link>
                </td>
                <td className="border p-2">
                  {item.employee.department?.name ?? "-"}
                </td>
                <td className="border p-2">
                  {formatDate(item.acquiredDate)}
                </td>
                <td className="border p-2">
                  {formatDate(item.expiryDate)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}
