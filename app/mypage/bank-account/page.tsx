import Link from "next/link";
import BankTypeFields from "@/components/BankTypeFields";
import path from "path";
import { randomUUID } from "crypto";
import { mkdir, unlink, writeFile } from "fs/promises";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { logAudit } from "@/lib/audit-log";

const allowedFileTypes = [
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/webp",
];

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

  return employee;
}

export default async function BankAccountPage() {
  const employee = await getCurrentEmployee();

  const bankAccount = await prisma.employeeBankAccount.findUnique({
    where: {
      employeeId: employee.id,
    },
    include: {
      attachments: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  async function saveBankAccount(formData: FormData) {
    "use server";

    const currentEmployee = await getCurrentEmployee();

    const bankName = String(formData.get("bankName") ?? "").trim();
    const branchName = String(formData.get("branchName") ?? "").trim();
    const accountType = String(formData.get("accountType") ?? "").trim();
    const accountNumber = String(formData.get("accountNumber") ?? "").trim();
    const accountHolder = String(formData.get("accountHolder") ?? "").trim();

    const bankType = String(
      formData.get("bankType") ?? "BANK",
    ).trim();

    const yuchoSymbol = String(
      formData.get("yuchoSymbol") ?? "",
    ).trim();

    const yuchoNumber = String(
      formData.get("yuchoNumber") ?? "",
    ).trim();

    if (
      !bankName ||
      !branchName ||
      !accountType ||
      !accountNumber ||
      !accountHolder
    ) {
      redirect("/mypage/bank-account?error=required");
    }

    await prisma.employeeBankAccount.upsert({
      where: {
        employeeId: currentEmployee.id,
      },
      update: {
        bankName,
        branchName,
        accountType,
        accountNumber,
        accountHolder,

        bankType,
        yuchoSymbol:
          bankType === "YUCHO"
            ? yuchoSymbol
            : null,
        yuchoNumber:
          bankType === "YUCHO"
            ? yuchoNumber
            : null,

        status: "PENDING",
        reviewComment: null,
        verifiedAt: null,
        verifiedBy: null,
      },
      create: {
        employeeId: currentEmployee.id,
        bankName,
        branchName,
        accountType,
        accountNumber,
        accountHolder,

        bankType,
        yuchoSymbol:
          bankType === "YUCHO"
            ? yuchoSymbol
            : null,
        yuchoNumber:
          bankType === "YUCHO"
            ? yuchoNumber
            : null,
      },
    });


    await logAudit({
      userId: currentEmployee.userId,
      userName: `${currentEmployee.lastName} ${currentEmployee.firstName}`,
      action: "BANK_ACCOUNT_UPDATED",
      targetType: "EmployeeBankAccount",
      targetId: currentEmployee.id,
      description: "口座情報更新",
      afterData: {
        bankName,
        branchName,
        accountType,
        bankType,
      },
    });

    revalidatePath("/mypage/bank-account");
    revalidatePath("/mypage");
    redirect("/mypage/bank-account?updated=1");
  }

  async function uploadBankAttachments(formData: FormData) {
    "use server";

    const currentEmployee = await getCurrentEmployee();

    const currentBankAccount =
      await prisma.employeeBankAccount.findUnique({
        where: {
          employeeId: currentEmployee.id,
        },
      });

    if (!currentBankAccount) {
      redirect("/mypage/bank-account?error=noBankAccount");
    }

    const files = formData.getAll("bankFiles");

    for (const file of files) {
      if (!(file instanceof File) || file.size === 0) {
        continue;
      }

      if (!allowedFileTypes.includes(file.type)) {
        redirect("/mypage/bank-account?error=invalidFile");
      }

      if (file.size > 5 * 1024 * 1024) {
        redirect("/mypage/bank-account?error=fileTooLarge");
      }

      const extension =
        path.extname(file.name).toLowerCase() ||
        (file.type === "application/pdf" ? ".pdf" : ".jpg");

      const uploadDir = path.join(
        process.cwd(),
        "public",
        "uploads",
        "bank-accounts",
      );

      await mkdir(uploadDir, {
        recursive: true,
      });

      const storedFileName =
        `${currentEmployee.id}-${randomUUID()}${extension}`;

      const filePath = path.join(uploadDir, storedFileName);

      const bytes = await file.arrayBuffer();
      await writeFile(filePath, Buffer.from(bytes));

      await prisma.employeeBankAttachment.create({
        data: {
          bankAccountId: currentBankAccount.id,
          fileName: file.name,
          filePath: `/uploads/bank-accounts/${storedFileName}`,
          fileType: file.type,
          fileSize: file.size,
        },
      });
    }

    revalidatePath("/mypage/bank-account");
    redirect("/mypage/bank-account?uploaded=1");
  }

  async function deleteBankAttachment(formData: FormData) {
    "use server";

    const currentEmployee = await getCurrentEmployee();

    const attachmentId = String(
      formData.get("attachmentId") ?? "",
    ).trim();

    if (!attachmentId) {
      redirect("/mypage/bank-account");
    }

    const attachment =
      await prisma.employeeBankAttachment.findFirst({
        where: {
          id: attachmentId,
          bankAccount: {
            employeeId: currentEmployee.id,
          },
        },
      });

    if (!attachment) {
      redirect("/mypage/bank-account");
    }

    if (
      attachment.filePath.startsWith("/uploads/bank-accounts/")
    ) {
      const relativePath = attachment.filePath.replace(/^\/+/, "");

      await unlink(
        path.join(process.cwd(), "public", relativePath),
      ).catch(() => {});
    }

    await prisma.employeeBankAttachment.delete({
      where: {
        id: attachment.id,
      },
    });

    revalidatePath("/mypage/bank-account");
    redirect("/mypage/bank-account?deleted=1");
  }

  return (
    <main className="mx-auto max-w-4xl p-8">
      <div className="mb-4">
        <Link
          href="/mypage"
          className="text-sm text-blue-600 hover:underline"
        >
          ← マイページへ戻る
        </Link>
      </div>

      <h1 className="text-3xl font-bold">
        口座情報管理
      </h1>

      <p className="mt-2 text-sm text-gray-600">
        給与振込等に使用する口座情報と確認書類を登録できます。
      </p>

      {bankAccount && (
        <div className="mt-6 rounded-lg border bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold">
            登録済み口座情報
          </h2>

          <div className="mb-4">
            <span className="font-semibold">
              状態:
            </span>{" "}

            {bankAccount.status === "APPROVED" ? (
              <span className="rounded bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                確認済
              </span>
            ) : bankAccount.status === "REJECTED" ? (
              <span className="rounded bg-red-100 px-2 py-1 text-xs font-medium text-red-800">
                差戻し
              </span>
            ) : (
              <span className="rounded bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800">
                未確認
              </span>
            )}
          </div>

          {bankAccount.status === "REJECTED" &&
            bankAccount.reviewComment && (
              <div className="mb-4 rounded border border-red-200 bg-red-50 p-3">
                <p className="font-semibold text-red-700">
                  差戻し理由
                </p>

                <p className="mt-1 text-sm text-red-600">
                  {bankAccount.reviewComment}
                </p>
              </div>
            )}

          <dl className="grid grid-cols-1 gap-4 text-sm md:grid-cols-2">
            <div>
              <dt className="font-medium text-gray-600">
                金融機関名
              </dt>
              <dd className="mt-1">
                {bankAccount.bankName}
              </dd>
            </div>

            <div>
              <dt className="font-medium text-gray-600">
                支店名
              </dt>
              <dd className="mt-1">
                {bankAccount.branchName}
              </dd>
            </div>

            <div>
              <dt className="font-medium text-gray-600">
                口座種別
              </dt>
              <dd className="mt-1">
                {bankAccount.accountType}
              </dd>
            </div>

            <div>
              <dt className="font-medium text-gray-600">
                口座番号
              </dt>
              <dd className="mt-1">
                {"*".repeat(
                  Math.max(
                    bankAccount.accountNumber.length - 4,
                    0,
                  ),
                )}
                {bankAccount.accountNumber.slice(-4)}
              </dd>
            </div>

            <div className="md:col-span-2">
              <dt className="font-medium text-gray-600">
                口座名義
              </dt>
              <dd className="mt-1">
                {bankAccount.accountHolder}
              </dd>
            </div>


            {bankAccount.bankType === "YUCHO" && (
              <>
                <div>
                  <dt className="font-medium text-gray-600">
                    ゆうちょ記号
                  </dt>
                  <dd className="mt-1">
                    {bankAccount.yuchoSymbol ?? "-"}
                  </dd>
                </div>

                <div>
                  <dt className="font-medium text-gray-600">
                    ゆうちょ番号
                  </dt>
                  <dd className="mt-1">
                    {bankAccount.yuchoNumber ?? "-"}
                  </dd>
                </div>
              </>
            )}
          </dl>
        </div>
      )}

      <div className="mt-6 rounded-lg border bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold">
          口座情報入力
        </h2>

        <form action={saveBankAccount} className="space-y-4">
          <BankTypeFields
            defaultBankType={bankAccount?.bankType ?? "BANK"}
            defaultYuchoSymbol={bankAccount?.yuchoSymbol ?? ""}
            defaultYuchoNumber={bankAccount?.yuchoNumber ?? ""}
          />


          <div>
            <label className="mb-1 block text-sm font-medium">
              金融機関名
            </label>
            <input
              name="bankName"
              defaultValue={bankAccount?.bankName ?? ""}
              placeholder="例: 三菱UFJ銀行、ゆうちょ銀行"
              className="w-full rounded border px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              支店名
            </label>
            <input
              name="branchName"
              defaultValue={bankAccount?.branchName ?? ""}
              placeholder="例: 東京支店、〇一八店"
              className="w-full rounded border px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              口座種別
            </label>
            <select
              name="accountType"
              defaultValue={bankAccount?.accountType ?? "普通"}
              className="w-full rounded border px-3 py-2"
              required
            >
              <option value="普通">普通</option>
              <option value="当座">当座</option>
              <option value="貯蓄">貯蓄</option>
              <option value="その他">その他</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              口座番号
            </label>
            <input
              name="accountNumber"
              defaultValue={bankAccount?.accountNumber ?? ""}
              placeholder="例: 1234567"
              className="w-full rounded border px-3 py-2"
              required
            />
          </div>


          <div>
            <label className="mb-1 block text-sm font-medium">
              口座名義（カナ）
            </label>
            <input
              name="accountHolder"
              defaultValue={bankAccount?.accountHolder ?? ""}
              placeholder="例: ヤマダ タロウ"
              className="w-full rounded border px-3 py-2"
              required
            />
          </div>




          <button
            type="submit"
            className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            保存する
          </button>
        </form>
      </div>

      <div className="mt-6 rounded-lg border bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold">
          確認書類
        </h2>

        <p className="mb-4 text-sm text-gray-600">
          通帳、キャッシュカード、銀行アプリ画面、PDF等を添付できます。
          対応形式は PDF / JPG / PNG / WEBP、上限5MBです。
        </p>

        {bankAccount ? (
          <>
            <form action={uploadBankAttachments} className="space-y-4">
              <input
                type="file"
                name="bankFiles"
                multiple
                accept=".pdf,.jpg,.jpeg,.png,.webp"
                className="block w-full rounded border px-3 py-2 text-sm"
              />

              <button
                type="submit"
                className="rounded bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
              >
                添付する
              </button>
            </form>

            <div className="mt-6">
              <h3 className="mb-2 font-semibold">
                登録済み確認書類
              </h3>

              {bankAccount.attachments.length === 0 ? (
                <p className="text-sm text-gray-500">
                  添付書類はありません。
                </p>
              ) : (
                <ul className="space-y-2 text-sm">
                  {bankAccount.attachments.map((attachment) => (
                    <li
                      key={attachment.id}
                      className="flex items-center justify-between gap-3 rounded border p-2"
                    >
                      <a
                        href={attachment.filePath}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {attachment.fileName}
                      </a>

                      <form action={deleteBankAttachment}>
                        <input
                          type="hidden"
                          name="attachmentId"
                          value={attachment.id}
                        />

                        <button
                          type="submit"
                          className="rounded bg-red-50 px-2 py-1 text-xs text-red-700 hover:bg-red-100"
                        >
                          削除
                        </button>
                      </form>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </>
        ) : (
          <p className="text-sm text-gray-500">
            先に口座情報を保存すると、確認書類を添付できます。
          </p>
        )}
      </div>
    </main>
  );
}
