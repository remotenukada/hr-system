"use client";

import { useEffect, useRef, useState } from "react";

const ACCEPTED_FILE_TYPES =
  "application/pdf,image/jpeg,image/png,image/webp";

type DocumentRule = {
  id: string;
  documentName: string;
  required: boolean;
  sortOrder: number;
};

type CertificationOption = {
  id: string;
  name: string;
  expiryManaged: boolean;
  documentRules: DocumentRule[];
};

type Props = {
  certifications: CertificationOption[];
};

export default function CertificationAttachmentFields({
  certifications,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [documentRules, setDocumentRules] = useState<DocumentRule[]>([]);
  const [usesNewCertificationName, setUsesNewCertificationName] =
    useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const form = container?.closest("form");

    if (!form) {
      return;
    }

    const select = form.querySelector<HTMLSelectElement>(
      'select[name="certificationId"]',
    );

    const newNameInput = form.querySelector<HTMLInputElement>(
      'input[name="newCertificationName"]',
    );

    const update = () => {
      const newName = (newNameInput?.value ?? "").trim();
      const selectedCertificationId = select?.value ?? "";

      if (newName) {
        setUsesNewCertificationName(true);
        setDocumentRules([]);
        return;
      }

      setUsesNewCertificationName(false);

      const selectedCertification = certifications.find(
        (certification) =>
          certification.id === selectedCertificationId,
      );

      setDocumentRules(
        selectedCertification?.documentRules ?? [],
      );
    };

    update();

    select?.addEventListener("change", update);
    newNameInput?.addEventListener("input", update);

    return () => {
      select?.removeEventListener("change", update);
      newNameInput?.removeEventListener("input", update);
    };
  }, [certifications]);

  return (
    <div ref={containerRef}>
      {!usesNewCertificationName && documentRules.length > 0 ? (
        <div className="rounded border border-blue-200 bg-blue-50 p-4">
          <p className="mb-3 text-sm font-bold text-blue-900">
            この資格の必要書類
          </p>

          <div className="space-y-3">
            {documentRules.map((rule, index) => (
              <div key={rule.id}>
                <label className="mb-1 block text-sm font-medium">
                  {index + 1}. {rule.documentName}
                  {rule.required && (
                    <span className="ml-1 text-red-600">必須</span>
                  )}
                </label>

                <input
                  type="file"
                  name={`documentRuleFile:${rule.id}`}
                  accept={ACCEPTED_FILE_TYPES}
                  required={rule.required}
                  className="w-full rounded border bg-white p-2"
                />
              </div>
            ))}
          </div>

          <p className="mt-3 text-xs text-blue-800">
            必須と表示された書類を添付してください。
            各ファイルは5MB以下にしてください。
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
            PDF、JPG、PNG、WebPを複数添付できます。
            1ファイル最大5MBです。
          </p>
        </div>
      )}
    </div>
  );
}
