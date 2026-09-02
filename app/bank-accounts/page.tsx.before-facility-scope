import BackLink from "@/components/BackLink";
import Link from "next/link";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireHRManager } from "@/lib/auth-guard";
import { logAudit } from "@/lib/audit-log";

function getStatusBadge(status: string) {
  if (status === "APPROVED") {
    return (
      <span className="rounded bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
        確認済
      </span>
    );
  }

  if (status === "REJECTED") {
    return (
      <span className="rounded bg-red-100 px-2 py-1 text-xs font-medium text-red-800">
        差戻し
      </span>
    );
  }

  return (
    <span className="rounded bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800">
      未確認
    </span>
  );
}

export default async function BankAccountsPage({
  searchParams,
}: {
  searchParams?: Promise<{
    status?: string;
  }>;
}) {
  await requireHRManager();

  const params = await searchParams;
  const status = params?.status;
  const validStatuses = ["PENDING", "APPROVED", "REJECTED"];
  const statusFilter =
    status && validStatuses.includes(status)
      ? status
      : undefined;

  async function approveBankAccount(formData: FormData) {
    "use server";

    const session = await requireHRManager();

    const bankAccountId = String(
      formData.get("bankAccountId") ?? "",
    ).trim();

    if (!bankAccountId) {
      return;
    }

    await prisma.employeeBankAccount.update({
      where: {
        id: bankAccountId,
      },
      data: {
        status: "APPROVED",
        verifiedAt: new Date(),
        verifiedBy: session.user.id,
        reviewComment: null,
      },
    });


    await logAudit({
      userId: session.user.id,
      userName: session.user.name,
      action: "BANK_ACCOUNT_APPROVED",
      targetType: "EmployeeBankAccount",
      targetId: bankAccountId,
      description: "口座情報確認",
    });

    revalidatePath("/bank-accounts");
    revalidatePath("/");
  }

  async function rejectBankAccount(formData: FormData) {
    "use server";

    const session = await requireHRManager();

    const bankAccountId = String(
      formData.get("bankAccountId") ?? "",
    ).trim();

    const reviewComment = String(
      formData.get("reviewComment") ?? "",
    ).trim();

    if (!bankAccountId || !reviewComment) {
      return;
    }

    await prisma.employeeBankAccount.update({
      where: {
        id: bankAccountId,
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
      userName: session.user.name,
      action: "BANK_ACCOUNT_REJECTED",
      targetType: "EmployeeBankAccount",
      targetId: bankAccountId,
      description: `口座情報差戻し: ${reviewComment}`,
    });

    revalidatePath("/bank-accounts");
    revalidatePath("/");
  }

  const [
    totalCount,
    pendingCount,
    approvedCount,
    rejectedCount,
  ] = await Promise.all([
    prisma.employeeBankAccount.count(),
    prisma.employeeBankAccount.count({
      where: {
        status: "PENDING",
      },
    }),
    prisma.employeeBankAccount.count({
      where: {
        status: "APPROVED",
      },
    }),
    prisma.employeeBankAccount.count({
      where: {
        status: "REJECTED",
      },
    }),
  ]);

  const bankAccounts =
    await prisma.employeeBankAccount.findMany({
      where: statusFilter
        ? {
            status: statusFilter,
          }
        : undefined,
      include: {
        employee: {
          include: {
            department: true,
          },
        },
        attachments: true,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

  return (
    <main className="mx-auto max-w-7xl p-8">
      <BackLink href="/" label="ダッシュボードへ戻る" />
      <h1 className="mb-6 text-3xl font-bold">
        口座情報確認
      </h1>
    </main>
  );
}
