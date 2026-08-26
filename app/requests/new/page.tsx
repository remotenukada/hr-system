import BackLink from "@/components/BackLink";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { mkdir, writeFile } from "fs/promises";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import path from "path";
import { randomUUID } from "crypto";

const MAX_FILE_SIZE = 10 * 1024 * 1024;

const ALLOWED_MIME_TYPES = new Set([
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

async function saveAttachmentFile(file: File) {
  if (file.size > MAX_FILE_SIZE) {
    throw new Error("ファイルサイズは10MB以下にしてください。");
  }

  if (!ALLOWED_MIME_TYPES.has(file.type)) {
    throw new Error("対応していないファイル形式です。");
  }

  const uploadDir = path.join(process.cwd(), "public", "uploads", "requests");
  await mkdir(uploadDir, { recursive: true });

  const ext = path.extname(file.name).toLowerCase();
  const storedFileName = `${randomUUID()}${ext}`;
  const fullPath = path.join(uploadDir, storedFileName);

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  await writeFile(fullPath, buffer);

  return {
    fileName: file.name,
    filePath: `/uploads/requests/${storedFileName}`,
    fileSize: file.size,
    mimeType: file.type,
  };
}

async function createRequest(formData: FormData) {
  "use server";

  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const title = String(formData.get("title") || "");
  const comment = String(formData.get("comment") || "");
  const type = String(formData.get("type") || "");
  const employeeId = String(formData.get("employeeId") || "") || null;
  const leaveTypeId = String(formData.get("leaveTypeId") || "") || null;

  const leaveStartDate = String(formData.get("leaveStartDate") || "") || null;

  const leaveEndDate = String(formData.get("leaveEndDate") || "") || null;

  const leaveDays = Number(formData.get("leaveDays") || 0) || null;

  const currentUser = session.user.email
    ? await prisma.user.findUnique({
        where: {
          email: session.user.email,
        },
      })
    : null;

  const files = formData
    .getAll("attachments")
    .filter((file): file is File => file instanceof File && file.size > 0);

  const attachments = [];

  for (const file of files) {
    const attachment = await saveAttachmentFile(file);
    attachments.push(attachment);
  }

  if (type === "PAID_LEAVE") {
    if (!employeeId || !leaveTypeId || !leaveDays) {
      redirect(
        `/requests/new?error=${encodeURIComponent(
          "対象職員、休暇種別、取得日数は必須です。",
        )}`,
      );
    }

    const leaveType = await prisma.leaveType.findUnique({
      where: {
        id: leaveTypeId,
      },
    });

    if (!leaveType || !leaveType.isActive) {
      redirect(
        `/requests/new?error=${encodeURIComponent(
          "選択した休暇種別は利用できません。",
        )}`,
      );
    }

    const typeBalance = await prisma.leaveTypeBalance.findUnique({
      where: {
        employeeId_leaveTypeId: {
          employeeId,
          leaveTypeId,
        },
      },
    });

    const remainingDays =
      (typeBalance?.grantedDays ?? 0) - (typeBalance?.usedDays ?? 0);

    if (remainingDays < leaveDays) {
      redirect(
        `/requests/new?error=${encodeURIComponent(
          `${leaveType.name}の残数不足（残数: ${remainingDays}日）`,
        )}`,
      );
    }
  }

  await prisma.employeeRequest.create({
    data: {
      title,
      comment,
      type: type as "ONBOARDING" | "DEPARTMENT_CHANGE" | "PAID_LEAVE" | "OTHER",

      userId: currentUser?.id ?? null,

      employeeId,
      leaveTypeId: type === "PAID_LEAVE" ? leaveTypeId : null,

      leaveStartDate: leaveStartDate ? new Date(leaveStartDate) : null,

      leaveEndDate: leaveEndDate ? new Date(leaveEndDate) : null,

      leaveDays,

      attachments:
        attachments.length > 0
          ? {
              create: attachments,
            }
          : undefined,

      histories: {
        create: {
          action: "CREATED",
          actor: session.user.name || "unknown",
          comment:
            attachments.length > 0
              ? `申請を作成しました。添付ファイル: ${attachments.length}件`
              : "申請を作成しました",
        },
      },
    },
  });

  revalidatePath("/requests");
  revalidatePath("/requests/my");

  redirect("/requests/my");
}

type NewRequestPageProps = {
  searchParams: Promise<{
    error?: string;
  }>;
};

export default async function NewRequestPage({
  searchParams,
}: NewRequestPageProps) {
  const params = await searchParams;
  const error = params.error;

  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const employees = await prisma.employee.findMany({
    orderBy: {
      employeeNo: "asc",
    },
  });

  const leaveTypes = await prisma.leaveType.findMany({
    where: {
      isActive: true,
    },
    orderBy: [
      {
        sortOrder: "asc",
      },
      {
        name: "asc",
      },
    ],
  });

  return (
    <main className="p-8 max-w-2xl mx-auto">
      <BackLink href="/requests" label="申請一覧へ戻る" />
      <h1 className="mb-6 text-3xl font-bold">新規申請作成</h1>

      {error && (
        <div className="mb-4 rounded border border-red-200 bg-red-50 p-3 text-sm font-medium text-red-700">
          {error}
        </div>
      )}

      <form action={createRequest} className="space-y-4">
        <div>
          <label className="mb-1 block font-medium">タイトル</label>
          <input
            name="title"
            placeholder="タイトルを入力"
            className="w-full rounded border p-2"
            required
          />
        </div>

        <div>
          <label className="mb-1 block font-medium">対象職員</label>

          <select
            name="employeeId"
            className="w-full rounded border bg-white p-2"
          >
            <option value="">対象職員を選択</option>

            {employees.map((employee) => (
              <option key={employee.id} value={employee.id}>
                {employee.employeeNo} {employee.lastName} {employee.firstName}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1 block font-medium">申請種別</label>
          <select
            name="type"
            className="w-full rounded border bg-white p-2"
            required
          >
            <option value="ONBOARDING">入社</option>
            <option value="DEPARTMENT_CHANGE">部署変更</option>
            <option value="PAID_LEAVE">有給休暇</option>
            <option value="OTHER">その他</option>
          </select>
        </div>

        <div>
          <label className="mb-1 block font-medium">休暇種別</label>

          <select
            name="leaveTypeId"
            className="w-full rounded border bg-white p-2"
          >
            <option value="">休暇種別を選択</option>

            {leaveTypes.map((leaveType) => (
              <option key={leaveType.id} value={leaveType.id}>
                {leaveType.name}
              </option>
            ))}
          </select>

          <p className="mt-1 text-xs text-gray-500">
            有給休暇申請の場合に選択してください。
          </p>
        </div>

        <div>
          <label className="mb-1 block font-medium">有給開始日</label>

          <input
            type="date"
            name="leaveStartDate"
            className="w-full rounded border p-2"
          />
        </div>

        <div>
          <label className="mb-1 block font-medium">有給終了日</label>

          <input
            type="date"
            name="leaveEndDate"
            className="w-full rounded border p-2"
          />
        </div>

        <div>
          <label className="mb-1 block font-medium">取得日数</label>

          <input
            type="number"
            step="0.5"
            name="leaveDays"
            className="w-full rounded border p-2"
          />
        </div>

        <div>
          <label className="mb-1 block font-medium">コメント</label>
          <textarea
            name="comment"
            placeholder="コメントを入力"
            className="w-full rounded border p-2"
            rows={5}
          />
        </div>

        <div>
          <label className="mb-1 block font-medium">添付ファイル</label>
          <input
            type="file"
            name="attachments"
            multiple
            accept=".pdf,.xls,.xlsx,.doc,.docx,.jpg,.jpeg,.png,.webp,.gif"
            className="w-full rounded border bg-white p-2"
          />
          <p className="mt-1 text-xs text-gray-500">
            PDF、Excel、Word、画像を添付できます。1ファイル10MBまで。
          </p>
        </div>

        <button
          type="submit"
          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 font-medium"
        >
          申請を作成
        </button>
      </form>
    </main>
  );
}
