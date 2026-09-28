import BackLink from "@/components/BackLink";
import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { requireHRManager } from "@/lib/auth-guard";
import { fullyDeleteEmploymentContract } from "@/app/actions/employment-contract-full-delete";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function FullDeletePage({
  params,
}: Props) {
  await requireHRManager();

  const { id } = await params;

  const contract = await prisma.employmentContract.findUnique({
    where: { id },
    include: {
      employee: true,
      employmentContractConsents: {
        select: { id: true },
      },
    },
  });

  if (!contract) {
    notFound();
  }

  const contractCount = await prisma.employmentContract.count({
    where: {
      employeeId: contract.employeeId,
    },
  });

  const canDelete =
    contract.isCurrent &&
    contractCount === 1 &&
    contract.employmentContractConsents.length === 0;

  return (
    <main className="mx-auto max-w-2xl p-6">
      <BackLink
        href={`/employee-contracts/${id}`}
        label="契約詳細へ戻る"
      />

      <h1 className="mt-4 text-2xl font-bold text-red-700">
        雇用条件書の完全削除
      </h1>

      <div className="mt-6 rounded border border-red-200 bg-red-50 p-4">
        <p>職員番号: {contract.employee.employeeNo}</p>
        <p>
          氏名: {contract.employee.lastName}{" "}
          {contract.employee.firstName}
        </p>
        <p>Version: v{contract.version}</p>
      </div>

      {!canDelete ? (
        <div className="mt-6 rounded border border-yellow-300 bg-yellow-50 p-4 text-yellow-800">
          この契約は完全削除の条件を満たしていません。
        </div>
      ) : (
        <form
          action={fullyDeleteEmploymentContract}
          className="mt-6 space-y-5 rounded border bg-white p-6"
        >
          <input type="hidden" name="id" value={contract.id} />

          <div>
            <label className="mb-1 block font-medium">
              削除理由
            </label>

            <textarea
              name="reason"
              required
              rows={5}
              className="w-full rounded border p-2"
              placeholder="誤作成した理由を入力してください"
            />
          </div>

          <p className="text-sm text-red-700">
            この操作は取り消せません。
          </p>

          <button
            type="submit"
            className="rounded bg-red-700 px-4 py-2 text-white hover:bg-red-800"
          >
            完全削除を実行
          </button>
        </form>
      )}
    </main>
  );
}
