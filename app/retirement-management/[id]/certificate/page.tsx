type Props = {
  params: Promise<{ id: string }>;
};

export default async function RetirementCertificatePage({
  params,
}: Props) {
  const { id } = await params;

  return (
    <main className="mx-auto max-w-3xl p-6">
      <h1 className="mb-6 text-2xl font-bold">
        退職証明書
      </h1>

      <p className="mb-6 text-gray-500">
        社員ID: {id}
      </p>

      <div className="rounded-lg border bg-white p-6">
        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">
              証明書発行日
            </label>
            <input
              type="date"
              className="w-full rounded border p-2"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              退職日
            </label>
            <input
              type="date"
              className="w-full rounded border p-2"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              退職理由
            </label>
            <textarea
              rows={3}
              className="w-full rounded border p-2"
            />
          </div>

          <button
            className="rounded bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
          >
            PDF発行
          </button>
        </div>
      </div>
    </main>
  );
}
