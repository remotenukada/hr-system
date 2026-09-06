"use client";

import { useEffect, useRef, useState } from "react";

export default function CertificationExpiryField() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [expiryManaged, setExpiryManaged] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const form = container?.closest("form");

    if (!form) return;

    const select = form.querySelector(
      'select[name="certificationId"]',
    ) as HTMLSelectElement | null;

    const update = () => {
      const option = select?.selectedOptions?.[0];

      setExpiryManaged(
        option?.getAttribute("data-expiry-managed") === "true",
      );
    };

    update();

    select?.addEventListener("change", update);

    return () => {
      select?.removeEventListener("change", update);
    };
  }, []);

  if (!expiryManaged) {
    return <input type="hidden" name="expiryDate" value="" />;
  }

  return (
    <div ref={containerRef}>
      <label className="mb-1 block text-sm font-medium">
        有効期限
      </label>

      <input
        type="date"
        name="expiryDate"
        required
        className="w-full rounded border p-2"
      />
    </div>
  );
}
