import { createHash } from "crypto";
import { readFile, realpath } from "fs/promises";
import path from "path";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

const STORAGE_ROOT = "/data/hr-system/pledges";

type Context = {
  params: Promise<{ id: string }>;
};

export async function GET(
  _request: Request,
  { params }: Context,
) {
  const session = await auth();

  if (!session?.user?.id) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { id } = await params;

  const pledge = await prisma.employeePledge.findUnique({
    where: { id },
    include: {
      employee: {
        select: { userId: true },
      },
    },
  });

  if (!pledge?.filePath) {
    return new Response("File not found", { status: 404 });
  }

  const isManager =
    session.user.role === "ADMIN" ||
    session.user.role === "HR_MANAGER";

  const isOwner =
    pledge.employee.userId === session.user.id;

  if (!isManager && !isOwner) {
    return new Response("Forbidden", { status: 403 });
  }

  const storageRoot = await realpath(STORAGE_ROOT);
  const filePath = await realpath(pledge.filePath);

  if (
    filePath !== storageRoot &&
    !filePath.startsWith(`${storageRoot}${path.sep}`)
  ) {
    return new Response("Invalid file path", { status: 400 });
  }

  const file = await readFile(filePath);

  if (pledge.documentHash) {
    const actualHash = createHash("sha256")
      .update(file)
      .digest("hex");

    if (actualHash !== pledge.documentHash) {
      return new Response("File integrity error", {
        status: 409,
      });
    }
  }

  const fileName = path.basename(
    pledge.fileName ?? pledge.filePath,
  );

  return new Response(new Uint8Array(file), {
    headers: {
      "Content-Type":
        pledge.fileType ?? "application/octet-stream",
      "Content-Disposition":
        `inline; filename*=UTF-8''${encodeURIComponent(fileName)}`,
      "Cache-Control": "private, no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
