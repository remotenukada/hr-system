import fs from "fs";
import path from "path";
import Link from "next/link";
import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { createEmploymentContractConsent } from "@/app/actions/employment-contract-consent";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

const PDF_EXPORT_DIR =
  "/data/hr-system/exports/contracts";

export default async function EmploymentContractDetailPage(
  { params }: Props,
) {
  const { id } = await params;

  const contract =
    await prisma.employmentContract.findUnique({
      where: {
        id,
      },
      include: {
        employee: true,
      },
    });

  if (!contract) {
    notFound();
  }

  const history =
    await prisma.employmentContract.findMany({
      where: {
        employeeId: contract.employeeId,
      },
      orderBy: {
        version: "desc",
      },
    });

  const savedPdfDir = path.join(
    PDF_EXPORT_DIR,
    contract.id,
  );

  const savedPdfFiles = fs.existsSync(savedPdfDir)
    ? fs
        .readdirSync(savedPdfDir)
        .filter((fileName) => fileName.endsWith(".pdf"))
        .sort()
        .reverse()
    : [];

  const consents =
    await prisma.employmentContractConsent.findMany({
      where: {
        employmentContractId: contract.id,
      },
      orderBy: {
        consentedAt: "desc",
      },
    });

  return (
    <main className="mx-auto max-w-4xl p-6">
      <div className="mb-6 flex items-center justify-between">
        <Link
          href="/employee-contracts"
          className="text-sm text-blue-600 hover:underline"
        >
          ← 雇用条件書一覧へ戻る
        </Link>
                <div className="flex items-center gap-2">
          <a
            href={`/employee-contracts/${contract.id}/pdf`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded border border-green-600 bg-white px-3 py-1.5 text-sm font-medium text-green-600 hover:bg-green-50"
          >
            PDFを出力
          </a>
          <Link
            href={`/employee-contracts/${contract.id}/edit`}
            className="rounded bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700"
          >
            編集する
          </Link>
        </div>
      </div>

      <h1 className="mb-6 text-2xl font-bold">
        雇用条件書詳細
      </h1>

      <div className="rounded-lg border bg-white p-6 shadow-sm">
        <dl className="grid grid-cols-1 gap-6 md:grid-cols-2">

          <div>
            <dt className="text-sm text-gray-500">
              社員番号
            </dt>
            <dd className="mt-1 font-medium text-gray-900">
              {contract.employee.employeeNo}
            </dd>
          </div>

          <div>
            <dt className="text-sm text-gray-500">
              氏名
            </dt>
            <dd className="mt-1 font-medium text-gray-900">
              {contract.employee.lastName}
              {" "}
              {contract.employee.firstName}
            </dd>
          </div>

          <div>
            <dt className="text-sm text-gray-500">
              契約区分
            </dt>
            <dd className="mt-1 font-medium text-gray-900">
              {contract.contractType}
            </dd>
          </div>

          <div>
            <dt className="text-sm text-gray-500">
              基本給
            </dt>
            <dd className="mt-1 font-medium text-gray-900">
              {contract.baseSalary.toLocaleString("ja-JP")}円
            </dd>
          </div>

          <div>
            <dt className="text-sm text-gray-500">
              契約開始日
            </dt>
            <dd className="mt-1 font-medium text-gray-900">
              {new Date(
                contract.startDate,
              ).toLocaleDateString("ja-JP")}
            </dd>
          </div>

          <div>
            <dt className="text-sm text-gray-500">
              契約終了日
            </dt>
            <dd className="mt-1 font-medium text-gray-900">
              {contract.endDate
                ? new Date(
                    contract.endDate,
                  ).toLocaleDateString("ja-JP")
                : "-"}
            </dd>
          </div>

          <div>
            <dt className="text-sm text-gray-500">
              就業場所
            </dt>
            <dd className="mt-1 font-medium text-gray-900">
              {contract.workplace}
            </dd>
          </div>

          <div>
            <dt className="text-sm text-gray-500">
              従事する業務
            </dt>
            <dd className="mt-1 font-medium text-gray-900">
              {contract.jobDescription}
            </dd>
          </div>

          <div>
            <dt className="text-sm text-gray-500">
              所定労働時間
            </dt>
            <dd className="mt-1 font-medium text-gray-900">
              {contract.workStartTime} 〜 {contract.workEndTime}（休憩 {contract.breakMinutes} 分）
            </dd>
          </div>

          <div>
            <dt className="text-sm text-gray-500">
              休日
            </dt>
            <dd className="mt-1 font-medium text-gray-900">
              {contract.holidayRule}
            </dd>
          </div>

          <div>
            <dt className="text-sm text-gray-500">
              休暇
            </dt>
            <dd className="mt-1 font-medium text-gray-900">
              {contract.leaveRule ?? "-"}
            </dd>
          </div>

          <div>
            <dt className="text-sm text-gray-500">
              賃金締切日
            </dt>
            <dd className="mt-1 font-medium text-gray-900">
              {contract.payClosingDay ?? "-"}
            </dd>
          </div>

          <div>
            <dt className="text-sm text-gray-500">
              賃金支払日
            </dt>
            <dd className="mt-1 font-medium text-gray-900">
              {contract.payDate ?? "-"}
            </dd>
          </div>

          <div>
            <dt className="text-sm text-gray-500">
              賞与
            </dt>
            <dd className="mt-1 font-medium text-gray-900">
              {contract.bonusRule ?? "-"}
            </dd>
          </div>

          <div>
            <dt className="text-sm text-gray-500">
              昇給
            </dt>
            <dd className="mt-1 font-medium text-gray-900">
              {contract.raiseRule ?? "-"}
            </dd>
          </div>

          <div>
            <dt className="text-sm text-gray-500">
              試用期間
            </dt>
            <dd className="mt-1 font-medium text-gray-900">
              {contract.probationPeriod ?? "-"}
            </dd>
          </div>

          <div className="md:col-span-2">
            <dt className="text-sm text-gray-500">
              備考
            </dt>
            <dd className="mt-1 font-medium text-gray-900">
              {contract.remarks ?? "-"}
            </dd>
          </div>

        </dl>
      </div>

      <section className="mt-6 rounded-lg border bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold">
          契約履歴
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="border p-2 text-left">Version</th>
                <th className="border p-2 text-left">契約区分</th>
                <th className="border p-2 text-left">開始日</th>
                <th className="border p-2 text-left">状態</th>
                <th className="border p-2 text-center">操作</th>
              </tr>
            </thead>

            <tbody>
              {history.map((item) => (
                <tr key={item.id}>
                  <td className="border p-2">
                    v{item.version}
                  </td>

                  <td className="border p-2">
                    {item.contractType}
                  </td>

                  <td className="border p-2">
                    {new Date(
                      item.startDate,
                    ).toLocaleDateString("ja-JP")}
                  </td>

                  <td className="border p-2">
                    {item.isCurrent
                      ? "現行"
                      : "履歴"}
                  </td>

                  <td className="border p-2 text-center">
                    <div className="flex justify-center gap-2">
                      <Link
                        href={`/employee-contracts/${item.id}`}
                        className="text-blue-600 hover:underline"
                      >
                        詳細
                      </Link>

                      <a
                        href={`/employee-contracts/${item.id}/pdf`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        PDF
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>


      <section className="mt-6 rounded-lg border bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold">
          電子同意
        </h2>

        {consents.length === 0 ? (
          <form action={createEmploymentContractConsent} className="space-y-4">
            <input
              type="hidden"
              name="employmentContractId"
              value={contract.id}
            />

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                署名者名
              </label>
              <input
                name="signerName"
                required
                defaultValue={`${contract.employee.lastName} ${contract.employee.firstName}`}
                className="w-full rounded border p-2"
              />
            </div>

            <p className="text-sm text-gray-600">
              内容を確認し、本人が雇用条件通知書に同意した記録として保存します。
            </p>

            <button
              type="submit"
              className="rounded bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
            >
              同意する
            </button>
          </form>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-green-700">
              この雇用条件書は電子同意済みです。
            </p>

            <table className="min-w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="border p-2 text-left">
                    署名者
                  </th>
                  <th className="border p-2 text-left">
                    同意日時
                  </th>
                  <th className="border p-2 text-left">
                    IPアドレス
                  </th>
                </tr>
              </thead>

              <tbody>
                {consents.map((consent) => (
                  <tr key={consent.id}>
                    <td className="border p-2">
                      {consent.signerName}
                    </td>

                    <td className="border p-2">
                      {new Date(
                        consent.consentedAt,
                      ).toLocaleString("ja-JP")}
                    </td>

                    <td className="border p-2">
                      {consent.ipAddress ?? "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
      <section className="mt-6 rounded-lg border bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold">
          保存済PDF
        </h2>

        {savedPdfFiles.length === 0 ? (
          <p className="text-sm text-gray-500">
            保存済みPDFはありません
          </p>
        ) : (
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="border p-2 text-left">
                  ファイル名
                </th>
                <th className="border p-2 text-center">
                  操作
                </th>
              </tr>
            </thead>

            <tbody>
              {savedPdfFiles.map((fileName) => (
                <tr key={fileName}>
                  <td className="border p-2">
                    {fileName}
                  </td>

                  <td className="border p-2 text-center">
                    <a
                      href={`/employee-contracts/${contract.id}/saved-pdf/${encodeURIComponent(fileName)}`}
                      className="text-blue-600 hover:underline"
                    >
                      ダウンロード
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </main>
  );
}
