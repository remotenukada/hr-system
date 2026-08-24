import Link from "next/link";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

type Props = {
  searchParams: Promise<{
    error?: string;
    success?: string;
  }>;
};

function formatDate(date: Date) {
  return date.toLocaleDateString("ja-JP");
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

  return employee;
}

export default async function ProfileChangePage({
  searchParams,
}: Props) {
  const employee = await getCurrentEmployee();
  const params = await searchParams;

  const requests = await prisma.profileChangeRequest.findMany({
    where: {
      employeeId: employee.id,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 10,
  });

  async function submitProfileChange(formData: FormData) {
    "use server";

    const currentEmployee = await getCurrentEmployee();

    const newAddress = String(
      formData.get("newAddress") ?? "",
    ).trim();

    const newPhoneNumber = String(
      formData.get("newPhoneNumber") ?? "",
    ).trim();

    const newEmail = String(
      formData.get("newEmail") ?? "",
    ).trim();

    const newEmergencyContact = String(
      formData.get("newEmergencyContact") ?? "",
    ).trim();

    const hasChange =
      newAddress ||
      newPhoneNumber ||
      newEmail ||
      newEmergencyContact;

    if (!hasChange) {
      redirect("/mypage/profile-change?error=empty");
    }

    await prisma.profileChangeRequest.create({
      data: {
        employeeId: currentEmployee.id,
        currentAddress: currentEmployee.address,
        newAddress: newAddress || null,
        currentPhoneNumber: currentEmployee.phoneNumber,
        newPhoneNumber: newPhoneNumber || null,
        currentEmail: currentEmployee.email,
        newEmail: newEmail || null,
        currentEmergencyContact: currentEmployee.emergencyContact,
        newEmergencyContact: newEmergencyContact || null,
      },
    });

    revalidatePath("/mypage/profile-change");

    redirect("/mypage/profile-change?success=created");
  }

  return (
    <main className="mx-auto max-w-4xl p-8">
      <div className="mb-6">
        <Link
          href="/mypage"
          className="text-sm text-blue-600 hover:underline"
        >
          ← マイページへ戻る
        </Link>

        <h1 className="mt-2 text-3xl font-bold">
          プロフィール変更申請
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          住所、電話番号、メールアドレス、緊急連絡先の変更を申請できます。
        </p>
      </div>

      {params.error === "empty" && (
        <div className="mb-4 rounded border border-red-300 bg-red-50 p-3 text-sm text-red-700">
          変更したい項目を1つ以上入力してください。
        </div>
      )}

      {params.success === "created" && (
        <div className="mb-4 rounded border border-green-300 bg-green-50 p-3 text-sm text-green-700">
          プロフィール変更申請を送信しました。
        </div>
      )}

      <section className="mb-8 rounded border bg-white p-6">
        <h2 className="mb-4 text-xl font-bold">
          現在の登録情報
        </h2>

        <dl className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <dt className="text-sm font-medium text-gray-500">
              住所
            </dt>
            <dd>{employee.address ?? "-"}</dd>
          </div>

          <div>
            <dt className="text-sm font-medium text-gray-500">
              電話番号
            </dt>
            <dd>{employee.phoneNumber ?? "-"}</dd>
          </div>

          <div>
            <dt className="text-sm font-medium text-gray-500">
              メールアドレス
            </dt>
            <dd>{employee.email}</dd>
          </div>

          <div>
            <dt className="text-sm font-medium text-gray-500">
              緊急連絡先
            </dt>
            <dd>{employee.emergencyContact ?? "-"}</dd>
          </div>
        </dl>
      </section>

      <section className="mb-8 rounded border bg-white p-6">
        <h2 className="mb-4 text-xl font-bold">
          変更申請
        </h2>

        <form action={submitProfileChange} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">
              変更後住所
            </label>
            <input
              name="newAddress"
              className="w-full rounded border p-2"
              placeholder="変更がある場合のみ入力"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              変更後電話番号
            </label>
            <input
              name="newPhoneNumber"
              className="w-full rounded border p-2"
              placeholder="変更がある場合のみ入力"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              変更後メールアドレス
            </label>
            <input
              type="email"
              name="newEmail"
              className="w-full rounded border p-2"
              placeholder="変更がある場合のみ入力"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              変更後緊急連絡先
            </label>
            <input
              name="newEmergencyContact"
              className="w-full rounded border p-2"
              placeholder="変更がある場合のみ入力"
            />
          </div>

          <button
            type="submit"
            className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            申請する
          </button>
        </form>
      </section>

      <section className="rounded border bg-white p-6">
        <h2 className="mb-4 text-xl font-bold">
          申請履歴
        </h2>

        {requests.length === 0 ? (
          <p className="text-sm text-gray-500">
            プロフィール変更申請はまだありません。
          </p>
        ) : (
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b bg-gray-50 text-left">
                <th className="p-2">申請日</th>
                <th className="p-2">状態</th>
                <th className="p-2">住所</th>
                <th className="p-2">電話</th>
                <th className="p-2">メール</th>
                <th className="p-2">緊急連絡先</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((request) => (
                <tr key={request.id} className="border-b">
                  <td className="p-2">
                    {formatDate(request.createdAt)}
                  </td>
                  <td className="p-2">
                    {request.status}
                  </td>
                  <td className="p-2">
                    {request.newAddress ?? "-"}
                  </td>
                  <td className="p-2">
                    {request.newPhoneNumber ?? "-"}
                  </td>
                  <td className="p-2">
                    {request.newEmail ?? "-"}
                  </td>
                  <td className="p-2">
                    {request.newEmergencyContact ?? "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </main>
  );
}
