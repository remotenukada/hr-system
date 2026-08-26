import { requireAdmin } from "@/lib/auth-guard";
import { testSmtpConnection } from "@/lib/mail";

export async function POST(request: Request) {
  await requireAdmin();

  const url = new URL("/company-settings", request.url);

  try {
    await testSmtpConnection();
    url.searchParams.set("smtpTest", "success");
  } catch (error) {
    const message = error instanceof Error ? error.message : "不明なエラー";

    url.searchParams.set("smtpTest", "error");
    url.searchParams.set("smtpMessage", message);
  }

  return Response.redirect(url, 303);
}
