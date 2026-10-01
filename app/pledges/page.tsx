import Link from "next/link";
import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { requireHRManager } from "@/lib/auth-guard";
import { sendSystemMailSafely } from "@/lib/mail";

async function resendGuarantorMail(formData: FormData) {
  "use server";

  await requireHRManager();

  const pledgeId = String(
    formData.get("pledgeId") ?? "",
  );

  const guarantorName = String(
    formData.get("guarantorName") ?? "",
  ).trim();

  const guarantorEmail = String(
    formData.get("guarantorEmail") ?? "",
  ).trim();

  if (!guarantorName || !guarantorEmail) {
    redirect("/pledges?mail=invalid");
  }

  const pledge = await prisma.employeePledge.findUnique({
    where: { id: pledgeId },
    include: {
      employee: {
        select: {
          lastName: true,
          firstName: true,
        },
      },
    },
  });

  if (
    !pledge ||
    pledge.submissionMethod !== "ELECTRONIC" ||
    pledge.status !== "GUARANTOR_PENDING"
  ) {
    redirect("/pledges?mail=invalid");
  }

  const guarantorToken = randomUUID();
  const guarantorTokenExpiresAt = new Date();
  guarantorTokenExpiresAt.setDate(
    guarantorTokenExpiresAt.getDate() + 14,
  );

  await prisma.employeePledge.update({
    where: { id: pledge.id },
    data: {
      guarantorName,
      guarantorEmail,
      guarantorToken,
      guarantorTokenExpiresAt,
    },
  });

  const appUrl = (
    process.env.NEXT_PUBLIC_APP_URL ??
    "http://localhost:3000"
  ).replace(/\/$/, "");

  const confirmationUrl =
    `${appUrl}/guarantor-confirm/${guarantorToken}`;

  const sent = await sendSystemMailSafely({
    to: guarantorEmail,
    subject: "【FY Nexus One】身元保証人確認のお願い（再送）",
    text: `${guarantorName} 様

${pledge.employee.lastName} ${pledge.employee.firstName}さんの誓約書について、
身元保証人としての確認をお願いいたします。

下記URLから内容をご確認ください。

${confirmationUrl}

このURLの有効期限は14日間です。
第三者へ共有しないでください。

FY Nexus One`,
  });

  revalidatePath("/pledges");

  redirect(`/pledges?mail=${sent ? "sent" : "failed"}`);
}

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


function statusLabel(status: string) {
  switch (status) {
    case "GUARANTOR_PENDING":
      return "身元保証人確認待ち";

    case "GUARANTOR_CONFIRMED":
      return "身元保証人確認済";

    case "COMPLETED":
      return "確認済";

    case "REJECTED":
      return "差戻し";

    case "PAPER_UPLOADED":
      return "紙提出済";

    case "EMPLOYEE_SIGNED":
      return "本人署名済";

    default:
      return status;
  }
}

export default async function PledgesPage({
  searchParams,
}: {
  searchParams: Promise<{ mail?: string }>;
}) {
  await requireHRManager();

  const query = await searchParams;

  const allPledges = await prisma.employeePledge.findMany({
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

  // createdAtの新しい順から、職員ごとの最新提出だけを一覧表示
  const latestByEmployee = new Map<
    string,
    (typeof allPledges)[number]
  >();

  for (const pledge of allPledges) {
    if (!latestByEmployee.has(pledge.employeeId)) {
      latestByEmployee.set(
        pledge.employeeId,
        pledge,
      );
    }
  }

  const pledges = Array.from(
    latestByEmployee.values(),
  );

  return (
    <main className="mx-auto max-w-7xl p-8">
      <h1 className="text-3xl font-bold">
        誓約書確認
      </h1>

      <p className="mt-2 text-sm text-gray-600">
        電子署名および紙署名済み誓約書を確認します。
      </p>

      {query.mail === "sent" && (
        <div className="mt-4 rounded border border-green-200 bg-green-50 p-3 text-sm text-green-700">
          保証人確認メールを再送しました。
        </div>
      )}

      {query.mail === "failed" && (
        <div className="mt-4 rounded border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          メール送信に失敗しました。SMTP設定とログを確認してください。
        </div>
      )}

      {query.mail === "invalid" && (
        <div className="mt-4 rounded border border-yellow-200 bg-yellow-50 p-3 text-sm text-yellow-700">
          この誓約書は保証人確認メールを再送できる状態ではありません。
        </div>
      )}

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
                  {statusLabel(pledge.status)}
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
                    <div className="space-y-2">
                      <span className="block text-gray-500">
                        電子署名記録
                      </span>

                      {pledge.status === "GUARANTOR_PENDING" && (
                        <form action={resendGuarantorMail} className="mt-2 space-y-2 rounded border border-blue-100 bg-blue-50 p-3">
                          <input
                            type="hidden"
                            name="pledgeId"
                            value={pledge.id}
                          />

                          <div>
                            <label className="block text-xs font-medium text-gray-700">
                              保証人氏名
                            </label>
                            <input
                              type="text"
                              name="guarantorName"
                              required
                              defaultValue={pledge.guarantorName ?? ""}
                              className="mt-1 w-full rounded border bg-white px-2 py-1 text-xs"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-medium text-gray-700">
                              保証人メールアドレス
                            </label>
                            <input
                              type="email"
                              name="guarantorEmail"
                              required
                              defaultValue={pledge.guarantorEmail ?? ""}
                              className="mt-1 w-full rounded border bg-white px-2 py-1 text-xs"
                            />
                          </div>

                          <p className="text-xs text-gray-500">
                            更新すると旧URLは無効になり、新しい確認URLを送信します。
                          </p>

                          <button
                            type="submit"
                            className="rounded bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700"
                          >
                            保証人情報を更新して再送
                          </button>
                        </form>
                      )}
                    </div>
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
