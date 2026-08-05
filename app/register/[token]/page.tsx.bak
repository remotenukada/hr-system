import bcrypt from "bcrypt";
import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { UserRole } from "@/generated/prisma";
import { logAudit } from "@/lib/audit-log";

type Props = {
  params: Promise<{
    token: string;
  }>;
  searchParams: Promise<{
    error?: string;
  }>;
};

function redirectWithError(token: string, message: string) {
  redirect(
    `/register/${token}?error=${encodeURIComponent(message)}`,
  );
}

async function completeRegistration(formData: FormData) {
  "use server";

  const token = String(formData.get("token") ?? "");
  const lastName = String(formData.get("lastName") ?? "").trim();
  const firstName = String(formData.get("firstName") ?? "").trim();
  const lastNameKana = String(formData.get("lastNameKana") ?? "").trim();
  const firstNameKana = String(formData.get("firstNameKana") ?? "").trim();
  const phoneNumber = String(formData.get("phoneNumber") ?? "").trim();
  const address = String(formData.get("address") ?? "").trim();
  const birthDateRaw = String(formData.get("birthDate") ?? "");
  const password = String(formData.get("password") ?? "");
  const passwordConfirm = String(formData.get("passwordConfirm") ?? "");

  const invitation = await prisma.userInvitation.findUnique({
    where: {
      token,
    },
  });

  if (!invitation) {
    notFound();
  }

  if (invitation.acceptedAt) {
    redirectWithError(
      token,
      "この招待は既に登録済みです。",
    );
  }

  if (invitation.cancelledAt) {
    redirectWithError(
      token,
      "この招待は取り消されています。",
    );
  }

  if (invitation.expiresAt < new Date()) {
    redirectWithError(
      token,
      "この招待URLは期限切れです。",
    );
  }

  if (!lastName || !firstName || !password) {
    redirectWithError(
      token,
      "氏名とパスワードは必須です。",
    );
  }

  if (password.length < 8) {
    redirectWithError(
      token,
      "パスワードは8文字以上にしてください。",
    );
  }

  if (password !== passwordConfirm) {
    redirectWithError(
      token,
      "パスワード確認が一致しません。",
    );
  }

  const existingUser = await prisma.user.findUnique({
    where: {
      email: invitation.email,
    },
  });

  if (existingUser) {
    redirectWithError(
      token,
      "このメールアドレスのユーザーは既に存在します。",
    );
  }

  const existingEmployee = await prisma.employee.findUnique({
    where: {
      employeeNo: invitation.employeeNo,
    },
  });

  if (existingEmployee) {
    redirectWithError(
      token,
      "この社員番号の職員は既に存在します。",
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const result = await prisma.$transaction(async (tx) => {
    const user = await tx.user.create({
      data: {
        name: `${lastName} ${firstName}`,
        email: invitation.email,
        password: hashedPassword,
        role: UserRole.USER,
        isActive: true,
      },
    });

    const employee = await tx.employee.create({
      data: {
        employeeNo: invitation.employeeNo,
        lastName,
        firstName,
        lastNameKana: lastNameKana || null,
        firstNameKana: firstNameKana || null,
        email: invitation.email,
        phoneNumber: phoneNumber || null,
        address: address || null,
        birthDate: birthDateRaw
          ? new Date(`${birthDateRaw}T00:00:00`)
          : null,
        hireDate: invitation.expectedHireDate ?? null,
        status: "ACTIVE",
      },
    });

    const updatedInvitation = await tx.userInvitation.update({
      where: {
        id: invitation.id,
      },
      data: {
        acceptedAt: new Date(),
        createdUserId: user.id,
        createdEmployeeId: employee.id,
      },
    });

    return {
      user,
      employee,
      invitation: updatedInvitation,
    };
  });

  await logAudit({
    action: "USER_SELF_REGISTERED",
    targetType: "UserInvitation",
    targetId: result.invitation.id,
    description: `招待登録完了: ${result.user.email}`,
    afterData: {
      userId: result.user.id,
      employeeId: result.employee.id,
      employeeNo: result.employee.employeeNo,
      email: result.user.email,
      role: result.user.role,
    },
  });

  redirect("/login");
}

export default async function RegisterPage({
  params,
  searchParams,
}: Props) {
  const { token } = await params;
  const sp = await searchParams;

  const invitation = await prisma.userInvitation.findUnique({
    where: {
      token,
    },
  });

  if (!invitation) {
    notFound();
  }

  const isExpired = invitation.expiresAt < new Date();

  return (
    <main className="mx-auto max-w-2xl p-8">
      <h1 className="text-3xl font-bold">
        本人登録
      </h1>

      <p className="mt-2 text-sm text-gray-500">
        招待情報を確認し、ログイン用パスワードと本人情報を入力してください。
      </p>

      {sp.error && (
        <div className="mt-4 rounded border border-red-200 bg-red-50 p-3 text-sm font-medium text-red-700">
          {sp.error}
        </div>
      )}

      {invitation.acceptedAt ? (
        <div className="mt-6 rounded border bg-white p-6 text-sm text-gray-600">
          この招待は既に登録済みです。
        </div>
      ) : isExpired ? (
        <div className="mt-6 rounded border bg-white p-6 text-sm text-gray-600">
          この招待URLは期限切れです。
        </div>
      ) : (
        <form action={completeRegistration} className="mt-6 space-y-4">
          <input
            type="hidden"
            name="token"
            value={token}
          />

          <div className="rounded bg-gray-50 p-3 text-sm">
            <p>
              <strong>社員番号:</strong> {invitation.employeeNo}
            </p>
            <p>
              <strong>メール:</strong> {invitation.email}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium">
                姓
              </label>
              <input
                name="lastName"
                defaultValue={invitation.lastName}
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
                defaultValue={invitation.firstName}
                className="w-full rounded border p-2"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium">
                姓ふりがな
              </label>
              <input
                name="lastNameKana"
                className="w-full rounded border p-2"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">
                名ふりがな
              </label>
              <input
                name="firstNameKana"
                className="w-full rounded border p-2"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              生年月日
            </label>
            <input
              type="date"
              name="birthDate"
              className="w-full rounded border p-2"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              電話番号
            </label>
            <input
              name="phoneNumber"
              className="w-full rounded border p-2"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              住所
            </label>
            <textarea
              name="address"
              rows={3}
              className="w-full rounded border p-2"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              パスワード
            </label>
            <input
              type="password"
              name="password"
              minLength={8}
              className="w-full rounded border p-2"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              パスワード確認
            </label>
            <input
              type="password"
              name="passwordConfirm"
              minLength={8}
              className="w-full rounded border p-2"
              required
            />
          </div>

          <button
            type="submit"
            className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            登録する
          </button>
        </form>
      )}
    </main>
  );
}
