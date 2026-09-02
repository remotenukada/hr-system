import BackLink from "@/components/BackLink";
import { cookies } from "next/headers";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { requireHRManager } from "@/lib/auth-guard";

import { setFacilityScope } from "@/app/actions/facility-scope";

export default async function FacilitySwitchPage() {
  await requireHRManager();

  const session = await auth();

  const managerEmployee =
    session?.user?.role === "MANAGER"
      ? await prisma.employee.findFirst({
          where: {
            userId: session.user.id,
          },
          include: {
            facility: true,
          },
        })
      : null;

  const facilities = await prisma.facility.findMany({
    orderBy: {
      name: "asc",
    },
  });

  const cookieStore = await cookies();

  const currentScope = cookieStore.get("facilityScope")?.value ?? "ALL";

  return (
    <main className="mx-auto max-w-3xl p-8">
      <BackLink href="/" label="ダッシュボードに戻る" />

      <h1 className="mb-6 text-3xl font-bold">表示対象切替</h1>

      <form action={setFacilityScope} className="space-y-4">
        <label className="flex gap-2 items-center cursor-pointer">
          <input
            type="radio"
            name="facilityId"
            value="ALL"
            defaultChecked={currentScope === "ALL"}
          />
          法人全体
        </label>

        {(session?.user?.role === "MANAGER"
          ? facilities.filter(
              (facility) => facility.id === managerEmployee?.facilityId,
            )
          : facilities
        ).map((facility) => (
          <label
            key={facility.id}
            className="flex gap-2 items-center cursor-pointer"
          >
            <input
              type="radio"
              name="facilityId"
              value={facility.id}
              defaultChecked={currentScope === facility.id}
            />
            {facility.name}
          </label>
        ))}

        <div className="pt-2">
          <button
            type="submit"
            className="rounded bg-blue-600 px-4 py-2 text-white font-medium hover:bg-blue-700"
          >
            切り替える
          </button>
        </div>
      </form>
    </main>
  );
}
