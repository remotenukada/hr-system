import Link from "next/link";
import {
  createCipheriv,
  createHash,
  randomBytes,
} from "crypto";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import MyNumberInput from "@/components/MyNumberInput";
import { logAudit } from "@/lib/audit-log";

type Props = {
  searchParams?: Promise<{
    error?: string;
    updated?: string;
  }>;
};

function getEncryptionKey() {
  const secret =
    process.env.MYNUMBER_SECRET ||
    process.env.AUTH_SECRET ||
    "development-secret";

  return createHash("sha256").update(secret).digest();
}

function encryptMyNumber(value: string) {
  const key = getEncryptionKey();
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", key, iv);

  const encrypted = Buffer.concat([
    cipher.update(value, "utf8"),
    cipher.final(),
  ]);

  const tag = cipher.getAuthTag();

  return [
    iv.toString("hex"),
    tag.toString("hex"),
    encrypted.toString("hex"),
  ].join(":");
}

function normalizeMyNumber(value: string) {
  return value.replace(/[^0-9]/g, "");
}

function getStatusLabel(status: string) {
  if (status === "APPROVED") {
    return "確認済";
  }

  if (status === "REJECTED") {
    return "差戻し";
  }

  return "未確認";
}

function getStatusClass(status: string) {
  if (status === "APPROVED") {
    return "bg-green-100 text-green-800";
  }

  if (status === "REJECTED") {
    return "bg-red-100 text-red-800";
  }

  return "bg-yellow-100 text-yellow-800";
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
    redirect("/mypage");
  }

  return { session, employee };
}

export default async function MyNumberPage({
  searchParams,
}: Props) {
  const { employee } = await getCurrentEmployee();
  const params = await searchParams;

  const myNumber =
    await prisma.employeeMyNumber.findUnique({
      where: {
        employeeId: employee.id,
      },
    });

  async function saveMyNumber(formData: FormData) {
    "use server";

    const { session, employee: currentEmployee } =
      await getCurrentEmployee();

    const rawNumber = String(
      formData.get("myNumber") ?? "",
    ).trim();

    const normalizedNumber =
      normalizeMyNumber(rawNumber);

    if (normalizedNumber.length !== 12) {
      redirect("/mypage/my-number?error=invalid");
    }

    const encryptedNumber =
      encryptMyNumber(normalizedNumber);

    const saved =
      await prisma.employeeMyNumber.upsert({
        where: {
          employeeId: currentEmployee.id,
        },
        update: {
          encryptedNumber,
          status: "PENDING",
          reviewComment: null,
          verifiedAt: null,
          verifiedBy: null,
        },
        create: {
          employeeId: currentEmployee.id,
          encryptedNumber,
          status: "PENDING",
        },
      });

    await logAudit({
      userId: session.user.id,
      userName: session.user.name ?? "従業員",
      action: "MY_NUMBER_SUBMITTED",
      targetType: "EmployeeMyNumber",
      targetId: saved.id,
      description: "マイナンバーを提出しました",
    });

    revalidatePath("/mypage/my-number");
    redirect("/mypage/my-number?updated=1");
  }

  return (
    <main className="mx-auto max-w-3xl p-8">
      <Link
        href="/mypage"
        className="text-sm text-blue-600 hover:underline"
      >
        ← マイページへ戻る
      </Link>

      <h1 className="mt-4 text-3xl font-bold">
        マイナンバー管理
      </h1>

      {params?.updated === "1" && (
        <div className="mt-4 rounded bg-green-50 p-4 text-sm text-green-800">
          マイナンバーを提出しました（確認待ち）
        </div>
      )}

      {params?.error === "invalid" && (
        <div className="mt-4 rounded bg-red-50 p-4 text-sm text-red-800">
          マイナンバーは半角数字12桁で入力してください。
        </div>
      )}

      <div className="mt-6 rounded border p-4">
        <div className="flex items-center justify-between">
          <span className="font-semibold">提出状態:</span>
          <span
            className={`rounded px-2.5 py-1 text-xs font-medium ${getStatusClass(
              myNumber?.status ?? "PENDING",
            )}`}
          >
            {getStatusLabel(myNumber?.status ?? "")}
          </span>
        </div>

        {myNumber?.reviewComment && (
          <div className="mt-3 rounded border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            <p className="font-semibold">差戻し理由:</p>
            <p>{myNumber.reviewComment}</p>
          </div>
        )}
      </div>

      <form action={saveMyNumber} className="mt-6 space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium">
            マイナンバー（個人番号 12桁）
          </label>

          <MyNumberInput />
        </div>

        <button
          type="submit"
          className="rounded bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
        >
          保存する
        </button>
      </form>
    </main>
  );
}
