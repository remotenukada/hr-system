import { notFound } from "next/navigation";

import { updateContractTypeMaster } from "@/app/actions/contract-type-master";
import { prisma } from "@/lib/prisma";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditContractTypeMasterPage({
  params,
}: Props) {
  const { id } = await params;

  const item = await prisma.contractTypeMaster.findUnique({
    where: { id },
  });

  if (!item) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-2xl p-6">
      <h1 className="mb-6 text-2xl font-bold">
        契約区分マスタ編集
      </h1>

      <form action={updateContractTypeMaster}>
        <input type="hidden" name="id" value={item.id} />

        <div>
          <label className="mb-1 block text-sm font-medium">
            契約区分名
          </label>

          <input
            name="name"
            defaultValue={item.name}
            required
            className="w-full rounded border p-2"
          />
        </div>

        <button
          type="submit"
          className="mt-4 rounded bg-blue-600 px-4 py-2 text-white"
        >
          保存
        </button>
      </form>
    </main>
  );
}
