"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteDocumentButton({ id }: { id: string }) {
  const [deleting, setDeleting] = useState(false);
  const router = useRouter();

  async function handleDelete() {
    if (!confirm("この文書を削除してもよろしいですか？")) return;

    setDeleting(true);
    try {
      const res = await fetch("/api/employee-documents/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (!res.ok) {
        const data = await res.json();
        alert(data.error ?? "削除に失敗しました。");
        return;
      }

      router.refresh();
    } catch {
      alert("削除処理中にエラーが発生しました。");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={deleting}
      className="ml-3 text-sm text-red-600 hover:underline disabled:opacity-50"
    >
      {deleting ? "削除中..." : "削除"}
    </button>
  );
}
