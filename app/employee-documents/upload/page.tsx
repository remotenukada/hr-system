import BackLink from "@/components/BackLink";
import PersonalDocumentZipUploadForm from "@/components/PersonalDocumentZipUploadForm";
import { requireHRManager } from "@/lib/auth-guard";

export default async function EmployeeDocumentUploadPage() {
  await requireHRManager();

  return (
    <main className="mx-auto max-w-4xl p-8">
      <BackLink href="/employee-documents" label="個人文書一覧へ" />

      <h1 className="mb-2 text-3xl font-bold">
        給与明細一括アップロード
      </h1>

      <p className="mb-6 text-sm text-gray-600">
        スマイルVから出力した職員別PDFをZIPにまとめて登録します。
      </p>

      <PersonalDocumentZipUploadForm />
    </main>
  );
}
