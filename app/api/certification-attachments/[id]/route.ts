import { readFile } from "fs/promises";
import path from "path";
import { cookies } from "next/headers";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

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
    await prisma.employeeCertificationAttachment.findUnique({
      where: { id },
      include: {
        employeeCertification: {
          include: {
            employee: {
              select: {
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

  const employee = attachment.employeeCertification.employee;

  const isOwner = employee.userId === session.user.id;
  const isHRManager =
    session.user.role === "ADMIN" ||
    session.user.role === "HR_MANAGER";

  if (!isOwner && !isHRManager) {
    return new Response("Forbidden", { status: 403 });
  }

  if (isHRManager && !isOwner) {
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

  const filePath = path.join(process.cwd(), attachment.filePath);

  try {
    const fileBuffer = await readFile(filePath);

    return new Response(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": attachment.fileType || "application/octet-stream",
        "Content-Disposition": `inline; filename="${encodeURIComponent(attachment.fileName)}"`,
      },
    });
  } catch {
    return new Response("File Not Found", { status: 404 });
  }
}
