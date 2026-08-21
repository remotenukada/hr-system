import { ReactNode } from "react";

type Props = {
  title: string;
  description?: string;
  children: ReactNode;
};

export default function SectionCard({
  title,
  description,
  children,
}: Props) {
  return (
    <div className="rounded-lg border bg-white p-6 shadow-sm">
      <h3 className="mb-3 text-lg font-semibold text-gray-800">
        {title}
      </h3>

      {description && (
        <p className="mb-4 text-sm text-gray-600">
          {description}
        </p>
      )}

      {children}
    </div>
  );
}
