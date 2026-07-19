import { requireAdmin } from "../../lib/auth-guard";

export default async function EmployeesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAdmin();
  return <>{children}</>;
}
