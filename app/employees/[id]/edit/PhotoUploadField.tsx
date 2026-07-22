"use client";

import Image from "next/image";
import { useState } from "react";

type Props = {
  initialPath?: string | null;
};

export default function PhotoUploadField({ initialPath }: Props) {
  const [photoPath, setPhotoPath] = useState(initialPath ?? "");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setUploading(true);
    setError("");

    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/api/employees/photo", {
      method: "POST",
      body: formData,
    });

    setUploading(false);

    if (!response.ok) {
      setError("アップロードに失敗しました。");
      return;
    }

    const data = await response.json();
    setPhotoPath(data.path);
  }

  return (
    <div className="space-y-3">
      <input
        type="hidden"
        name="photoPath"
        value={photoPath}
      />

      {photoPath ? (
        <div className="flex items-center gap-4">
          <Image
            src={photoPath}
            alt="プロフィール写真"
            width={96}
            height={96}
            className="h-24 w-24 rounded-lg object-cover border"
          />

          <div className="text-xs text-gray-500">
            <p>現在の写真</p>
            <p className="break-all">{photoPath}</p>
          </div>
        </div>
      ) : (
        <div className="flex h-24 w-24 items-center justify-center rounded-lg border bg-gray-50 text-xs text-gray-400">
          写真なし
        </div>
      )}

      <div>
        <input
          type="file"
          accept="image/*"
          onChange={handleChange}
          className="block w-full rounded border p-2 text-sm"
        />

        {uploading && (
          <p className="mt-1 text-xs text-blue-600">
            アップロード中...
          </p>
        )}

        {error && (
          <p className="mt-1 text-xs text-red-600">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}
