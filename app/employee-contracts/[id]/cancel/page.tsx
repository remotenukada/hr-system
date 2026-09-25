import BackLink from "@/components/BackLink";
import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { cancelEmploymentContract } from "@/app/actions/employment-contract";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ContractCancelPage({
  params,
}: Props) {
  const { id } = await params;

  const contract = await prisma.employmentContract.findUnique({
    where: { id },
    include: {
      employee: true,
    },
  });

  if (!contract) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-2xl p-6">
      <BackLink
        href={`/employee-contracts/${contract.id}`}
        label="契約詳細に戻る"
      />

      <h1 className="mb-6 text-2xl font-bold text-red-700">
        契約更新取消
      </h1>

      <form action={cancelEmploymentContract} className="space-y-4">
        <input type="hidden" name="id" value={contract.id} />

        <div className="rounded border bg-gray-50 p-4 space-y-1">
          <div>
            <span className="font-semibold">職員番号:</span> {contract.employee.employeeNo}
          </div>
          <div>
            <span className="font-semibold">氏名:</span> {contract.employee.lastName} {contract.employee.firstName}
          </div>
          <div>
            <span className="font-semibold">Version:</span> v{contract.version}
          </div>
        </div>

        <div>
          <label className="mb-1 block font-medium">
            取消理由 <span className="text-red-600">*</span>
          </label>

          <textarea
            name="reason"
            required
            rows={5}
            placeholder="契約更新を取り消す具体的な理由を入力してください"
            className="w-full rounded border p-2"
          />
        </div>

        <div className="flex gap-4 items-center">
          <button
            type="submit"
            className="rounded bg-red-600 px-4 py-2 font-medium text-white hover:bg-red-700"
          >
            更新取消を実行
          </button>
        </div>
      </form>
    </main>
  );
}
