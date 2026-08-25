import Link from "next/link";
import BackLink from "@/components/BackLink";
import { requireHRManager } from "@/lib/auth-guard";
import { prisma } from "@/lib/prisma";

export default async function RetirementCertificateSelectPage() {
  await requireHRManager();

  const employees = await prisma.employee.findMany({
    orderBy: [{ lastName: "asc" }, { firstName: "asc" }],
  });

  return (
    <main className="mx-auto max-w-4xl p-6">
      /certificates

      <h1 className="mb-2 mt-6 text-2xl font-bold">
        退職証明書
      </h1>
      <p className="mb-6 text-gray-600">
        証明書を発行する職員を選択してください。
      </p>

      <div className="overflow-hidden rounded-xl border bg-white">
        {employees.map((employee) => (
          <Link key={employee.id} href={`/retirement-management/${employee.id}/certificate`}>
            <span>
              <span className="mr-4 text-sm text-gray-500">
                {employee.employeeNo}
              </span>
              <span className="font-medium">
                {employee.lastName} {employee.firstName}
              </span>
            </span>
            <span className="text-blue-600">選択 →</span>
          </Link>
        ))}
      </div>
    </main>
  );
}
