import { revalidatePath } from "next/cache";

import BackLink from "@/components/BackLink";
import { auth } from "@/auth";
import { requireHRManager } from "@/lib/auth-guard";
import { prisma } from "@/lib/prisma";

const TYPE_LABELS = {
  PLEDGE: "誓約書",
  BANK_ACCOUNT: "口座確認書類",
  MY_NUMBER: "マイナンバー関係書類",
} as const;

const STATUS_LABELS = {
  PLANNED: "提出予定",
  RECEIVED: "受領済",
  VERIFIED: "確認済",
  DEFICIENT: "不備・再提出",
} as const;

async function updateStatus(formData: FormData) {
  "use server";

  await requireHRManager();
  const session = await auth();

  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "");
  const note = String(formData.get("note") ?? "").trim();

  if (
    status !== "PLANNED" &&
    status !== "RECEIVED" &&
    status !== "VERIFIED" &&
    status !== "DEFICIENT"
  ) {
    throw new Error("不正な状態です。");
  }

  const current = await prisma.paperSubmission.findUnique({
    where: { id },
  });

  if (!current) {
    throw new Error("提出物が見つかりません。");
  }

  const now = new Date();

  await prisma.paperSubmission.update({
    where: { id },
    data: {
      status,
      note: note || null,
      receivedAt:
        status === "RECEIVED" || status === "VERIFIED"
          ? current.receivedAt ?? now
          : null,
      verifiedAt:
        status === "VERIFIED"
          ? current.verifiedAt ?? now
          : null,
      verifiedBy:
        status === "VERIFIED"
          ? session?.user?.id ?? null
          : null,
    },
  });

  revalidatePath("/paper-submissions");
}

export default async function PaperSubmissionsPage() {
  await requireHRManager();

  const submissions = await prisma.paperSubmission.findMany({
    include: {
      employee: {
        include: {
          facility: true,
          department: true,
        },
      },
    },
    orderBy: [
      { status: "asc" },
      { createdAt: "desc" },
    ],
  });

  const counts = {
    PLANNED: submissions.filter(
      (item) => item.status === "PLANNED",
    ).length,
    RECEIVED: submissions.filter(
      (item) => item.status === "RECEIVED",
    ).length,
    VERIFIED: submissions.filter(
      (item) => item.status === "VERIFIED",
    ).length,
    DEFICIENT: submissions.filter(
      (item) => item.status === "DEFICIENT",
    ).length,
  };

  return (
    <main className="mx-auto max-w-7xl p-8">
      <BackLink href="/" label="ダッシュボードへ戻る" />

      <h1 className="mt-4 text-3xl font-bold">
        紙提出物管理
      </h1>

      <p className="mt-2 text-sm text-gray-600">
        紙提出予定の書類について、受領・確認・不備を管理します。
      </p>

      <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Object.entries(STATUS_LABELS).map(
          ([status, label]) => (
            <div
              key={status}
              className="rounded-lg border bg-white p-4 shadow-sm"
            >
              <div className="text-sm text-gray-600">
                {label}
              </div>
              <div className="mt-1 text-2xl font-bold">
                {counts[status as keyof typeof counts]}件
              </div>
            </div>
          ),
        )}
      </section>

      <div className="mt-6 overflow-x-auto rounded-lg border bg-white">
        <table className="w-full min-w-[1050px] text-sm">
          <thead className="bg-gray-50">
            <tr className="text-left">
              <th className="p-3">職員</th>
              <th className="p-3">施設・部署</th>
              <th className="p-3">提出物</th>
              <th className="p-3">現在状態</th>
              <th className="p-3">状態変更・備考</th>
            </tr>
          </thead>

          <tbody>
            {submissions.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="p-8 text-center text-gray-500"
                >
                  紙提出物はありません。
                </td>
              </tr>
            ) : (
              submissions.map((item) => (
                <tr
                  key={item.id}
                  className="border-t align-top"
                >
                  <td className="p-3">
                    <div className="font-medium">
                      {item.employee.lastName}{" "}
                      {item.employee.firstName}
                    </div>
                    <div className="text-xs text-gray-500">
                      {item.employee.employeeNo}
                    </div>
                  </td>

                  <td className="p-3">
                    {item.employee.facility?.name ?? "-"}
                    {" / "}
                    {item.employee.department?.name ?? "-"}
                  </td>

                  <td className="p-3">
                    {
                      TYPE_LABELS[
                        item.type as keyof typeof TYPE_LABELS
                      ]
                    }
                  </td>

                  <td className="p-3">
                    <span className="font-semibold">
                      {
                        STATUS_LABELS[
                          item.status as keyof typeof STATUS_LABELS
                        ]
                      }
                    </span>
                  </td>

                  <td className="p-3">
                    <form action={updateStatus} className="flex flex-col gap-2 sm:flex-row sm:items-center">
                      <input type="hidden" name="id" value={item.id} />
                      <select
                        name="status"
                        defaultValue={item.status}
                        className="rounded border px-2 py-1 text-xs"
                      >
                        <option value="PLANNED">提出予定</option>
                        <option value="RECEIVED">受領済</option>
                        <option value="VERIFIED">確認済</option>
                        <option value="DEFICIENT">不備・再提出</option>
                      </select>
                      <input
                        type="text"
                        name="note"
                        defaultValue={item.note ?? ""}
                        placeholder="備考"
                        className="rounded border px-2 py-1 text-xs"
                      />
                      <button
                        type="submit"
                        className="rounded bg-blue-600 px-3 py-1 text-xs text-white hover:bg-blue-700"
                      >
                        更新
                      </button>
                    </form>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}
