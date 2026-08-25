import BackLink from "@/components/BackLink";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EmploymentCertificatePage({
  params,
}: Props) {
  const { id } = await params;

  return (
    <main className="mx-auto max-w-3xl p-6">
      {`/employees/${id}`}

      <h1 className="mb-6 text-2xl font-bold">
        在職証明書
      </h1>

      <div className="rounded-lg border bg-white p-6">
        <a href={`/employment-certificates/${id}/pdf`}></a>
      </div>
    </main>
  );
}
