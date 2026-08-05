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
      where: {
        id,
      },
      select: {
        id: true,
        email: true,
        token: true,
        expiresAt: true,
        acceptedAt: true,
        cancelledAt: true,
      },
    });

  if (!invitation) {
    return NextResponse.json(
      { error: "招待が見つかりません。" },
      { status: 404 },
    );
  }

  if (invitation.acceptedAt) {
    return NextResponse.json(
      { error: "登録済み招待は取消できません。" },
      { status: 400 },
    );
  }

  if (invitation.cancelledAt) {
    return NextResponse.redirect(
      new URL("/user-invitations", request.url),
      303,
    );
  }

  const cancelledAt = new Date();

  const updatedInvitation =
    await prisma.userInvitation.update({
      where: {
        id,
      },
      data: {
        cancelledAt,
      },
    });

  await logAudit({
    userId: session.user.id,
    userName: session.user.name,
    action: "USER_INVITATION_CANCELLED",
    targetType: "UserInvitation",
    targetId: updatedInvitation.id,
    description: `招待取消: ${updatedInvitation.email}`,
    beforeData: {
      email: invitation.email,
      token: invitation.token,
      expiresAt: invitation.expiresAt,
      cancelledAt: invitation.cancelledAt,
    },
    afterData: {
      email: updatedInvitation.email,
      token: updatedInvitation.token,
      expiresAt: updatedInvitation.expiresAt,
      cancelledAt: updatedInvitation.cancelledAt,
    },
  });

  return NextResponse.redirect(
    new URL("/user-invitations", request.url),
    303,
  );
}
