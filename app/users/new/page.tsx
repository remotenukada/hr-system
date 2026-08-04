import Link from "next/link";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth-guard";
import { logAudit } from "@/lib/audit-log";
import { UserRole } from "@/generated/prisma";

type Props = {
  searchParams: Promise<{
    error?: string;
  }>;
};

type UserRoleValue =
  (typeof UserRole)[keyof typeof UserRole];

const USER_ROLES = [
  UserRole.ADMIN,
  UserRole.HR_MANAGER,
  UserRole.MANAGER,
  UserRole.USER,
] as const;

function isValidRole(role: string): role is UserRoleValue {
  return USER_ROLES.includes(role as UserRoleValue);
}

function redirectWithError(message: string) {
  redirect(`/users/new?error=${encodeURIComponent(message)}`);
}

async function createUser(formData: FormData) {
  "use server";

  const session = await requireAdmin();

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const roleRaw = String(formData.get("role") ?? UserRole.USER);

  const role = isValidRole(roleRaw)
    ? roleRaw
    : UserRole.USER;

  if (!name || !email || !password) {
    redirectWithError(
      "氏名、メールアドレス、パスワードは必須です。",
    );
  }

  if (password.length < 8) {
    redirectWithError(
      "パスワードは8文字以上にしてください。",
    );
  }

  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    redirectWithError(
      "このメールアドレスは既に登録されています。",
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const createdUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role,
    },
  });

  await logAudit({
    userId: session.user.id,
    userName: session.user.name,
    action: "USER_CREATED",
    targetType: "User",
    targetId: createdUser.id,
    description: `ユーザー作成: ${createdUser.email}`,
    afterData: {
      name: createdUser.name,
      email: createdUser.email,
      role: createdUser.role,
    },
  });

  redirect("/users");
}

export default async function NewUserPage({
  searchParams,
}: Props) {
  await requireAdmin();

  const params = await searchParams;
  const error = params.error;

  return (
    <main className="mx-auto max-w-2xl p-8">
      <div className="mb-6">
        <Link
          href="/users"
          className="text-sm text-gray-500 hover:underline"
        >
          ← ユーザー一覧へ戻る
        </Link>

        <h1 className="mt-2 text-3xl font-bold">
          新規ユーザー作成
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          ログイン用ユーザーを作成します。
        </p>
      </div>

      {error && (
        <div className="mb-4 rounded border border-red-200 bg-red-50 p-3 text-sm font-medium text-red-700">
          {error}
        </div>
      )}

      <form action={createUser} className="space-y-4 rounded border bg-white p-6 shadow-sm">
        <div>
          <label className="mb-1 block text-sm font-medium">
            氏名
          </label>
          <input
            name="name"
            className="w-full rounded border p-2"
            required
          />
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
            パスワード
          </label>
          <input
            type="password"
            name="password"
            minLength={8}
            className="w-full rounded border p-2"
            required
          />
          <p className="mt-1 text-xs text-gray-500">
            8文字以上で入力してください。
          </p>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">
            権限
          </label>
          <select
            name="role"
            className="w-full rounded border bg-white p-2"
            defaultValue={UserRole.USER}
          >
            <option value={UserRole.ADMIN}>管理者</option>
            <option value={UserRole.HR_MANAGER}>人事担当</option>
            <option value={UserRole.MANAGER}>管理職</option>
            <option value={UserRole.USER}>一般ユーザー</option>
          </select>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            作成
          </button>

          <Link
            href="/users"
            className="rounded border bg-white px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
          >
            キャンセル
          </Link>
        </div>
      </form>
    </main>
  );
}
