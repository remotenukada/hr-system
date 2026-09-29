import { readFile, realpath } from "fs/promises";
import path from "path";
import { cookies } from "next/headers";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { logAudit } from "@/lib/audit-log";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export const runtime = "nodejs";

export async function GET(
  _request: Request,
  { params }: RouteContext,
) {
  const session = await auth();

  if (!session?.user?.id) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { id } = await params;

  const attachment =
    await prisma.residenceRequestAttachment.findUnique({
      where: { id },
      include: {
        residenceRequest: {
          include: {
            employee: {
              select: {
                id: true,
                employeeNo: true,
                userId: true,
                facilityId: true,
              },
            },
          },
        },
      },
    });

  if (!attachment) {
    return new Response("Not Found", { status: 404 });
  }

  const employee = attachment.residenceRequest.employee;

  const isOwner = employee.userId === session.user.id;
  const isHR =
    session.user.role === "ADMIN" ||
    session.user.role === "HR_MANAGER";

  if (!isOwner && !isHR) {
    return new Response("Forbidden", { status: 403 });
  }

  if (isHR && !isOwner) {
    const cookieStore = await cookies();
    const facilityScope =
      cookieStore.get("facilityScope")?.value ?? "ALL";

    if (
      facilityScope !== "ALL" &&
      employee.facilityId !== facilityScope
    ) {
      return new Response("Not Found", { status: 404 });
    }
  }

  try {
    const storageRoot = await realpath(
      path.join(
        process.cwd(),
        "storage",
        "residence-requests",
      ),
    );

    const resolvedFilePath = await realpath(
      attachment.filePath,
    );

    if (
      resolvedFilePath !== storageRoot &&
      !resolvedFilePath.startsWith(
        `${storageRoot}${path.sep}`,
      )
    ) {
      return new Response("Forbidden", { status: 403 });
    }

    const fileBuffer = await readFile(resolvedFilePath);

    await logAudit({
      userId: session.user.id,
      userName: session.user.name,
      action: "RESIDENCE_ATTACHMENT_VIEWED",
      targetType: "ResidenceRequestAttachment",
      targetId: attachment.id,
      description:
        `${employee.employeeNo} の住居届添付ファイルを閲覧`,
      afterData: {
        residenceRequestId:
          attachment.residenceRequestId,
        attachmentType:
          attachment.attachmentType,
        fileName: attachment.fileName,
      },
    });

    const safeFileName = attachment.fileName.replace(
      /[\r\n"]/g,
      "",
    );

    return new Response(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": attachment.fileType || "application/octet-stream",
        "Content-Disposition": `inline; filename="${encodeURIComponent(safeFileName)}"`,
      },
    });
  } catch (error) {
    console.error("Failed to read residence attachment:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
