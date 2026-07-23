import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireHRManager } from "@/lib/auth-guard";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

type JsonObject = Record<string, unknown>;

function isObject(value: unknown): value is JsonObject {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function normalizeValue(value: unknown) {
  if (value === null || value === undefined || value === "") {
    return "-";
  }

  if (typeof value === "string") {
    return value;
  }

  if (typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }

  return JSON.stringify(value);
}

function normalizeForCompare(value: unknown) {
  if (value === null || value === undefined || value === "") {
    return "";
  }

  return JSON.stringify(value);
}

const fieldLabels: Record<string, string> = {
  id: "ID",
  employeeNo: "職員番号",
  lastName: "姓",
  firstName: "名",
  lastNameKana: "姓ふりがな",
  firstNameKana: "名ふりがな",
  gender: "性別",
  birthDate: "生年月日",
  phoneNumber: "電話番号",
  address: "住所",
  email: "メール",
  departmentId: "部署ID",
  occupation: "職種",
  position: "役職",
  hireDate: "入職日",
  employmentType: "雇用形態",
  commutingType: "通勤区分",
  status: "ステータス",
  retirementDate: "退職日",
  healthInsuranceNo: "健康保険番号",
  employmentInsuranceNo: "雇用保険番号",
  photoPath: "写真パス",
  createdAt: "作成日時",
  updatedAt: "更新日時",
};

function getFieldLabel(key: string) {
  return fieldLabels[key] ?? key;
}

function getChangedRows(beforeData: unknown, afterData: unknown) {
  if (!isObject(beforeData) || !isObject(afterData)) {
    return [];
  }

  const keys = Array.from(
    new Set([
      ...Object.keys(beforeData),
      ...Object.keys(afterData),
    ]),
  );

  return keys
    .filter((key) => {
      return (
        normalizeForCompare(beforeData[key]) !==
        normalizeForCompare(afterData[key])
      );
    })
    .map((key) => ({
      key,
      label: getFieldLabel(key),
      before: normalizeValue(beforeData[key]),
      after: normalizeValue(afterData[key]),
    }));
}

export default async function AuditLogDetailPage({
  params,
}: Props) {
  await requireHRManager();

  const { id } = await params;

  const log = await prisma.auditLog.findUnique({
    where: {
      id,
    },
  });

  if (!log) {
    notFound();
  }

  const changedRows = getChangedRows(log.beforeData, log.afterData);

  return (
    <main className="mx-auto max-w-6xl p-8">
      <Link href="/audit-logs">
        ← 監査ログ一覧へ戻る
      </Link>

      <h1 className="mt-4 mb-6 text-3xl font-bold">
        監査ログ詳細
      </h1>

      <div className="mb-6 rounded border bg-white p-4 text-sm">
        <p>
          <strong>日時:</strong>{" "}
          {new Date(log.createdAt).toLocaleString("ja-JP")}
        </p>
        <p>
          <strong>アクション:</strong> {log.action}
        </p>
        <p>
          <strong>対象:</strong> {log.targetType}
        </p>
        <p>
          <strong>対象ID:</strong> {log.targetId ?? "-"}
        </p>
        <p>
          <strong>ユーザー:</strong> {log.userName ?? "-"}
        </p>
        <p>
          <strong>内容:</strong> {log.description ?? "-"}
        </p>
      </div>

      <section className="rounded border bg-white p-6">
        <h2 className="mb-4 text-xl font-semibold">
          変更差分
        </h2>

        {changedRows.length === 0 ? (
          <p className="text-sm text-gray-500">
            変更差分はありません。
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-gray-50 text-left">
                  <th className="border-b p-3">
                    項目
                  </th>
                  <th className="border-b p-3">
                    変更前
                  </th>
                  <th className="border-b p-3">
                    変更後
                  </th>
                </tr>
              </thead>

              <tbody>
                {changedRows.map((row) => (
                  <tr key={row.key}>
                    <td className="border-b p-3 font-medium">
                      {row.label}
                    </td>
                    <td className="border-b p-3 text-red-700">
                      {row.before}
                    </td>
                    <td className="border-b p-3 text-green-700">
                      {row.after}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <details className="mt-6 rounded border bg-gray-50 p-4">
        <summary className="cursor-pointer font-medium">
          JSONデータを表示
        </summary>

        <div className="mt-4 grid gap-6 lg:grid-cols-2">
          <section>
            <h3 className="mb-2 font-semibold">
              変更前
            </h3>
            <pre className="overflow-auto rounded bg-white p-3 text-xs">
              {JSON.stringify(log.beforeData, null, 2)}
            </pre>
          </section>

          <section>
            <h3 className="mb-2 font-semibold">
              変更後
            </h3>
            <pre className="overflow-auto rounded bg-white p-3 text-xs">
              {JSON.stringify(log.afterData, null, 2)}
            </pre>
          </section>
        </div>
      </details>
    </main>
  );
}
