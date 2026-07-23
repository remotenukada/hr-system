import { requireManager } from "../../lib/auth-guard";

export default async function EmployeesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireManager();

  return <>{children}</>;
}
