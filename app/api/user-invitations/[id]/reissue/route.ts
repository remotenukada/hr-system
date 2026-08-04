import { randomUUID } from "crypto";
import { NextResponse } from "next/server";

import { requireAdmin } from "@/lib/auth-guard";
import { logAudit } from "@/lib/audit-log";
import { prisma } from "@/lib/prisma";

type Context = {
  params: Promise<{
    id: string;
  }>;
};

export async function POST(
  request: Request,
  context: Context,
) {
  const session = await requireAdmin();

  const { id } = await context.params;

  const invitation =
    await prisma.userInvitation.findUnique({
      where: { id },
    });

  if (!invitation) {
    return NextResponse.json(
      { error: "招待が見つかりません。" },
      { status: 404 },
    );
  }

  if (invitation.acceptedAt) {
    return NextResponse.json(
      { error: "登録済み招待は再発行できません。" },
      { status: 400 },
    );
  }

  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 14);

  const updatedInvitation =
    await prisma.userInvitation.update({
      where: {
        id,
      },
      data: {
        token: randomUUID(),
        expiresAt,
      },
    });

  await logAudit({
    userId: session.user.id,
    userName: session.user.name,
    action: "USER_INVITATION_REISSUED",
    targetType: "UserInvitation",
    targetId: updatedInvitation.id,
    description:
      `招待再発行: ${updatedInvitation.email}`,
  });

  return NextResponse.redirect(
    new URL("/user-invitations", request.url),
  );
}
