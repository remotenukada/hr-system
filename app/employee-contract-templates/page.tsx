import Link from "next/link";

import { prisma } from "@/lib/prisma";
import { duplicateEmploymentContractTemplate } from "@/app/actions/employment-contract-template";

export default async function EmploymentContractTemplatesPage() {
  async function toggleTemplateStatus(
    formData: FormData,
  ) {
    "use server";

    const id =
      String(formData.get("id") ?? "");

    const current =
      await prisma.employmentContractTemplate.findUnique({
        where: {
          id,
        },
      });

    if (!current) {
      return;
    }

    await prisma.employmentContractTemplate.update({
      where: {
        id,
      },
      data: {
        isActive: !current.isActive,
      },
    });
  }

  const templates =
    await prisma.employmentContractTemplate.findMany({
      orderBy: {
        name: "asc",
      },
    });

  return (
    <main className="mx-auto max-w-6xl p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          雇用条件書テンプレート
        </h1>

        <Link
          href="/employee-contract-templates/new"
          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          新規作成
        </Link>
      </div>

      <div className="overflow-x-auto rounded border bg-white">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="border p-2 text-left">
                テンプレート名
              </th>
              <th className="border p-2 text-left">
                契約区分
              </th>
              <th className="border p-2 text-left">
                勤務時間
              </th>
              <th className="border p-2 text-left">
                休日
              </th>
              <th className="border p-2 text-left">
                状態
              </th>
              <th className="border p-2 text-center">
                切り替え
              </th>
              <th className="border p-2 text-center">
                操作
              </th>
            </tr>
          </thead>

          <tbody>
            {templates.map((template) => (
              <tr key={template.id}>
                <td className="border p-2">
                  {template.name}
                </td>

                <td className="border p-2">
                  {template.contractType}
                </td>

                <td className="border p-2">
                  {template.workStartTime}
                  {" ～ "}
                  {template.workEndTime}
                </td>

                <td className="border p-2">
                  {template.holidayRule}
                </td>

                <td className="border p-2">
                  {template.isActive
                    ? "有効"
                    : "無効"}
                </td>

                <td className="border p-2 text-center">
                  <form action={toggleTemplateStatus}>
                    <input
                      type="hidden"
                      name="id"
                      value={template.id}
                    />

                    <button
                      type="submit"
                      className="rounded border px-2 py-1 text-xs"
                    >
                      {template.isActive
                        ? "無効化"
                        : "有効化"}
                    </button>
                  </form>
                </td>

                <td className="border p-2 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <Link
                      href={`/employee-contract-templates/${template.id}/edit`}
                      className="text-blue-600 hover:underline"
                    >
                      編集
                    </Link>

                    <form action={duplicateEmploymentContractTemplate}>
                      <input
                        type="hidden"
                        name="id"
                        value={template.id}
                      />
                      <button
                        type="submit"
                        className="rounded border border-gray-300 px-2 py-1 text-xs hover:bg-gray-50"
                      >
                        複製
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
