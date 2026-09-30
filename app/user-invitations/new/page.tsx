import BackLink from "@/components/BackLink";
import Link from "next/link";
import { randomUUID } from "crypto";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth-guard";
import { logAudit } from "@/lib/audit-log";
import { sendInvitationMail } from "@/lib/mail";

const ONBOARDING_PRESET_ITEMS = [
  {
    key: "PLEDGE",
    label: "誓約書",
    description: "後日、署名済みの紙媒体で提出",
  },
  {
    key: "RESIDENCE",
    label: "住居届",
    description: "初回登録時は該当なし",
  },
  {
    key: "COMMUTING",
    label: "通勤届",
    description: "初回登録時は該当なし",
  },
  {
    key: "DEPENDENTS",
    label: "扶養家族情報",
    description: "扶養家族なし",
  },
  {
    key: "CERTIFICATIONS",
    label: "免許・資格等",
    description: "該当する資格なし",
  },
  {
    key: "BANK_ACCOUNT",
    label: "口座情報",
    description: "後日提出",
  },
  {
    key: "MY_NUMBER",
    label: "個人番号",
    description: "後日提出",
  },
] as const;

const ONBOARDING_PRESET_KEYS = ONBOARDING_PRESET_ITEMS.map(
  (item) => item.key,
);

type Props = {
  searchParams: Promise<{
    error?: string;
  }>;
};

function redirectWithError(message: string) {
  redirect(`/user-invitations/new?error=${encodeURIComponent(message)}`);
}

async function createInvitation(formData: FormData) {
  "use server";

  const session = await requireAdmin();

  const employeeNo = String(formData.get("employeeNo") ?? "").trim();
  const lastName = String(formData.get("lastName") ?? "").trim();
  const firstName = String(formData.get("firstName") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const expectedHireDateRaw = String(formData.get("expectedHireDate") ?? "");

  const onboardingPresetItems = formData
    .getAll("onboardingPresetItems")
    .map(String)
    .filter((item) =>
      ONBOARDING_PRESET_KEYS.includes(
        item as (typeof ONBOARDING_PRESET_KEYS)[number],
      ),
    );

  if (!lastName || !firstName || !email) {
    redirectWithError("氏名、メールアドレスは必須です。");
  }

  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    redirectWithError("このメールアドレスのユーザーは既に存在します。");
  }

  if (employeeNo) {
    const existingEmployee = await prisma.employee.findUnique({
      where: {
        employeeNo,
      },
    });

    if (existingEmployee) {
      redirectWithError("この職員番号の職員は既に存在します。");
    }
  }

  const token = randomUUID();

  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 14);

  const invitation = await prisma.userInvitation.create({
    data: {
      employeeNo,
      lastName,
      firstName,
      email,
      token,
      expectedHireDate: expectedHireDateRaw
        ? new Date(`${expectedHireDateRaw}T00:00:00`)
        : null,
      expiresAt,
      onboardingPresetItems,
    },
  });

  const invitationUrl = `${process.env.NEXT_PUBLIC_APP_URL}/register/${token}`;

  await sendInvitationMail(email, `${lastName} ${firstName}`, invitationUrl);

  await logAudit({
    userId: session.user.id,
    userName: session.user.name,
    action: "USER_INVITATION_CREATED",
    targetType: "UserInvitation",
    targetId: invitation.id,
    description: `招待作成: ${email}`,
    afterData: {
      employeeNo,
      lastName,
      firstName,
      email,
      expectedHireDate: invitation.expectedHireDate,
      expiresAt: invitation.expiresAt,
      onboardingPresetItems,
    },
  });

  redirect("/user-invitations");
}

export default async function NewUserInvitationPage({ searchParams }: Props) {
  await requireAdmin();

  const params = await searchParams;
  const error = params.error;

  return (
    <main className="mx-auto max-w-2xl p-8">
      <BackLink href="/user-invitations" label="ユーザー招待一覧へ戻る" />
      <div className="mb-6">
        <h1 className="mt-2 text-3xl font-bold">招待作成</h1>

        <p className="mt-1 text-sm text-gray-500">
          雇用予定者向けのセルフ登録URLを発行します。
        </p>
      </div>

      {error && (
        <div className="mb-4 rounded border border-red-200 bg-red-50 p-3 text-sm font-medium text-red-700">
          {error}
        </div>
      )}

      <form action={createInvitation} className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium">
            職員番号（未定の場合は仮番号を自動採番）
          </label>
          <input
            name="employeeNo"
            placeholder="未定の場合は空欄"
            className="w-full rounded border p-2"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium">姓</label>
            <input
              name="lastName"
              className="w-full rounded border p-2"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">名</label>
            <input
              name="firstName"
              className="w-full rounded border p-2"
              required
            />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">
            メールアドレス
          </label>
          <input
            type="email"
            name="email"
            className="w-full rounded border p-2"
            required
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">入職予定日</label>
          <input
            type="date"
            name="expectedHireDate"
            className="w-full rounded border p-2"
          />
        </div>

        <section className="rounded-lg border bg-gray-50 p-4">
          <h2 className="font-semibold text-gray-900">
            初回登録の事前設定
          </h2>

          <p className="mt-1 text-sm text-gray-600">
            初回登録ウィザードで省略する項目を選択してください。
            この設定は本人登録時に職員情報へ引き継がれます。
          </p>

          <div className="mt-4 space-y-3">
            {ONBOARDING_PRESET_ITEMS.map((item) => (
              <label
                key={item.key}
                className="flex cursor-pointer items-start gap-3 rounded border bg-white p-3 hover:bg-gray-50"
              >
                <input
                  type="checkbox"
                  name="onboardingPresetItems"
                  value={item.key}
                  className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600"
                />

                <span>
                  <span className="block text-sm font-medium text-gray-900">
                    {item.label}
                  </span>
                  <span className="block text-xs text-gray-500">
                    {item.description}
                  </span>
                </span>
              </label>
            ))}
          </div>
        </section>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            招待作成
          </button>

          <Link
            href="/user-invitations"
            className="rounded border bg-white px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
          >
            キャンセル
          </Link>
        </div>
      </form>
    </main>
  );
}
