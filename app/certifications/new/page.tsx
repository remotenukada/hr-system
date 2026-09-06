import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import BackLink from "@/components/BackLink";
import { requireHRManager } from "@/lib/auth-guard";
import { prisma } from "@/lib/prisma";

async function createCertification(formData: FormData) {
  "use server";

  await requireHRManager();

  const name = String(formData.get("name") ?? "").trim();
  const expiryManaged =
    formData.get("expiryManaged") === "on";

  if (!name) {
    redirect("/certifications/new?error=required");
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

export default async function NewCertificationPage() {
  await requireHRManager();

  return (
    <main className="p-8">
      /certifications

      <h1 className="mb-2 text-3xl font-bold">資格登録</h1>

      <p className="mb-6 text-sm text-gray-500">
        資格を登録した後、必要書類を設定できます。
      </p>

      <form action={createCertification} className="max-w-xl space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium">
            資格名
          </label>

          <input
            name="name"
            className="w-full rounded border p-2"
            placeholder="例: 介護福祉士"
            required
          />
        </div>

        <div className="rounded border bg-gray-50 p-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="expiryManaged"
              className="h-4 w-4"
            />
            <span className="text-sm font-medium">
              有効期限を管理する
            </span>
          </label>

          <p className="mt-2 text-xs text-gray-500">
            チェックした資格では、職員登録時に有効期限が必須になります。
          </p>
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
