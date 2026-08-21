import BackLink from "@/components/BackLink";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { updateJobTitleMaster } from "@/app/actions/job-title-master";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditJobTitleMasterPage(
  { params }: Props,
) {
  const { id } = await params;

  const jobTitle =
    await prisma.jobTitleMaster.findUnique({
      where: { id },
    });

  if (!jobTitle) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-2xl p-6">
      <BackLink href="/job-title-masters" label="職種マスタ一覧へ戻る" />
      <h1 className="mb-6 text-2xl font-bold">
        職種マスタ編集
      </h1>

      <form action={updateJobTitleMaster} className="space-y-4">
        <input
          type="hidden"
          name="id"
          value={jobTitle.id}
        />

        <input
          name="name"
          defaultValue={jobTitle.name}
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
