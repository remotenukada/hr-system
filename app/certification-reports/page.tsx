import Link from "next/link";
import { cookies } from "next/headers";

import BackLink from "@/components/BackLink";
import { requireHRManager } from "@/lib/auth-guard";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const DAY_IN_MILLISECONDS = 24 * 60 * 60 * 1000;

function startOfDay(date: Date) {
  const result = new Date(date);
  result.setHours(0, 0, 0, 0);
  return result;
}

function addDays(date: Date, days: number) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function formatDate(date: Date | null) {
  if (!date) {
    return "-";
  }

  return date.toLocaleDateString("ja-JP");
}

function getRemainingDays(expiryDate: Date, today: Date) {
  const target = startOfDay(expiryDate);

  return Math.ceil(
    (target.getTime() - today.getTime()) /
      DAY_IN_MILLISECONDS,
  );
}

function getAlertStatus(remainingDays: number) {
  if (remainingDays < 0) {
    return {
      label: "期限切れ",
      className: "bg-red-100 text-red-800",
      rowClassName: "bg-red-50",
      priority: 0,
    };
  }

  if (remainingDays <= 30) {
    return {
      label: "30日以内",
      className: "bg-orange-100 text-orange-800",
      rowClassName: "bg-orange-50",
      priority: 1,
    };
  }

  if (remainingDays <= 60) {
    return {
      label: "31〜60日",
      className: "bg-amber-100 text-amber-800",
      rowClassName: "bg-amber-50",
      priority: 2,
    };
  }

  return {
    label: "61〜90日",
    className: "bg-yellow-100 text-yellow-800",
    rowClassName: "",
    priority: 3,
  };
}

export default async function CertificationReportsPage() {
  await requireHRManager();

  const cookieStore = await cookies();
  const facilityScope =
    cookieStore.get("facilityScope")?.value ?? "ALL";

  const employeeFacilityWhere =
    facilityScope === "ALL"
      ? {}
      : {
          facilityId: facilityScope,
        };

  const today = startOfDay(new Date());
  const ninetyDaysLater = addDays(today, 90);

  const [certifications, expiringCertifications] =
    await Promise.all([
      prisma.certification.findMany({
        include: {
          employeeCertifications: {
            where: {
              employee: employeeFacilityWhere,
            },
            select: {
              id: true,
            },
          },
        },
        orderBy: {
          name: "asc",
        },
      }),

      prisma.employeeCertification.findMany({
        where: {
          certification: {
            expiryManaged: true,
          },
          expiryDate: {
            not: null,
            lte: ninetyDaysLater,
          },
          employee: employeeFacilityWhere,
        },
        include: {
          certification: {
            select: {
              id: true,
              name: true,
            },
          },
          employee: {
            select: {
              id: true,
              employeeNo: true,
              lastName: true,
              firstName: true,
              facilityId: true,
            },
          },
        },
      }),
    ]);

  const sortedExpiringCertifications = expiringCertifications
    .map((item) => {
      const remainingDays = getRemainingDays(item.expiryDate!, today);
      const status = getAlertStatus(remainingDays);
      return {
        ...item,
        remainingDays,
        status,
      };
    })
    .sort((a, b) => {
      if (a.status.priority !== b.status.priority) {
        return a.status.priority - b.status.priority;
      }
      return a.remainingDays - b.remainingDays;
    });

  return (
    <div className="p-6 space-y-6">
      <BackLink href="/certifications" label="資格マスタへ戻る" />

      <h1 className="text-2xl font-bold">資格レポート・期限管理</h1>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">資格別保有状況</h2>
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">資格名</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">保有者数</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {certifications.map((cert) => (
                <tr key={cert.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{cert.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{cert.employeeCertifications.length}名</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">期限切れ・90日以内期限到来リスト</h2>
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">状態</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">職員番号</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">氏名</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">資格名</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">有効期限</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">残日数</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedExpiringCertifications.map((item) => (
                <tr key={item.id} className={item.status.rowClassName}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${item.status.className}`}>
                      {item.status.label}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.employee.employeeNo}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <Link href={`/employees/${item.employee.id}`} className="text-blue-600 hover:underline">
                      {item.employee.lastName} {item.employee.firstName}
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.certification.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(item.expiryDate)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.remainingDays < 0 ? `${Math.abs(item.remainingDays)}日超過` : `${item.remainingDays}日`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
