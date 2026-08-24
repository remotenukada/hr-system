import BackLink from "@/components/BackLink";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import ConsentForm from "@/components/employee-contracts/consent-form";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function MyEmploymentContractDetailPage(
  { params }: Props,
) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const employee =
    await prisma.employee.findUnique({
      where: {
        userId: session.user.id,
      },
    });

  if (!employee) {
    redirect("/mypage");
  }

  const { id } = await params;

  const contract =
    await prisma.employmentContract.findFirst({
      where: {
        id,
        employeeId: employee.id,
      },
      include: {
        employmentContractConsents: true,
      },
    });

  if (!contract) {
    notFound();
  }

  const consented =
    contract.employmentContractConsents.length > 0;

  const latestConsent =
    contract.employmentContractConsents[0];

  return (
    <main className="mx-auto max-w-4xl p-6">
      <BackLink href="/mypage/employment-contracts" label="雇用条件書一覧へ戻る" />

      <h1 className="mb-6 text-2xl font-bold">
        雇用条件書確認
      </h1>

      <div className="space-y-4 rounded border p-6">
        <div>
          Version: v{contract.version}
        </div>

        <div>
          契約区分: {contract.contractType}
        </div>

        <div>
          開始日:
          {" "}
          {new Date(
            contract.startDate,
          ).toLocaleDateString("ja-JP")}
        </div>

        <div className="pt-4 flex items-center gap-4">
          <a
            href={`/employee-contracts/${contract.id}/pdf`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded border border-gray-300 px-4 py-2 text-sm hover:bg-gray-50"
          >
            PDFで確認する
          </a>

          {consented ? (
            <div className="flex items-center gap-3">
              <span className="rounded bg-green-100 px-3 py-1.5 text-sm font-medium text-green-800">
                {latestConsent?.consentMethod === "PAPER"
                  ? "紙同意済"
                  : "電子同意済"}
              </span>

              {latestConsent?.signedPdfPath ? (
                <a
                  href={`/api/employment-contracts/${contract.id}/paper-consent`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline hover:text-blue-500"
                >
                  署名済PDFを見る
                </a>
              ) : null}
            </div>
          ) : (
            <div className="w-full max-w-xl">
              <ConsentForm
                employmentContractId={contract.id}
                defaultSignerName={`${employee.lastName} ${employee.firstName}`}
              />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
