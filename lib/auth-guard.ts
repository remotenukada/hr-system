import { auth } from "../auth";
import { redirect } from "next/navigation";

export async function requireRole(
  roles: string[],
) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  if (!roles.includes(session.user.role)) {
    redirect("/");
  }

  return session;
}

export async function requireAdmin() {
  return requireRole(["ADMIN"]);
}

export async function requireHRManager() {
  return requireRole([
    "ADMIN",
    "HR_MANAGER",
  ]);
}

export async function requireManager() {
  return requireRole([
    "ADMIN",
    "HR_MANAGER",
    "MANAGER",
  ]);
}
