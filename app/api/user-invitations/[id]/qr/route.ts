import QRCode from "qrcode";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth-guard";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(
  request: Request,
  context: RouteContext,
) {
  await requireAdmin();

  const { id } = await context.params;

  const invitation = await prisma.userInvitation.findUnique({
    where: {
      id,
    },
  });

  if (!invitation) {
    notFound();
  }

  const origin = new URL(request.url).origin;
  const registerUrl = `${origin}/register/${invitation.token}`;

  const svg = await QRCode.toString(registerUrl, {
    type: "svg",
    margin: 2,
    width: 320,
  });

  return new Response(svg, {
    headers: {
      "Content-Type": "image/svg+xml; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
