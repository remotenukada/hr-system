import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const file = formData.get("file");

    if (!(file instanceof File)) {
      return Response.json(
        { error: "CSVファイルが選択されていません" },
        { status: 400 }
      );
    }

    const text = await file.text();

    const rows = text
      .split("\n")
      .map((row) => row.trim())
      .filter(Boolean);

    const dataRows = rows.slice(1);

    for (const row of dataRows) {
      const cols = row.split(",");

      await prisma.employee.create({
        data: {
          employeeNo: cols[0]?.replaceAll('"', ''),
          lastName: cols[1]?.replaceAll('"', ''),
          firstName: cols[2]?.replaceAll('"', ''),
          email: cols[3]?.replaceAll('"', ''),
        },
      });
    }

    return Response.redirect(
      new URL("/employees", req.url)
    );
  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "インポート失敗" },
      { status: 500 }
    );
  }
}
