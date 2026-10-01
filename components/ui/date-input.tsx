"use client";

import { useState } from "react";

type Props = {
  name: string;
  defaultValue?: string;
  required?: boolean;
  className?: string;
};

export default function DateInput({
  name,
  defaultValue,
  required,
  className,
}: Props) {
  const [value, setValue] = useState(defaultValue ?? "");

  const formatDate = (v: string) => {
    const digits = v.replace(/\D/g, "").slice(0, 8);

    if (digits.length < 5) return digits;
    if (digits.length < 7)
      return `${digits.slice(0, 4)}-${digits.slice(4)}`;

    return `${digits.slice(0, 4)}-${digits.slice(4, 6)}-${digits.slice(6, 8)}`;
  };

  return (
    <input
      type="text"
      inputMode="numeric"
      placeholder="YYYY-MM-DD"
      name={name}
      value={value}
      onChange={(e) => setValue(formatDate(e.target.value))}
      className="w-full rounded border p-2 focus:outline-indigo-500"
      required={required}
    />
  );
}
