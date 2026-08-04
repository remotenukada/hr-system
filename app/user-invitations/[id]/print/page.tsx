import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth-guard";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function InvitationPrintPage({
  params,
}: Props) {
  await requireAdmin();

  const { id } = await params;

  const invitation = await prisma.userInvitation.findUnique({
    where: {
      id,
    },
  });

  if (!invitation) {
    notFound();
  }

  const registerPath = `/register/${invitation.token}`;
  const qrPath = `/api/user-invitations/${invitation.id}/qr`;

  return (
    <main className="mx-auto max-w-3xl bg-white p-8 print:max-w-none print:p-0">
      <div className="mb-6 flex items-center justify-between print:hidden">
        <Link
          href="/user-invitations"
          className="text-sm text-blue-600 hover:underline"
        >
          ← 招待一覧へ戻る
        </Link>

        <a
          href="javascript:window.print()"
          className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          印刷する
        </a>
      </div>

      <section className="rounded border p-8 print:border-0">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">
            入職前 本人登録のご案内
          </h1>

          <p className="mt-3 text-sm text-gray-600">
            下記QRコードを読み取り、本人情報とログインパスワードを登録してください。
          </p>
        </div>

        <div className="mb-8 rounded border bg-gray-50 p-4 text-sm">
          <p>
            <strong>社員番号:</strong> {invitation.employeeNo}
          </p>

          <p>
            <strong>氏名:</strong> {invitation.lastName} {invitation.firstName}
          </p>

          <p>
            <strong>メールアドレス:</strong> {invitation.email}
          </p>

          <p>
            <strong>入職予定日:</strong>{" "}
            {invitation.expectedHireDate
              ? invitation.expectedHireDate.toLocaleDateString("ja-JP")
              : "-"}
          </p>

          <p>
            <strong>登録期限:</strong>{" "}
            {invitation.expiresAt.toLocaleDateString("ja-JP")}
          </p>
        </div>

        <div className="mb-8 text-center">
          <img
            src={qrPath}
            alt="招待QRコード"
            className="mx-auto h-64 w-64"
          />

          <p className="mt-4 break-all rounded bg-gray-50 p-3 text-xs text-gray-600">
            {registerPath}
          </p>
        </div>

        <div className="rounded border p-4 text-sm">
          <h2 className="mb-3 text-lg font-semibold">
            登録手順
          </h2>

          <ol className="list-decimal space-y-2 pl-5">
            <li>スマートフォンでQRコードを読み取ります。</li>
            <li>本人情報を入力します。</li>
            <li>ログイン用パスワードを設定します。</li>
            <li>登録完了後、ログイン画面から利用できます。</li>
          </ol>
        </div>

        <p className="mt-8 text-xs text-gray-500">
          この用紙は本人登録専用です。第三者に共有しないでください。
        </p>
      </section>
    </main>
  );
}
