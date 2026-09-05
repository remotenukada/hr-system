import BackLink from "@/components/BackLink";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "../../../lib/prisma";

async function createCertification(formData: FormData) {
  "use server";

  const name = String(formData.get("name") ?? "").trim();

  const expiryManaged =
    formData.get("expiryManaged") === "on";

  if (!name) {
    return;
  }

  await prisma.certification.create({
    data: {
      name,
      expiryManaged,
    },
  });

  revalidatePath("/certifications");
  redirect("/certifications");
}

export default function NewCertificationPage() {
  return (
    <main className="p-8">
      <BackLink href="/certifications" label="資格一覧へ戻る" />
      <h1 className="mb-6 text-3xl font-bold">資格登録</h1>

      <form action={createCertification} className="max-w-md space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium">
            資格名
          </label>

          <input
            name="name"
            className="w-full rounded border p-2"
            placeholder="介護福祉士"
            required
          />
        </div>

        <div>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="expiryManaged"
            />
            有効期限を管理する
          </label>
        </div>

        <button
          type="submit"
          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          登録
        </button>
      </form>
    </main>
  );
}
