"use client";

import { useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";

type Props = {
  label?: string;
  pendingLabel?: string;
};

function getFormSnapshot(form: HTMLFormElement) {
  const formData = new FormData(form);

  return JSON.stringify(
    Array.from(formData.entries())
      .map(([key, value]) => [
        key,
        String(value),
      ])
      .sort(([a], [b]) => a.localeCompare(b)),
  );
}

export function DirtySubmitButton({
  label = "更新する",
  pendingLabel = "更新中...",
}: Props) {
  const containerRef = useRef<HTMLSpanElement | null>(null);
  const initialSnapshotRef = useRef<string>("");
  const [isDirty, setIsDirty] = useState(false);
  const { pending } = useFormStatus();

  useEffect(() => {
    const form =
      containerRef.current?.closest("form");

    if (!form) {
      return;
    }

    initialSnapshotRef.current =
      getFormSnapshot(form);

    const handleChange = () => {
      setIsDirty(
        getFormSnapshot(form) !==
          initialSnapshotRef.current,
      );
    };

    form.addEventListener("input", handleChange);
    form.addEventListener("change", handleChange);

    return () => {
      form.removeEventListener("input", handleChange);
      form.removeEventListener("change", handleChange);
    };
  }, []);

  return (
    <span ref={containerRef}>
      <button
        type="submit"
        disabled={!isDirty || pending}
        className={
          isDirty && !pending
            ? "rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            : "cursor-not-allowed rounded bg-gray-300 px-4 py-2 text-sm font-medium text-gray-600"
        }
      >
        {pending ? pendingLabel : label}
      </button>
    </span>
  );
}
