import Link from "next/link";
import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

const residenceTypeLabels: Record<string, string> = {
  RENTAL: "賃貸",
  CORPORATE_HOUSING: "法人契約住宅",
  OWNED: "持家",
};

const ownershipTypeLabels: Record<string, string> = {
  SELF: "本人名義",
  JOINT: "共同名義",
  FAMILY: "家族名義",
};

function formatDate(value: Date | null | undefined) {
  return value
    ? new Date(value).toLocaleDateString("ja-JP")
    : "-";
}

function formatMoney(value: number | null | undefined) {
  return value != null
    ? `${value.toLocaleString("ja-JP")}円`
    : "-";
}

function InfoItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-lg border bg-white p-4">
      <dt className="text-sm font-medium text-gray-500">
        {label}
      </dt>
      <dd className="mt-1 text-gray-900">{value}</dd>
    </div>
  );
}

export default async function CurrentResidencePage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const employee = await prisma.employee.findUnique({
    where: {
      userId: session.user.id,
    },
  });

  if (!employee) {
    redirect("/");
  }

  const residence = await prisma.residenceRequest.findFirst({
    where: {
      employeeId: employee.id,
      status: "APPROVED",
    },
    include: {
      attachments: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
    orderBy: [
      {
        changeDate: "desc",
      },
      {
        updatedAt: "desc",
      },
    ],
  });

  return (
    <main className="mx-auto max-w-5xl p-8">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            現在の住居情報
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            最新の承認済み住居届を表示しています。
          </p>
        </div>

        <Link
          href="/"
          className="rounded border bg-white px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
        >
          ダッシュボードへ戻る
        </Link>
      </div>

      {!residence ? (
        <section className="mt-6 rounded-lg border bg-white p-8 text-center shadow-sm">
          <p className="text-gray-600">
            承認済みの住居情報はありません。
          </p>
        </section>
      ) : (
        <>
          <section className="mt-6 rounded-lg border bg-gray-50 p-6 shadow-sm">
            <h2 className="mb-4 border-b pb-2 text-lg font-semibold">
              登録内容
            </h2>

            <dl className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <InfoItem
                label="郵便番号"
                value={residence.postalCode || "-"}
              />
              <InfoItem
                label="住所"
                value={residence.address || "-"}
              />
              <InfoItem
                label="電話番号"
                value={residence.phoneNumber || "-"}
              />
              <InfoItem
                label="住宅種別"
                value={
                  residenceTypeLabels[residence.residenceType] ??
                  residence.residenceType
                }
              />
              <InfoItem
                label="適用日"
                value={formatDate(residence.changeDate)}
              />
              <InfoItem
                label="最終更新日"
                value={formatDate(residence.updatedAt)}
              />

              {residence.residenceType === "RENTAL" && (
                <>
                  <InfoItem
                    label="貸主氏名"
                    value={residence.landlordName || "-"}
                  />
                  <InfoItem
                    label="貸主住所"
                    value={residence.landlordAddress || "-"}
                  />
                  <InfoItem
                    label="契約者氏名"
                    value={residence.contractHolderName || "-"}
                  />
                  <InfoItem
                    label="契約者との続柄"
                    value={
                      residence.contractHolderRelationship || "-"
                    }
                  />
                  <InfoItem
                    label="月額家賃"
                    value={formatMoney(residence.monthlyRent)}
                  />
                  <InfoItem
                    label="共益費"
                    value={formatMoney(
                      residence.commonServiceFee,
                    )}
                  />
                </>
              )}

              {residence.residenceType ===
                "CORPORATE_HOUSING" && (
                <>
                  <InfoItem
                    label="住宅名称"
                    value={residence.housingName || "-"}
                  />
                  <InfoItem
                    label="部屋番号"
                    value={residence.roomNumber || "-"}
                  />
                </>
              )}

              {residence.residenceType === "OWNED" && (
                <>
                  <InfoItem
                    label="所有区分"
                    value={
                      residence.ownershipType
                        ? ownershipTypeLabels[
                            residence.ownershipType
                          ] ?? residence.ownershipType
                        : "-"
                    }
                  />
                  <InfoItem
                    label="名義人"
                    value={
                      [
                        residence.ownerName1,
                        residence.ownerName2,
                      ]
                        .filter(Boolean)
                        .join("、") || "-"
                    }
                  />
                  <InfoItem
                    label="取得年月日"
                    value={formatDate(
                      residence.acquisitionDate,
                    )}
                  />
                </>
              )}
            </dl>
          </section>

          <section className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/mypage/residence-requests"
              className="rounded border bg-white px-4 py-2 text-sm font-medium text-blue-700 hover:bg-blue-50"
            >
              住居届履歴を見る
            </Link>

            <Link
              href="/mypage/residence-requests/new"
              className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              住居届を申請する
            </Link>
          </section>
        </>
      )}
    </main>
  );
}
