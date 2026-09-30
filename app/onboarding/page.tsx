import Link from "next/link";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

const TASK_KEYS = [
  "PROFILE",
  "PLEDGE",
  "RESIDENCE",
  "COMMUTING",
  "DEPENDENTS",
  "CERTIFICATIONS",
  "BANK_ACCOUNT",
  "MY_NUMBER",
] as const;

const SKIPPABLE_TASK_KEYS: TaskKey[] = [
  "PLEDGE",
  "RESIDENCE",
  "COMMUTING",
  "DEPENDENTS",
  "CERTIFICATIONS",
  "BANK_ACCOUNT",
  "MY_NUMBER",
];

type TaskKey = (typeof TASK_KEYS)[number];

function isTaskKey(value: string): value is TaskKey {
  return TASK_KEYS.includes(value as TaskKey);
}

function getSkippedItems(value: unknown): TaskKey[] {
  if (!Array.isArray(value)) return [];

  return value.filter(
    (item): item is TaskKey =>
      typeof item === "string" && isTaskKey(item),
  );
}

async function getCurrentEmployee() {
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

  return employee;
}

async function updateSkippedItem(formData: FormData) {
  "use server";

  const employee = await getCurrentEmployee();
  const key = String(formData.get("key") ?? "");
  const action = String(formData.get("action") ?? "");

  if (!isTaskKey(key)) {
    throw new Error("不正な初回登録項目です。");
  }

  const current = getSkippedItems(
    employee.onboardingSkippedItems,
  );

  const updated =
    action === "remove"
      ? current.filter((item) => item !== key)
      : [...new Set([...current, key])];

  await prisma.employee.update({
    where: {
      id: employee.id,
    },
    data: {
      onboardingSkippedItems: updated,
    },
  });

  revalidatePath("/onboarding");
}

async function completeOnboarding() {
  "use server";

  const employee = await getCurrentEmployee();

  const [
    pledgeCount,
    residenceCount,
    commutingCount,
    dependentCount,
    certificationCount,
    bankAccountCount,
    myNumberCount,
  ] = await Promise.all([
    prisma.employeePledge.count({
      where: {
        employeeId: employee.id,
        status: {
          in: [
            "GUARANTOR_PENDING",
            "GUARANTOR_CONFIRMED",
            "PAPER_UPLOADED",
            "COMPLETED",
          ],
        },
      },
    }),
    prisma.residenceRequest.count({
      where: { employeeId: employee.id },
    }),
    prisma.commutingRequest.count({
      where: { employeeId: employee.id },
    }),
    prisma.dependentRequest.count({
      where: { employeeId: employee.id },
    }),
    prisma.employeeCertification.count({
      where: { employeeId: employee.id },
    }),
    prisma.employeeBankAccount.count({
      where: { employeeId: employee.id },
    }),
    prisma.employeeMyNumber.count({
      where: { employeeId: employee.id },
    }),
  ]);

  const skipped = getSkippedItems(
    employee.onboardingSkippedItems,
  );

  const completedKeys: TaskKey[] = [];

  completedKeys.push("PROFILE");
  if (pledgeCount > 0) completedKeys.push("PLEDGE");

  if (residenceCount > 0) completedKeys.push("RESIDENCE");
  if (commutingCount > 0) completedKeys.push("COMMUTING");
  if (dependentCount > 0) completedKeys.push("DEPENDENTS");
  if (certificationCount > 0) {
    completedKeys.push("CERTIFICATIONS");
  }
  if (bankAccountCount > 0) {
    completedKeys.push("BANK_ACCOUNT");
  }
  if (myNumberCount > 0) completedKeys.push("MY_NUMBER");

  const allCompleted = TASK_KEYS.every(
    (key) =>
      completedKeys.includes(key) || skipped.includes(key),
  );

  if (!allCompleted) {
    redirect("/onboarding?error=incomplete");
  }

  await prisma.employee.update({
    where: {
      id: employee.id,
    },
    data: {
      onboardingCompletedAt: new Date(),
    },
  });

  redirect("/");
}

export default async function OnboardingPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const employee = await getCurrentEmployee();
  const params = await searchParams;

  if (employee.onboardingCompletedAt) {
    redirect("/");
  }

  const [
    pledgeCount,
    residenceCount,
    commutingCount,
    dependentCount,
    certificationCount,
    bankAccountCount,
    myNumberCount,
  ] = await Promise.all([
    prisma.employeePledge.count({
      where: {
        employeeId: employee.id,
        status: {
          in: [
            "GUARANTOR_PENDING",
            "GUARANTOR_CONFIRMED",
            "PAPER_UPLOADED",
            "COMPLETED",
          ],
        },
      },
    }),
    prisma.residenceRequest.count({
      where: { employeeId: employee.id },
    }),
    prisma.commutingRequest.count({
      where: { employeeId: employee.id },
    }),
    prisma.dependentRequest.count({
      where: { employeeId: employee.id },
    }),
    prisma.employeeCertification.count({
      where: { employeeId: employee.id },
    }),
    prisma.employeeBankAccount.count({
      where: { employeeId: employee.id },
    }),
    prisma.employeeMyNumber.count({
      where: { employeeId: employee.id },
    }),
  ]);

  const skippedItems = getSkippedItems(
    employee.onboardingSkippedItems,
  );

  const tasks = [
    {
      key: "PROFILE" as const,
      label: "プロフィール",
      href: "/mypage/profile-change",
      completed: true,
    },
    {
      key: "PLEDGE" as const,
      label: "誓約書",
      href: "/mypage/pledge",
      completed: pledgeCount > 0,
    },
    {
      key: "RESIDENCE" as const,
      label: "住居届",
      href: "/mypage/residence-requests",
      completed: residenceCount > 0,
    },
    {
      key: "COMMUTING" as const,
      label: "通勤届",
      href: "/mypage/commuting-requests",
      completed: commutingCount > 0,
    },
    {
      key: "DEPENDENTS" as const,
      label: "扶養家族情報",
      href: "/mypage/dependent-requests",
      completed: dependentCount > 0,
    },
    {
      key: "CERTIFICATIONS" as const,
      label: "免許・資格等",
      href: "/mypage/certifications",
      completed: certificationCount > 0,
    },
    {
      key: "BANK_ACCOUNT" as const,
      label: "口座情報",
      href: "/mypage/bank-account",
      completed: bankAccountCount > 0,
    },
    {
      key: "MY_NUMBER" as const,
      label: "マイナンバー",
      href: "/mypage/my-number",
      completed: myNumberCount > 0,
    },
  ].map((task) => ({
    ...task,
    skipped: skippedItems.includes(task.key),
  }));

  const completedCount = tasks.filter(
    (task) => task.completed || task.skipped,
  ).length;

  const allCompleted = completedCount === tasks.length;

  return (
    <main className="mx-auto max-w-4xl p-8">
      <h1 className="text-3xl font-bold text-gray-900">
        初回登録
      </h1>

      <p className="mt-2 text-gray-600">
        必要な情報を登録してください。該当しない項目は
        「該当なし」を選択できます。
      </p>

      {params.error === "incomplete" && (
        <div className="mt-4 rounded border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          未対応の項目があります。
        </div>
      )}

      <section className="mt-6 rounded-lg border bg-white p-5">
        <div className="flex items-center justify-between">
          <span className="font-semibold">登録進捗</span>
          <span>
            {completedCount} / {tasks.length}
          </span>
        </div>

        <div className="mt-3 h-3 overflow-hidden rounded bg-gray-200">
          <div
            className="h-full bg-blue-600"
            style={{
              width: `${(completedCount / tasks.length) * 100}%`,
            }}
          />
        </div>
      </section>

      <div className="mt-6 space-y-3">
        {tasks.map((task) => {
          const done = task.completed || task.skipped;

          return (
            <section
              key={task.key}
              className="flex flex-col justify-between gap-4 rounded-lg border bg-white p-5 sm:flex-row sm:items-center"
            >
              <div>
                <h2 className="font-semibold text-gray-900">
                  {task.label}
                </h2>
                <p className="mt-1 text-sm text-gray-600">
                  {task.completed
                    ? "登録・申請済み"
                    : task.skipped
                      ? (task.key === "PLEDGE"
                          ? "紙提出予定"
                          : "該当なしに設定中")
                      : "未対応"}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href={task.href}
                  className="rounded border border-gray-300 bg-white px-4 py-2 text-center text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  {done ? "確認する" : "登録する"}
                </Link>

                {!task.completed && SKIPPABLE_TASK_KEYS.includes(task.key) && (
                  <form action={updateSkippedItem}>
                    <input type="hidden" name="key" value={task.key} />
                    <input
                      type="hidden"
                      name="action"
                      value={task.skipped ? "remove" : "add"}
                    />
                    <button
                      type="submit"
                      className="rounded px-3 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                    >
                      {task.key === "PLEDGE"
  ? (task.skipped
      ? "後日提出を解除"
      : "後日、紙で提出")
  : (task.skipped
      ? "該当なしを解除"
      : "該当なしにする")}
                    </button>
                  </form>
                )}
              </div>
            </section>
          );
        })}
      </div>

      <div className="mt-8 flex justify-end">
        <form action={completeOnboarding}>
          <button
            type="submit"
            disabled={!allCompleted}
            className={`rounded px-6 py-2.5 font-medium text-white transition ${
              allCompleted
                ? "bg-blue-600 hover:bg-blue-700"
                : "cursor-not-allowed bg-gray-300"
            }`}
          >
            初回登録を完了する
          </button>
        </form>
      </div>
    </main>
  );
}
