import fs from "fs";
import path from "path";

export const runtime = "nodejs";

type RouteContext = {
  params: Promise<{
    id: string;
    fileName: string;
  }>;
};

const EXPORT_DIR = "/data/hr-system/exports/contracts";

export async function GET(
  _request: Request,
  { params }: RouteContext,
) {
  const { id, fileName } = await params;

  const safeFileName = path.basename(
    decodeURIComponent(fileName),
  );

  if (!safeFileName.endsWith(".pdf")) {
    return new Response("Invalid file", {
      status: 400,
    });
  }

  const filePath = path.join(
    EXPORT_DIR,
    id,
    safeFileName,
  );

  if (!fs.existsSync(filePath)) {
    return new Response("File not found", {
      status: 404,
    });
  }

  const fileBuffer = fs.readFileSync(filePath);

  return new Response(fileBuffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${safeFileName}"`,
    },
  });
}
