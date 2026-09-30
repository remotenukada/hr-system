import { cookies } from "next/headers";

import BackLink from "@/components/BackLink";
import PersonalDocumentSingleUploadForm from "@/components/PersonalDocumentSingleUploadForm";
import { requireHRManager } from "@/lib/auth-guard";
import { prisma } from "@/lib/prisma";

export default async function PersonalDocumentNewPage() {
  await requireHRManager();

  const cookieStore = await cookies();
  const facilityScope =
    cookieStore.get("facilityScope")?.value ?? "ALL";

  const employees = await prisma.employee.findMany({
    where:
      facilityScope === "ALL"
        ? {}
        : {
            facilityId: facilityScope,
          },
    select: {
      id: true,
      employeeNo: true,
      lastName: true,
      firstName: true,
    },
    orderBy: {
      employeeNo: "asc",
    },
  });

  return (
    <main className="mx-auto max-w-4xl p-8">
      <BackLink
        href="/employee-documents"
        label="個人文書管理へ戻る"
      />

      <h1 className="mt-4 text-3xl font-bold">
        個別文書登録
      </h1>

      <p className="mb-6 mt-2 text-sm text-gray-600">
        特定の職員へ給与明細、源泉徴収票または社会保険通知を配布します。
      </p>

      <PersonalDocumentSingleUploadForm
        employees={employees}
      />
    </main>
  );
}
