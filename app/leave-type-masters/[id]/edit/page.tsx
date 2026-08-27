import { updateLeaveTypeMaster } from "@/app/actions/leave-type-master";
import BackLink from "@/components/BackLink";
import { prisma } from "@/lib/prisma";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditLeaveTypeMasterPage({
  params,
}: Props) {
  const { id } = await params;

  const item = await prisma.leaveType.findUnique({
    where: { id },
  });

  if (!item) {
    return <main className="p-8">休暇種別が見つかりません。</main>;
  }

  return (
    <main className="mx-auto max-w-2xl p-6">
      <BackLink href="/leave-type-masters" />

      <h1 className="mb-6 text-2xl font-bold">休暇種別編集</h1>

      <form action={updateLeaveTypeMaster} className="space-y-4">
        <input type="hidden" name="id" value={item.id} />

        <div>
          <label className="mb-1 block text-sm font-medium">コード</label>
          <input
            name="code"
            defaultValue={item.code}
            required
            className="w-full rounded border p-2 uppercase"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">名称</label>
          <input
            name="name"
            defaultValue={item.name}
            required
            className="w-full rounded border p-2"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">説明</label>
          <textarea
            name="description"
            defaultValue={item.description ?? ""}
            rows={3}
            className="w-full rounded border p-2"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">失効月数</label>
          <input
            name="expirationMonths"
            type="number"
            min="0"
            defaultValue={item.expirationMonths ?? ""}
            className="w-full rounded border p-2"
          />
          <p className="mt-1 text-xs text-gray-500">
            空欄の場合は失効期限なし
          </p>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">表示順</label>
          <input
            name="sortOrder"
            type="number"
            defaultValue={item.sortOrder}
            required
            className="w-full rounded border p-2"
          />
        </div>

        <div className="space-y-2 pt-2">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="isPaid"
              defaultChecked={item.isPaid}
              className="h-4 w-4 rounded border-gray-300"
            />
            <span className="text-sm font-medium">有給扱い</span>
          </label>

          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="allowRequest"
              defaultChecked={item.allowRequest}
              className="h-4 w-4 rounded border-gray-300"
            />
            <span className="text-sm font-medium">申請を許可</span>
          </label>

          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="manageBalance"
              defaultChecked={item.manageBalance}
              className="h-4 w-4 rounded border-gray-300"
            />
            <span className="text-sm font-medium">残高管理を行う</span>
          </label>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            更新する
          </button>
        </div>
      </form>
    </main>
  );
}
