import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { updateWorkScheduleMaster } from "@/app/actions/work-schedule-master";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditWorkScheduleMasterPage(
  { params }: Props,
) {
  const { id } = await params;

  const schedule =
    await prisma.workScheduleMaster.findUnique({
      where: { id },
    });

  if (!schedule) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-2xl p-6">
      <h1 className="mb-6 text-2xl font-bold">
        勤務帯編集
      </h1>

      <form
        action={updateWorkScheduleMaster}
        className="space-y-4"
      >
        <input
          type="hidden"
          name="id"
          value={schedule.id}
        />

        <div>
          <label className="block text-sm font-medium">名称</label>
          <input
            name="name"
            defaultValue={schedule.name}
            className="w-full rounded border p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">開始時刻</label>
          <input
            type="time"
            name="startTime"
            defaultValue={schedule.startTime}
            className="w-full rounded border p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">終了時刻</label>
          <input
            type="time"
            name="endTime"
            defaultValue={schedule.endTime}
            className="w-full rounded border p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">休憩時間（分）</label>
          <input
            type="number"
            name="breakMinutes"
            defaultValue={schedule.breakMinutes}
            className="w-full rounded border p-2"
          />
        </div>

        <button
          type="submit"
          className="rounded bg-blue-600 px-4 py-2 text-white"
        >
          保存
        </button>
      </form>
    </main>
  );
}
