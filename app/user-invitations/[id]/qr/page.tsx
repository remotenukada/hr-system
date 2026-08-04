import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth-guard";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function InvitationQrPage({
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
  const qrImagePath = `/api/user-invitations/${invitation.id}/qr`;

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
          招待QRコード
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          雇用予定者がスマートフォンで読み取り、本人登録を行えます。
        </p>
      </div>

      <section className="rounded border bg-white p-6 text-center shadow-sm">
        <div className="mb-4 text-left text-sm text-gray-700">
          <p>
            <strong>社員番号:</strong> {invitation.employeeNo}
          </p>
          <p>
            <strong>氏名:</strong> {invitation.lastName} {invitation.firstName}
          </p>
          <p>
            <strong>メール:</strong> {invitation.email}
          </p>
          <p>
            <strong>登録期限:</strong>{" "}
            {invitation.expiresAt.toLocaleDateString("ja-JP")}
          </p>
        </div>

        <div className="inline-block rounded border bg-white p-4">
          <img
            src={qrImagePath}
            alt="招待登録用QRコード"
            width={320}
            height={320}
            className="h-64 w-64"
          />
        </div>

        <div className="mt-6">
          <Link
            href={registerPath}
            className="inline-block rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            登録画面を開く
          </Link>
        </div>

        <p className="mt-4 break-all rounded bg-gray-50 p-3 text-xs text-gray-500">
          {registerPath}
        </p>
      </section>
    </main>
  );
}
