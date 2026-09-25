import Link from "next/link";
import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

function formatDate(value: Date) {
  return new Date(value).toLocaleDateString("ja-JP");
}

export default async function MyDocumentsPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const employee = await prisma.employee.findUnique({
    where: {
      userId: session.user.id,
    },
    include: {
      personalDocuments: {
        where: {
          publishAt: {
            lte: new Date(),
          },
        },
        orderBy: [
          { targetYear: "desc" },
          { targetMonth: "desc" },
          { publishAt: "desc" },
        ],
      },
    },
  });

  if (!employee) {
    redirect("/mypage");
  }

  return (
    <main className="mx-auto max-w-5xl p-8">
      <Link href="/" className="text-sm text-blue-600 underline">
        ← ダッシュボードへ戻る
      </Link>

      <h1 className="mt-4 text-3xl font-bold">給与明細</h1>

      <p className="mt-2 text-sm text-gray-600">
        公開済みの給与明細を閲覧できます。
      </p>

      <div className="mt-6 space-y-3">
        {employee.personalDocuments.map((document) => (
          <div
            key={document.id}
            className="flex items-center justify-between rounded border bg-white p-4 shadow-sm"
          >
            <div>
              <p className="font-semibold">{document.title}</p>
              <p className="mt-1 text-sm text-gray-500">
                公開日: {formatDate(document.publishAt)}
              </p>
            </div>

            <a
              href={`/api/personal-documents/${document.id}`}
              target="_blank"
              rel="noreferrer"
              className="rounded bg-blue-600 px-3 py-1.5 text-sm text-white"
            >
              PDFを表示
            </a>
          </div>
        ))}

        {employee.personalDocuments.length === 0 && (
          <div className="rounded border bg-white p-8 text-center text-gray-500">
            現在閲覧できる給与明細はありません。
          </div>
        )}
      </div>
    </main>
  );
}
