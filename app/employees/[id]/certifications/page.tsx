import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "../../../../lib/prisma";

type Props = {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    error?: string;
  }>;
};

export default async function EmployeeCertificationsPage({
  params,
  searchParams,
}: Props) {
  const { id } = await params;
  const { error } = await searchParams;

  const employee = await prisma.employee.findUnique({
    where: {
      id,
    },
    include: {
      certifications: {
        include: {
          certification: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!employee) {
    notFound();
  }

  const certifications = await prisma.certification.findMany({
    orderBy: {
      name: "asc",
    },
  });

  async function addEmployeeCertification(formData: FormData) {
    "use server";

    const certificationId = String(
      formData.get("certificationId") ?? "",
    ).trim();

    const acquiredDateRaw = String(
      formData.get("acquiredDate") ?? "",
    );

    const expiryDateRaw = String(
      formData.get("expiryDate") ?? "",
    );

    if (!certificationId) {
      redirect(`/employees/${id}/certifications?error=required`);
    }

    const existing =
      await prisma.employeeCertification.findUnique({
        where: {
          employeeId_certificationId: {
            employeeId: id,
            certificationId,
          },
        },
      });

    if (existing) {
      redirect(`/employees/${id}/certifications?error=duplicate`);
    }

    await prisma.employeeCertification.create({
      data: {
        employeeId: id,
        certificationId,
        acquiredDate: acquiredDateRaw
          ? new Date(`${acquiredDateRaw}T00:00:00`)
          : null,
        expiryDate: expiryDateRaw
          ? new Date(`${expiryDateRaw}T00:00:00`)
          : null,
      },
    });

    revalidatePath(`/employees/${id}`);
    revalidatePath(`/employees/${id}/certifications`);

    redirect(`/employees/${id}/certifications`);
  }

  async function deleteEmployeeCertification(formData: FormData) {
    "use server";

    const employeeCertificationId = String(
      formData.get("employeeCertificationId") ?? "",
    ).trim();

    if (!employeeCertificationId) {
      redirect(`/employees/${id}/certifications`);
    }

    await prisma.employeeCertification.deleteMany({
      where: {
        id: employeeCertificationId,
        employeeId: id,
      },
    });

    revalidatePath(`/employees/${id}`);
    revalidatePath(`/employees/${id}/certifications`);

    redirect(`/employees/${id}/certifications`);
  }

  return (
    <main className="p-8">
      <div className="mb-6">
        <Link
          href={`/employees/${employee.id}`}
          className="text-sm text-blue-600 hover:underline"
        >
          ← 職員詳細へ戻る
        </Link>

        <h1 className="mt-2 text-3xl font-bold">
          職員資格管理
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          {employee.lastName} {employee.firstName} さんの保有資格を管理します。
        </p>
      </div>

      {error === "required" && (
        <div className="mb-4 max-w-xl rounded border border-red-300 bg-red-50 p-3 text-sm text-red-700">
          資格を選択してください。
        </div>
      )}

      {error === "duplicate" && (
        <div className="mb-4 max-w-xl rounded border border-red-300 bg-red-50 p-3 text-sm text-red-700">
          この資格は既に登録されています。
        </div>
      )}

      <section className="mb-8 max-w-xl rounded border bg-white p-6">
        <h2 className="mb-4 text-xl font-bold">
          資格を追加
        </h2>

        {certifications.length === 0 ? (
          <p className="text-sm text-gray-500">
            先に資格マスタを登録してください。
          </p>
        ) : (
          <form action={addEmployeeCertification} className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium">
                資格
              </label>

              <select
                name="certificationId"
                className="w-full rounded border p-2"
                required
              >
                <option value="">選択してください</option>
                {certifications.map((certification) => (
                  <option
                    key={certification.id}
                    value={certification.id}
                  >
                    {certification.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">
                取得日
              </label>

              <input
                type="date"
                name="acquiredDate"
                className="w-full rounded border p-2"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">
                有効期限
              </label>

              <input
                type="date"
                name="expiryDate"
                className="w-full rounded border p-2"
              />
            </div>

            <button
              type="submit"
              className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              追加
            </button>
          </form>
        )}
      </section>

      <section>
        <h2 className="mb-4 text-xl font-bold">
          保有資格一覧
        </h2>

        {employee.certifications.length === 0 ? (
          <p className="text-sm text-gray-500">
            登録済みの資格はありません。
          </p>
        ) : (
          <table className="w-full max-w-3xl border-collapse border">
            <thead>
              <tr className="bg-gray-50">
                <th className="border p-2 text-left">
                  資格名
                </th>
                <th className="border p-2 text-left">
                  取得日
                </th>
                <th className="border p-2 text-left">
                  有効期限
                </th>
                <th className="border p-2 text-center">
                  操作
                </th>
              </tr>
            </thead>

            <tbody>
              {employee.certifications.map((item) => (
                <tr key={item.id}>
                  <td className="border p-2">
                    {item.certification.name}
                  </td>
                  <td className="border p-2">
                    {item.acquiredDate
                      ? item.acquiredDate.toLocaleDateString("ja-JP")
                      : "-"}
                  </td>
                  <td className="border p-2">
                    {item.expiryDate
                      ? item.expiryDate.toLocaleDateString("ja-JP")
                      : "-"}
                  </td>
                  <td className="border p-2 text-center">
                    <form action={deleteEmployeeCertification}>
                      <input
                        type="hidden"
                        name="employeeCertificationId"
                        value={item.id}
                      />
                      <button
                        type="submit"
                        className="rounded bg-red-600 px-3 py-1 text-sm text-white hover:bg-red-700"
                      >
                        削除
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </main>
  );
}
