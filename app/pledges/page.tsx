import Link from "next/link";
import { revalidatePath } from "next/cache";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { requireHRManager } from "@/lib/auth-guard";

async function reviewPledge(formData: FormData) {
  "use server";

  await requireHRManager();

  const session = await auth();
  const pledgeId = String(formData.get("pledgeId") ?? "");
  const action = String(formData.get("action") ?? "");
  const comment = String(
    formData.get("reviewComment") ?? "",
  ).trim();

  const pledge =
    await prisma.employeePledge.findUnique({
      where: { id: pledgeId },
    });

  if (!pledge) {
    throw new Error("誓約書が見つかりません。");
  }

  if (
    action === "approve" &&
    pledge.submissionMethod === "ELECTRONIC" &&
    pledge.status !== "GUARANTOR_CONFIRMED"
  ) {
    throw new Error(
      "電子署名は身元保証人の確認完了後に承認できます。",
    );
  }

  await prisma.employeePledge.update({
    where: { id: pledge.id },
    data: {
      status:
        action === "approve"
          ? "COMPLETED"
          : "REJECTED",
      verifiedAt:
        action === "approve" ? new Date() : null,
      verifiedBy:
        action === "approve"
          ? session?.user?.id
          : null,
      reviewComment: comment || null,
    },
  });

  revalidatePath("/pledges");
  revalidatePath("/mypage/pledge");
}

function methodLabel(method: string) {
  return method === "ELECTRONIC"
    ? "電子署名"
    : "紙署名";
}

export default async function PledgesPage() {
  await requireHRManager();

  const pledges = await prisma.employeePledge.findMany({
    include: {
      employee: {
        include: {
          facility: true,
          department: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="mx-auto max-w-7xl p-8">
      <h1 className="text-3xl font-bold">
        誓約書確認
      </h1>

      <p className="mt-2 text-sm text-gray-600">
        電子署名および紙署名済み誓約書を確認します。
      </p>

      <div className="mt-6 overflow-x-auto rounded-lg border bg-white shadow-sm">
        <table className="min-w-[1100px] text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3 text-left">職員</th>
              <th className="p-3 text-left">施設・部署</th>
              <th className="p-3 text-left">提出方法</th>
              <th className="p-3 text-left">状態</th>
              <th className="p-3 text-left">提出日時</th>
              <th className="p-3 text-left">書類</th>
              <th className="p-3 text-left">確認</th>
            </tr>
          </thead>

          <tbody>
            {pledges.map((pledge) => (
              <tr key={pledge.id} className="border-t align-top">
                <td className="p-3">
                  <Link href={`/employees/${pledge.employeeId}`}>
                    {pledge.employee.lastName}{" "}
                    {pledge.employee.firstName}
                  </Link>
                </td>

                <td className="p-3">
                  {pledge.employee.facility?.name ?? "-"}
                  {" / "}
                  {pledge.employee.department?.name ?? "-"}
                </td>

                <td className="p-3">
                  {methodLabel(pledge.submissionMethod)}
                </td>

                <td className="p-3">
                  {pledge.status}
                </td>

                <td className="p-3 whitespace-nowrap">
                  {pledge.createdAt.toLocaleString("ja-JP")}
                </td>

                <td className="p-3">
                  {pledge.filePath ? (
                    <a
                      href={`/api/pledges/${pledge.id}/file`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline hover:text-blue-800"
                    >
                      書類を確認
                    </a>
                  ) : (
                    <span className="text-gray-500">
                      電子署名記録
                    </span>
                  )}
                </td>

                <td className="p-3">
                  {pledge.status === "COMPLETED" ? (
                    <span className="text-green-700 font-medium">
                      確認済み
                    </span>
                  ) : (
                    <form action={reviewPledge} className="space-y-2">
                      <input
                        type="hidden"
                        name="pledgeId"
                        value={pledge.id}
                      />

                      <textarea
                        name="reviewComment"
                        placeholder="確認コメント"
                        className="w-full rounded border px-2 py-1"
                      />

                      <div className="flex gap-2">
                        <button
                          type="submit"
                          name="action"
                          value="approve"
                          className="rounded bg-green-600 px-3 py-1 text-white hover:bg-green-700"
                        >
                          確認完了
                        </button>

                        <button
                          type="submit"
                          name="action"
                          value="reject"
                          className="rounded bg-red-600 px-3 py-1 text-white hover:bg-red-700"
                        >
                          差戻し
                        </button>
                      </div>
                    </form>
                  )}
                </td>
              </tr>
            ))}

            {pledges.length === 0 && (
              <tr>
                <td
                  colSpan={7}
                  className="p-8 text-center text-gray-500"
                >
                  提出された誓約書はありません。
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}
