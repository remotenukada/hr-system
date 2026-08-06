import Link from "next/link";
import { randomUUID } from "crypto";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth-guard";
import { logAudit } from "@/lib/audit-log";
import { sendInvitationMail } from "@/lib/mail";

type Props = {
  searchParams: Promise<{
    error?: string;
  }>;
};

function redirectWithError(message: string) {
  redirect(
    `/user-invitations/new?error=${encodeURIComponent(message)}`,
  );
}

async function createInvitation(formData: FormData) {
  "use server";

  const session = await requireAdmin();

  const employeeNo = String(formData.get("employeeNo") ?? "").trim();
  const lastName = String(formData.get("lastName") ?? "").trim();
  const firstName = String(formData.get("firstName") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const expectedHireDateRaw = String(
    formData.get("expectedHireDate") ?? "",
  );

  if (!employeeNo || !lastName || !firstName || !email) {
    redirectWithError(
      "社員番号、氏名、メールアドレスは必須です。",
    );
  }

  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    redirectWithError(
      "このメールアドレスのユーザーは既に存在します。",
    );
  }

  const existingEmployee = await prisma.employee.findUnique({
    where: {
      employeeNo,
    },
  });

  if (existingEmployee) {
    redirectWithError(
      "この社員番号の職員は既に存在します。",
    );
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
    },
  });

  const invitationUrl =
    `${process.env.NEXT_PUBLIC_APP_URL}/register/${token}`;

  await sendInvitationMail(
    email,
    `${lastName} ${firstName}`,
    invitationUrl,
  );



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
    },
  });

  redirect("/user-invitations");
}

export default async function NewUserInvitationPage({
  searchParams,
}: Props) {
  await requireAdmin();

  const params = await searchParams;
  const error = params.error;

  return (
    <main className="mx-auto max-w-2xl p-8">
      <div className="mb-6">
        <Link
          href="/user-invitations"
          className="text-sm text-blue-600 hover:underline"
        >
          ← 招待一覧へ戻る
        </Link>

        <h1 className="mt-2 text-3xl font-bold">
          招待作成
        </h1>

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
            社員番号
          </label>
          <input
            name="employeeNo"
            className="w-full rounded border p-2"
            required
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium">
              姓
            </label>
            <input
              name="lastName"
              className="w-full rounded border p-2"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              名
            </label>
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
          <label className="mb-1 block text-sm font-medium">
            入職予定日
          </label>
          <input
            type="date"
            name="expectedHireDate"
            className="w-full rounded border p-2"
          />
        </div>

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
