"use client";

import { FormEvent, useState } from "react";

type Employee = {
  id: string;
  employeeNo: string;
  lastName: string;
  firstName: string;
};

export default function PersonalDocumentSingleUploadForm({
  employees,
}: {
  employees: Employee[];
}) {
  const [documentType, setDocumentType] = useState("PAYSLIP");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      const response = await fetch(
        "/api/employee-documents/single-upload",
        {
          method: "POST",
          body: new FormData(event.currentTarget),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error ?? "登録に失敗しました。");
      }

      setMessage(data.message);
      event.currentTarget.reset();
      setDocumentType("PAYSLIP");
    } catch (cause) {
      setError(
        cause instanceof Error
          ? cause.message
          : "登録に失敗しました。",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 rounded border bg-white p-6 shadow-sm"
    >
      <label className="block text-sm">
        配布先職員
        <select
          name="employeeId"
          required
          defaultValue=""
          className="mt-1 w-full rounded border bg-white p-2"
        >
          <option value="" disabled>
            職員を選択してください
          </option>

          {employees.map((employee) => (
            <option key={employee.id} value={employee.id}>
              {employee.employeeNo} {employee.lastName}{" "}
              {employee.firstName}
            </option>
          ))}
        </select>
      </label>

      <label className="block text-sm">
        文書区分
        <select
          name="documentType"
          value={documentType}
          onChange={(event) =>
            setDocumentType(event.target.value)
          }
          className="mt-1 w-full rounded border bg-white p-2"
        >
          <option value="PAYSLIP">給与明細</option>
          <option value="WITHHOLDING">源泉徴収票</option>
          <option value="INSURANCE">社会保険通知</option>
        </select>
      </label>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="text-sm">
          対象年
          <input
            type="number"
            name="targetYear"
            min="2000"
            max="2100"
            required
            defaultValue={new Date().getFullYear()}
            className="mt-1 w-full rounded border p-2"
          />
        </label>

        <label className="text-sm">
          対象月
          <input
            type="number"
            name="targetMonth"
            min="1"
            max="12"
            required={documentType === "PAYSLIP"}
            className="mt-1 w-full rounded border p-2"
          />
        </label>
      </div>

      <label className="block text-sm">
        公開日
        <input
          type="date"
          name="publishAt"
          required
          className="mt-1 w-full rounded border p-2"
        />
      </label>

      <label className="block text-sm">
        タイトル
        <input
          name="title"
          placeholder="未入力の場合は自動生成"
          className="mt-1 w-full rounded border p-2"
        />
      </label>

      <label className="block text-sm">
        PDFファイル
        <input
          type="file"
          name="file"
          accept=".pdf,application/pdf"
          required
          className="mt-1 block w-full rounded border p-2"
        />
      </label>

      <button
        type="submit"
        disabled={loading || employees.length === 0}
        className="rounded bg-blue-600 px-5 py-2 text-white disabled:opacity-50"
      >
        {loading ? "登録中..." : "個別文書を登録"}
      </button>

      {message && (
        <div className="rounded border border-green-200 bg-green-50 p-3 text-green-700">
          {message}
        </div>
      )}

      {error && (
        <div className="rounded border border-red-200 bg-red-50 p-3 text-red-700">
          {error}
        </div>
      )}
    </form>
  );
}
