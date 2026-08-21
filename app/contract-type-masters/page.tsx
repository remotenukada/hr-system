import { prisma } from "@/lib/prisma";
import Link from "next/link";
import {
  deleteContractTypeMaster,
  toggleContractTypeMaster,
} from "@/app/actions/contract-type-master";

export default async function ContractTypeMastersPage() {
  const items =
    await prisma.contractTypeMaster.findMany({
      orderBy: {
        sortOrder: "asc",
      },
    });

  return (
    <main className="mx-auto max-w-4xl p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          契約区分マスタ
        </h1>

        <a
          href="/contract-type-masters/new"
          className="rounded bg-blue-600 px-4 py-2 text-sm text-white"
        >
          新規登録
        </a>
      </div>

      <table className="min-w-full text-sm">
        <thead>
          <tr>
            <th className="border p-2 text-left">
              名称
            </th>
            <th className="border p-2 text-left">
              状態
            </th>

            <th className="border p-2 text-left">
              操作
            </th>
          </tr>
        </thead>

        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td className="border p-2">
                {item.name}
              </td>

              <td className="border p-2">
                {item.isActive ? "有効" : "無効"}
              </td>

              <td className="border p-2">
                <div className="flex gap-3">

                  <Link
                    href={`/contract-type-masters/${item.id}/edit`}
                    className="text-blue-600 hover:underline"
                  >
                    編集
                  </Link>

                  <form action={toggleContractTypeMaster}>
                    <input
                      type="hidden"
                      name="id"
                      value={item.id}
                    />

                    <button
                      type="submit"
                      className="text-green-600 hover:underline"
                    >
                      {item.isActive ? "無効化" : "有効化"}
                    </button>
                  </form>

                  <form action={deleteContractTypeMaster}>
                    <input
                      type="hidden"
                      name="id"
                      value={item.id}
                    />

                    <button
                      type="submit"
                      className="text-red-600 hover:underline"
                    >
                      削除
                    </button>
                  </form>

                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
