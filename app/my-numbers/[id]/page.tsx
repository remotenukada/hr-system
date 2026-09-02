import BackLink from "@/components/BackLink";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { requireHRManager } from "@/lib/auth-guard";
import { logAudit } from "@/lib/audit-log";
import { decryptMyNumber } from "@/lib/mynumber";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

function getStatusLabel(status: string) {
  if (status === "APPROVED") {
    return "確認済";
  }

  if (status === "REJECTED") {
    return "差戻し";
  }

  return "未確認";
}

function getStatusClass(status: string) {
  if (status === "APPROVED") {
    return "bg-green-100 text-green-800";
  }

  if (status === "REJECTED") {
    return "bg-red-100 text-red-800";
  }

  return "bg-yellow-100 text-yellow-800";
}

export default async function MyNumberDetailPage({ params }: Props) {
  await requireHRManager();

  const cookieStore = await cookies();
  const facilityScope = cookieStore.get("facilityScope")?.value ?? "ALL";

  const { id } = await params;

  const myNumber = await prisma.employeeMyNumber.findUnique({
    where: {
      id,
    },
    include: {
      employee: {
        include: {
          facility: true,
          department: true,
        },
      },
    },
  });

  if (!myNumber) {
    redirect("/my-numbers");
  }

  if (
    facilityScope !== "ALL" &&
    myNumber.employee.facilityId !== facilityScope
  ) {
    notFound();
  }

  const decryptedMyNumber = decryptMyNumber(myNumber.encryptedNumber);

  async function approveMyNumber(formData: FormData) {
    "use server";

    const session = await requireHRManager();

    const myNumberId = String(formData.get("myNumberId") ?? "").trim();

    if (!myNumberId) {
      return;
    }

    const actionCookieStore = await cookies();
    const actionFacilityScope =
      actionCookieStore.get("facilityScope")?.value ?? "ALL";

    const targetMyNumber = await prisma.employeeMyNumber.findUnique({
      where: {
        id: myNumberId,
      },
      include: {
        employee: true,
      },
    });

    if (!targetMyNumber) {
      notFound();
    }

    if (
      actionFacilityScope !== "ALL" &&
      targetMyNumber.employee.facilityId !== actionFacilityScope
    ) {
      notFound();
    }

    await prisma.employeeMyNumber.update({
      where: {
        id: myNumberId,
      },
      data: {
        status: "APPROVED",
        verifiedAt: new Date(),
        verifiedBy: session.user.name ?? session.user.id,
        reviewComment: null,
      },
    });

    await logAudit({
      userId: session.user.id,
      userName: session.user.name ?? "管理者",
      action: "MY_NUMBER_APPROVED",
      targetType: "EmployeeMyNumber",
      targetId: myNumberId,
      description: "マイナンバー確認",
    });

    revalidatePath("/my-numbers");
    revalidatePath(`/my-numbers/${myNumberId}`);
    revalidatePath("/");
  }

  async function rejectMyNumber(formData: FormData) {
    "use server";

    const session = await requireHRManager();

    const myNumberId = String(formData.get("myNumberId") ?? "").trim();

    const reviewComment = String(formData.get("reviewComment") ?? "").trim();

    if (!myNumberId || !reviewComment) {
      return;
    }

    const actionCookieStore = await cookies();
    const actionFacilityScope =
      actionCookieStore.get("facilityScope")?.value ?? "ALL";

    const targetMyNumber = await prisma.employeeMyNumber.findUnique({
      where: {
        id: myNumberId,
      },
      include: {
        employee: true,
      },
    });

    if (!targetMyNumber) {
      notFound();
    }

    if (
      actionFacilityScope !== "ALL" &&
      targetMyNumber.employee.facilityId !== actionFacilityScope
    ) {
      notFound();
    }

    await prisma.employeeMyNumber.update({
      where: {
        id: myNumberId,
      },
      data: {
        status: "REJECTED",
        verifiedAt: null,
        verifiedBy: null,
        reviewComment,
      },
    });

    await logAudit({
      userId: session.user.id,
      userName: session.user.name ?? "管理者",
      action: "MY_NUMBER_REJECTED",
      targetType: "EmployeeMyNumber",
      targetId: myNumberId,
      description: `マイナンバー差戻し: ${reviewComment}`,
    });

    revalidatePath("/my-numbers");
    revalidatePath(`/my-numbers/${myNumberId}`);
    revalidatePath("/");
  }

  return (
    <main className="mx-auto max-w-5xl p-8">
      <BackLink href="/my-numbers" label="マイナンバー一覧へ戻る" />

      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold">マイナンバー詳細</h1>

          <p className="mt-2 text-sm text-gray-600">
            社員のマイナンバー提出状況を確認できます。番号は人事担当者のみ確認できます。
          </p>
        </div>

        <div className="text-right">
          <span
            className={`rounded px-3 py-1 text-sm font-medium ${getStatusClass(
              myNumber.status,
            )}`}
          >
            {getStatusLabel(myNumber.status)}
          </span>

          {myNumber.verifiedAt && (
            <div className="mt-2 text-sm text-gray-600">
              <div>確認者: {myNumber.verifiedBy ?? "-"}</div>

              <div>確認日時: {myNumber.verifiedAt.toLocaleString("ja-JP")}</div>
            </div>
          )}
        </div>
      </div>

      <section className="rounded-lg border bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold">社員情報</h2>

        <dl className="grid grid-cols-1 gap-4 text-sm md:grid-cols-2">
          <div>
            <dt className="font-medium text-gray-600">社員番号</dt>
            <dd className="mt-1">{myNumber.employee.employeeNo}</dd>
          </div>

          <div>
            <dt className="font-medium text-gray-600">氏名</dt>
            <dd className="mt-1">
              {myNumber.employee.lastName} {myNumber.employee.firstName}
            </dd>
          </div>

          <div>
            <dt className="font-medium text-gray-600">施設</dt>
            <dd className="mt-1">{myNumber.employee.facility?.name ?? "-"}</dd>
          </div>

          <div>
            <dt className="font-medium text-gray-600">部署</dt>
            <dd className="mt-1">
              {myNumber.employee.department?.name ?? "-"}
            </dd>
          </div>

          <div>
            <dt className="font-medium text-gray-600">メール</dt>
            <dd className="mt-1">{myNumber.employee.email}</dd>
          </div>
        </dl>
      </section>

      <section className="mt-6 rounded-lg border bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold">提出情報</h2>

        <dl className="grid grid-cols-1 gap-4 text-sm md:grid-cols-2">
          <div>
            <dt className="font-medium text-gray-600">登録状況</dt>
            <dd className="mt-1">登録済み</dd>
          </div>

          <div>
            <dt className="font-medium text-gray-600">マイナンバー</dt>
            <dd className="mt-1 font-mono text-lg tracking-wider text-red-700">
              {decryptedMyNumber}
            </dd>
            <dd className="mt-1 text-xs text-gray-500">人事担当者確認用</dd>
          </div>

          <div>
            <dt className="font-medium text-gray-600">更新日時</dt>
            <dd className="mt-1">
              {myNumber.updatedAt.toLocaleString("ja-JP")}
            </dd>
          </div>

          <div>
            <dt className="font-medium text-gray-600">状態</dt>
            <dd className="mt-1">
              <span
                className={`rounded px-2 py-1 text-xs font-medium ${getStatusClass(
                  myNumber.status,
                )}`}
              >
                {getStatusLabel(myNumber.status)}
              </span>
            </dd>
          </div>
        </dl>
      </section>

      {myNumber.reviewComment && (
        <section className="mt-6 rounded-lg border border-red-200 bg-red-50 p-6">
          <h2 className="mb-2 text-lg font-semibold text-red-700">
            差戻しコメント
          </h2>

          <p className="text-sm text-red-700">{myNumber.reviewComment}</p>
        </section>
      )}

      <section className="mt-6 rounded-lg border bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold">確認操作</h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <form
            action={approveMyNumber}
            className="flex flex-col justify-between rounded border p-4"
          >
            <div>
              <h3 className="font-semibold text-green-700">承認</h3>
              <p className="mt-1 text-xs text-gray-500">
                提出された内容に問題がなければ確認済にします。
              </p>
            </div>

            <input type="hidden" name="myNumberId" value={myNumber.id} />

            <button
              type="submit"
              className="mt-4 w-full rounded bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
            >
              確認済にする
            </button>
          </form>

          <form
            action={rejectMyNumber}
            className="space-y-3 rounded border p-4"
          >
            <div>
              <h3 className="font-semibold text-red-700">差戻し</h3>
              <p className="mt-1 text-xs text-gray-500">
                記載に不備がある場合は理由を入力して差戻します。
              </p>
            </div>

            <input type="hidden" name="myNumberId" value={myNumber.id} />

            <textarea
              name="reviewComment"
              placeholder="差戻し理由を入力してください"
              className="h-20 w-full rounded border border-gray-300 p-2 text-sm focus:border-red-500 focus:outline-none"
              required
            />

            <button
              type="submit"
              className="w-full rounded bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
            >
              差戻しを実行
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
