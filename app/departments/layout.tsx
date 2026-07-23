import { requireHRManager } from "../../lib/auth-guard";

export default async function DepartmentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireHRManager();

  return <>{children}</>;
}
