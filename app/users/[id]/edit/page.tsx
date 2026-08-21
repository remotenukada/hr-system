import BackLink from "@/components/BackLink";
import Link from "next/link";
import bcrypt from "bcrypt";
import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth-guard";
import { logAudit } from "@/lib/audit-log";
import { UserRole } from "@/generated/prisma";

type Props = {
  params: Promise<{
    id: string;
  }>;
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

function redirectWithError(id: string, message: string) {
  redirect(
    `/users/${id}/edit?error=${encodeURIComponent(message)}`,
  );
}

async function updateUser(formData: FormData) {
  "use server";

  const session = await requireAdmin();

  const id = String(formData.get("id") ?? "");
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const isActive = formData.get("isActive") === "on";
  const roleRaw = String(formData.get("role") ?? UserRole.USER);

  const role = isValidRole(roleRaw)
    ? roleRaw
    : UserRole.USER;

  if (!id || !name || !email) {
    redirectWithError(
      id,
      "氏名とメールアドレスは必須です。",
    );
  }

  if (password && password.length < 8) {
    redirectWithError(
      id,
      "新しいパスワードは8文字以上にしてください。",
    );
  }

  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser && existingUser.id !== id) {
    redirectWithError(
      id,
      "このメールアドレスは既に登録されています。",
    );
  }

  const beforeUser = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  if (!beforeUser) {
    redirectWithError(
      id,
      "対象ユーザーが見つかりません。",
    );
  }

  const data: {
    name: string;
    email: string;
    role: UserRoleValue;
    isActive: boolean;
    password?: string;
  } = {
    name,
    email,
    role,
    isActive,
  };

  if (password) {
    data.password = await bcrypt.hash(password, 10);
  }

  const updatedUser = await prisma.user.update({
    where: {
      id,
    },
    data,
  });

  await logAudit({
    userId: session.user.id,
    userName: session.user.name,
    action: "USER_UPDATED",
    targetType: "User",
    targetId: updatedUser.id,
    description: `ユーザー更新: ${updatedUser.email}`,
    beforeData: {
      name: beforeUser!.name,
      email: beforeUser!.email,
      role: beforeUser!.role,
      isActive: beforeUser!.isActive,
    },
    afterData: {
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      isActive: updatedUser.isActive,
    },
  });

  if (beforeUser!.role !== updatedUser.role) {
    await logAudit({
      userId: session.user.id,
      userName: session.user.name,
      action: "USER_ROLE_CHANGED",
      targetType: "User",
      targetId: updatedUser.id,
      description: `ユーザー権限変更: ${updatedUser.email} ${beforeUser!.role} → ${updatedUser.role}`,
      beforeData: {
        role: beforeUser!.role,
      },
      afterData: {
        role: updatedUser.role,
      },
    });
  }

  if (beforeUser!.isActive !== updatedUser.isActive) {
    await logAudit({
      userId: session.user.id,
      userName: session.user.name,
      action: updatedUser.isActive
        ? "USER_ACTIVATED"
        : "USER_DEACTIVATED",
      targetType: "User",
      targetId: updatedUser.id,
      description: updatedUser.isActive
        ? `ユーザー有効化: ${updatedUser.email}`
        : `ユーザー無効化: ${updatedUser.email}`,
      beforeData: {
        isActive: beforeUser!.isActive,
      },
      afterData: {
        isActive: updatedUser.isActive,
      },
    });
  }

  if (password) {
    await logAudit({
      userId: session.user.id,
      userName: session.user.name,
      action: "USER_PASSWORD_RESET",
      targetType: "User",
      targetId: updatedUser.id,
      description: `ユーザーパスワード再設定: ${updatedUser.email}`,
    });
  }

  redirect("/users");
}

function formatRole(role: string) {
  const labels: Record<string, string> = {
    ADMIN: "管理者",
    HR_MANAGER: "人事担当",
    MANAGER: "管理職",
    USER: "一般ユーザー",
  };

  return labels[role] ?? role;
}

export default async function EditUserPage({
  params,
  searchParams,
}: Props) {
  await requireAdmin();

  const { id } = await params;
  const sp = await searchParams;

  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  if (!user) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-2xl p-8">
      <BackLink href="/users" label="ユーザー一覧へ戻る" />
      <div className="mb-6">
        <Link
          href="/users"
          className="text-sm text-gray-500 hover:underline"
        >
          ← ユーザー一覧へ戻る
        </Link>

        <h1 className="mt-2 text-3xl font-bold">
          ユーザー編集
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          ユーザー情報、権限、パスワードを変更します。
        </p>
      </div>

      {sp.error && (
        <div className="mb-4 rounded border border-red-200 bg-red-50 p-3 text-sm font-medium text-red-700">
          {sp.error}
        </div>
      )}

      <form action={updateUser} className="space-y-4 rounded border bg-white p-6 shadow-sm">
        <input
          type="hidden"
          name="id"
          value={user.id}
        />

        <div>
          <label className="mb-1 block text-sm font-medium">
            氏名
          </label>
          <input
            name="name"
            defaultValue={user.name}
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
            defaultValue={user.email}
            className="w-full rounded border p-2"
            required
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">
            権限
          </label>
          <select
            name="role"
            className="w-full rounded border bg-white p-2"
            defaultValue={user.role}
          >
            <option value={UserRole.ADMIN}>管理者</option>
            <option value={UserRole.HR_MANAGER}>人事担当</option>
            <option value={UserRole.MANAGER}>管理職</option>
            <option value={UserRole.USER}>一般ユーザー</option>
          </select>
          <p className="mt-1 text-xs text-gray-500">
            現在の権限: {formatRole(user.role)}
          </p>
        </div>

        <div className="rounded border bg-gray-50 p-3">
          <label className="flex items-center gap-2 text-sm font-medium">
            <input
              type="checkbox"
              name="isActive"
              defaultChecked={user.isActive}
            />
            有効なユーザーとして扱う
          </label>
          <p className="mt-1 text-xs text-gray-500">
            チェックを外すと、このユーザーはログインできなくなります。
          </p>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">
            新しいパスワード
          </label>
          <input
            type="password"
            name="password"
            minLength={8}
            className="w-full rounded border p-2"
            placeholder="変更しない場合は空欄"
          />
          <p className="mt-1 text-xs text-gray-500">
            入力した場合のみパスワードを変更します。
          </p>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            保存
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
