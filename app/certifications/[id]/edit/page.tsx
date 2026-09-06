import { revalidatePath } from "next/cache";
import { notFound, redirect } from "next/navigation";

import BackLink from "@/components/BackLink";
import { requireHRManager } from "@/lib/auth-guard";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    error?: string;
  }>;
};

export default async function EditCertificationPage({
  params,
  searchParams,
}: Props) {
  await requireHRManager();

  const { id } = await params;
  const { error } = await searchParams;

  const certification = await prisma.certification.findUnique({
    where: {
      id,
    },
    include: {
      documentRules: {
        orderBy: [
          {
            sortOrder: "asc",
          },
          {
            documentName: "asc",
          },
        ],
      },
    },
  });

  if (!certification) {
    notFound();
  }

  async function updateCertification(formData: FormData) {
    "use server";

    await requireHRManager();

    const name = String(formData.get("name") ?? "").trim();
    const expiryManaged =
      formData.get("expiryManaged") === "on";

    if (!name) {
      redirect(`<certifications/${id}/edit?error=required`);
    }

    await prisma.certification.update({
      where: {
        id,
      },
      data: {
        name,
        expiryManaged,
      },
    });

    if (!expiryManaged) {
      await prisma.employeeCertification.updateMany({
        where: {
          certificationId: id,
        },
        data: {
          expiryDate: null,
        },
      });
    }

    revalidatePath("/certifications");
    revalidatePath(`/certifications/${id}/edit`);

    redirect(`/certifications/${id}/edit`);
  }

  async function addDocumentRule(formData: FormData) {
    "use server";

    await requireHRManager();

    const documentName = String(
      formData.get("documentName") ?? "",
    ).trim();

    const required =
      formData.get("required") === "on";

    const sortOrderRaw = Number(
      formData.get("sortOrder") ?? 0,
    );

    const sortOrder =
      Number.isInteger(sortOrderRaw) && sortOrderRaw >= 0
        ? sortOrderRaw
        : 0;

    if (!documentName) {
      redirect(
        `/certifications/${id}/edit?error=documentRequired`,
      );
    }

    await prisma.certificationDocumentRule.upsert({
      where: {
        certificationId_documentName: {
          certificationId: id,
          documentName,
        },
      },
      update: {
        required,
        sortOrder,
      },
      create: {
        certificationId: id,
        documentName,
        required,
        sortOrder,
      },
    });

    revalidatePath("/certifications");
    revalidatePath(`/certifications/${id}/edit`);

    redirect(`/certifications/${id}/edit`);
  }

  async function deleteDocumentRule(formData: FormData) {
    "use server";

    await requireHRManager();

    const ruleId = String(
      formData.get("ruleId") ?? "",
    ).trim();

    if (!ruleId) {
      redirect(`/certifications/${id}/edit`);
    }

    await prisma.certificationDocumentRule.deleteMany({
      where: {
        id: ruleId,
        certificationId: id,
      },
    });

    revalidatePath("/certifications");
    revalidatePath(`/certifications/${id}/edit`);

    redirect(`/certifications/${id}/edit`);
  }

  return (
    <main className="mx-auto max-w-4xl p-8">
/certifications

      <div className="mb-6">
        <h1 className="text-3xl font-bold">資格マスタ設定</h1>
        <p className="mt-1 text-sm text-gray-500">
          資格名、期限管理、登録時に必要な書類を設定します。
        </p>
      </div>

      {error === "required" && (
        <div className="mb-4 rounded border border-red-300 bg-red-50 p-3 text-sm text-red-700">
          資格名を入力してください。
        </div>
      )}

      {error === "documentRequired" && (
        <div className="mb-4 rounded border border-red-300 bg-red-50 p-3 text-sm text-red-700">
          書類名を入力してください。
        </div>
      )}

      <section className="mb-8 rounded-lg border bg-white p-6">
        <h2 className="mb-4 text-xl font-bold">基本設定</h2>

        <form action={updateCertification} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">
              資格名
            </label>

            <input
              name="name"
              defaultValue={certification.name}
              className="w-full rounded border p-2"
              required
            />
          </div>

          <div className="rounded border bg-gray-50 p-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="expiryManaged"
                defaultChecked={certification.expiryManaged}
                className="h-4 w-4"
              />

              <span className="text-sm font-medium">
                有効期限を管理する
              </span>
            </label>

            <p className="mt-2 text-xs text-gray-500">
              期限管理を無効にすると、この資格に登録済みの有効期限は解除されます。
            </p>
          </div>

          <button
            type="submit"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            基本設定を保存
          </button>
        </form>
      </section>

      <section className="mb-8 rounded-lg border bg-white p-6">
        <h2 className="mb-2 text-xl font-bold">
          必要書類を追加
        </h2>

        <p className="mb-4 text-sm text-gray-500">
          この資格を登録するときに表示する書類を追加します。
        </p>

        <form action={addDocumentRule} className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <div className="md:col-span-2">
            <label className="mb-1 block text-sm font-medium">
              書類名
            </label>

            <input
              name="documentName"
              placeholder="例: 看護師免許証"
              className="w-full rounded border p-2"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              表示順
            </label>

            <input
              type="number"
              name="sortOrder"
              defaultValue={
                certification.documentRules.length + 1
              }
              min={0}
              className="w-full rounded border p-2"
            />
          </div>

          <label className="flex items-end gap-2 pb-2">
            <input
              type="checkbox"
              name="required"
              defaultChecked
              className="h-4 w-4"
            />
            <span className="text-sm">必須</span>
          </label>

          <div className="flex items-end md:col-span-4">
            <button
              type="submit"
              className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700"
            >
              追加
            </button>
          </div>
        </form>
      </section>

      <section className="rounded-lg border bg-white p-6">
        <h2 className="mb-4 text-xl font-bold">
          登録済み必要書類
        </h2>

        {certification.documentRules.length === 0 ? (
          <p className="text-sm text-gray-500">
            必要書類は設定されていません。通常の複数添付欄が表示されます。
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border p-2 text-left">表示順</th>
                  <th className="border p-2 text-left">書類名</th>
                  <th className="border p-2 text-left">区分</th>
                  <th className="border p-2 text-center">操作</th>
                </tr>
              </thead>

              <tbody>
                {certification.documentRules.map((rule) => (
                  <tr key={rule.id}>
                    <td className="border p-2">
                      {rule.sortOrder}
                    </td>

                    <td className="border p-2 font-medium">
                      {rule.documentName}
                    </td>

                    <td className="border p-2">
                      {rule.required ? "必須" : "任意"}
                    </td>

                    <td className="border p-2 text-center">
                      <form action={deleteDocumentRule}>
                        <input
                          type="hidden"
                          name="ruleId"
                          value={rule.id}
                        />

                        <button
                          type="submit"
                          className="rounded bg-red-50 px-3 py-1 text-red-700 hover:bg-red-100"
                        >
                          削除
                        </button>
                      </form>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}
