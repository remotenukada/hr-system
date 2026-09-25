"use client";

import { FormEvent, useState } from "react";

type UploadResult = {
  message: string;
  successCount: number;
  failedCount: number;
  failures: string[];
};

export default function PersonalDocumentZipUploadForm() {
  const [loading, setLoading] = useState(false);
  const [documentType, setDocumentType] = useState("PAYSLIP");
  const [result, setResult] = useState<UploadResult | null>(null);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setResult(null);
    setError("");

    const formData = new FormData(event.currentTarget);

    try {
      const response = await fetch("/api/employee-documents/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error ?? "アップロードに失敗しました。");
      }

      setResult(data);
    } catch (cause) {
      setError(
        cause instanceof Error
          ? cause.message
          : "アップロードに失敗しました。",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-lg border bg-white p-6 shadow-sm"
    >
      <div className="rounded border border-blue-200 bg-blue-50 p-4 text-sm">
        ZIP内のPDF名を職員番号と完全一致させてください。
        <div className="mt-2 font-mono">
          EMP0001.pdf / EMP0002.pdf
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="text-sm md:col-span-2">
          文書区分
          <select
            name="documentType"
            value={documentType}
            onChange={(event) =>
              setDocumentType(event.target.value)
            }
            required
            className="mt-1 w-full rounded border bg-white p-2"
          >
            <option value="PAYSLIP">給与明細</option>
            <option value="WITHHOLDING">源泉徴収票</option>
            <option value="INSURANCE">社会保険通知</option>
          </select>
        </label>
        <label className="text-sm">
          対象年
          <input
            type="number"
            name="targetYear"
            required
            min="2000"
            max="2100"
            defaultValue={new Date().getFullYear()}
            className="mt-1 w-full rounded border p-2"
          />
        </label>

        <label className="text-sm">
          対象月
          <input
            type="number"
            name="targetMonth"
            required={documentType === "PAYSLIP"}
            min="1"
            max="12"
            defaultValue={new Date().getMonth() + 1}
            className="mt-1 w-full rounded border p-2"
          />
        </label>

        <label className="text-sm">
          公開日（給与日）
          <input
            type="date"
            name="publishAt"
            required
            className="mt-1 w-full rounded border p-2"
          />
        </label>

        <label className="text-sm">
          文書タイトル
          <input
            name="title"
            placeholder="未入力の場合は年月から自動生成"
            className="mt-1 w-full rounded border p-2"
          />
        </label>
      </div>

      <label className="block text-sm">
        個人文書ZIP
        <input
          type="file"
          name="zipFile"
          accept=".zip,application/zip"
          required
          className="mt-1 block w-full rounded border p-2"
        />
      </label>

      <button
        type="submit"
        disabled={loading}
        className="rounded bg-blue-600 px-5 py-2 text-white disabled:opacity-50"
      >
        {loading ? "処理中..." : "一括アップロード"}
      </button>

      {error && (
        <div className="rounded border border-red-200 bg-red-50 p-4 text-red-700">
          {error}
        </div>
      )}

      {result && (
        <div className="rounded border border-green-200 bg-green-50 p-4">
          <p className="font-semibold">{result.message}</p>
          <p className="mt-2 text-sm">
            成功: {result.successCount}件 / 失敗: {result.failedCount}件
          </p>

          {result.failures.length > 0 && (
            <ul className="mt-3 list-disc pl-6 text-sm text-red-700">
              {result.failures.map((failure) => (
                <li key={failure}>{failure}</li>
              ))}
            </ul>
          )}
        </div>
      )}
    </form>
  );
}
