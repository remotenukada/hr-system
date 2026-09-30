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
      select: {
        id: true,
        employeeNo: true,
        lastName: true,
        firstName: true,
        email: true,
        acceptedAt: true,
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
      { error: "登録済み招待は削除できません。" },
      { status: 400 },
    );
  }

  await prisma.$transaction(async (tx) => {
    await tx.employeeCertificationAttachment.updateMany({
      where: {
        userInvitationId: invitation.id,
      },
      data: {
        userInvitationId: null,
      },
    });

    await tx.userInvitation.delete({
      where: {
        id: invitation.id,
      },
    });
  });

  await logAudit({
    userId: session.user.id,
    userName: session.user.name,
    action: "USER_INVITATION_DELETED",
    targetType: "UserInvitation",
    targetId: invitation.id,
    description:
      `招待削除: ${invitation.email}`,
    beforeData: invitation,
  });

  return NextResponse.redirect(
    new URL("/user-invitations", request.url),
    303,
  );
}
