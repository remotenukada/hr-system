import BackLink from "@/components/BackLink";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { updateAllowanceMaster } from "@/app/actions/allowance-master";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditAllowanceMasterPage(
  { params }: Props,
) {
  const { id } = await params;

  const allowance =
    await prisma.allowanceMaster.findUnique({
      where: { id },
    });

  if (!allowance) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-2xl p-6">
      <BackLink href="/allowance-masters" label="手当マスタ一覧へ戻る" />
      <h1 className="mb-6 text-2xl font-bold">
        手当マスタ編集
      </h1>

      <form action={updateAllowanceMaster} className="space-y-4">
        <input
          type="hidden"
          name="id"
          value={allowance.id}
        />

        <input
          name="name"
          defaultValue={allowance.name}
          className="w-full rounded border p-2"
        />

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
