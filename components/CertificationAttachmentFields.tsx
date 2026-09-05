"use client";

import { useEffect, useRef, useState } from "react";

const ACCEPTED_FILE_TYPES =
  "application/pdf,image/jpeg,image/png,image/webp";

function normalizeCertificationName(value: string) {
  return value.replace(/\s+/g, "").trim();
}

export default function CertificationAttachmentFields() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDoctor, setIsDoctor] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const form = container?.closest("form");

    if (!form) {
      return;
    }

    const select =
      form.querySelector<HTMLSelectElement>(
        'select[name="certificationId"]',
      );

    const newNameInput =
      form.querySelector<HTMLInputElement>(
        'input[name="newCertificationName"]',
      );

    const update = () => {
      const selectedName =
        select?.selectedOptions[0]?.textContent ?? "";

      const enteredName = newNameInput?.value ?? "";

      const effectiveName =
        normalizeCertificationName(enteredName) ||
        normalizeCertificationName(selectedName);

      setIsDoctor(effectiveName === "医師");
    };

    update();

    select?.addEventListener("change", update);
    newNameInput?.addEventListener("input", update);

    return () => {
      select?.removeEventListener("change", update);
      newNameInput?.removeEventListener("input", update);
    };
  }, []);

  return (
    <div ref={containerRef}>
      {isDoctor ? (
        <div className="rounded border border-blue-200 bg-blue-50 p-4">
          <p className="mb-3 text-sm font-bold text-blue-900">
            医師資格の必須書類
          </p>

          <div className="space-y-3">
            <div>
              <label className="mb-1 block text-sm font-medium">
                ① 医師免許証
              </label>
              <input
                type="file"
                name="doctorLicenseFile"
                accept={ACCEPTED_FILE_TYPES}
                required
                className="w-full rounded border bg-white p-2"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">
                ② 臨床研修修了登録証
              </label>
              <input
                type="file"
                name="clinicalTrainingFile"
                accept={ACCEPTED_FILE_TYPES}
                required
                className="w-full rounded border bg-white p-2"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">
                ③ 保険医登録票
              </label>
              <input
                type="file"
                name="insuranceDoctorFile"
                accept={ACCEPTED_FILE_TYPES}
                required
                className="w-full rounded border bg-white p-2"
              />
            </div>
          </div>

          <p className="mt-3 text-xs text-blue-800">
            医師資格では3点すべて必須です。各ファイルは5MB以下にしてください。
          </p>
        </div>
      ) : (
        <div>
          <label className="mb-1 block text-sm font-medium">
            資格証・免許証ファイル
          </label>

          <input
            type="file"
            name="certificateFiles"
            accept={ACCEPTED_FILE_TYPES}
            multiple
            className="w-full rounded border p-2"
          />

          <p className="mt-1 text-xs text-gray-500">
            PDF、JPG、PNG、WebPを複数添付できます。1ファイル最大5MBです。
          </p>
        </div>
      )}
    </div>
  );
}
