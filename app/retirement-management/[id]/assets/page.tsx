import BackLink from "@/components/BackLink";
import { saveLoanedAssets } from "@/app/actions/loaned-assets";
import { prisma } from "@/lib/prisma";

type Props = {
  params: Promise<{ id: string }>;
};

const DEFAULT_ASSETS = [
  "ノートPC",
  "社用スマホ",
  "ICカード",
  "ロッカー鍵",
  "制服",
  "名札",
];

export default async function LoanedAssetsPage({
  params,
}: Props) {
  const { id } = await params;

  let assets = await prisma.loanedAsset.findMany({
    where: { employeeId: id },
    orderBy: { createdAt: "asc" },
  });

  if (assets.length === 0) {
    await prisma.loanedAsset.createMany({
      data: DEFAULT_ASSETS.map((assetName) => ({
        employeeId: id,
        assetName,
      })),
    });

    assets = await prisma.loanedAsset.findMany({
      where: { employeeId: id },
      orderBy: { createdAt: "asc" },
    });
  }

  return (
    <main className="mx-auto max-w-4xl p-6">
      <BackLink
        href={`/retirement-management/${id}`}
        label="退職手続チェックリストに戻る"
      />

      <h1 className="mb-6 text-2xl font-bold">
        貸与物返却管理
      </h1>

      <form action={saveLoanedAssets}>
        <input
          type="hidden"
          name="employeeId"
          value={id}
        />

        <div className="rounded-lg border bg-white p-6">
          <div className="space-y-4">
            {assets.map((asset) => (
              <label
                key={asset.id}
                className="flex items-center gap-3"
              >
                <input
                  type="checkbox"
                  name={asset.assetName}
                  defaultChecked={asset.returned}
                  className="h-5 w-5"
                />

                <span className="font-medium">
                  {asset.assetName}
                </span>

                {asset.returned && (
                  <span className="text-sm text-green-600">
                    返却済
                  </span>
                )}
              </label>
            ))}
          </div>

          <div className="mt-6">
            <label className="mb-2 block text-sm font-medium">
              返却確認者
            </label>

            <input
              type="text"
              name="returnedBy"
              className="w-full rounded border p-2"
              placeholder="総務部 山田太郎"
            />
          </div>

          <div className="mt-4">
            <label className="mb-2 block text-sm font-medium">
              備考
            </label>

            <textarea
              name="memo"
              rows={4}
              className="w-full rounded border p-2"
              placeholder="備考を入力"
            />
          </div>

          <button
            type="submit"
            className="mt-6 rounded bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
          >
            保存
          </button>
        </div>
      </form>
    </main>
  );
}
