import { prisma } from "@/lib/prisma";
import { logAudit } from "@/lib/audit-log";
import { requireHRManager } from "@/lib/auth-guard";

export async function POST(req: Request) {
  try {
    const session = await requireHRManager();
    const formData = await req.formData();

    const file = formData.get("file");

    if (!(file instanceof File)) {
      return Response.json(
        { error: "CSVファイルが選択されていません" },
        { status: 400 },
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

      const employee = await prisma.employee.create({
        data: {
          employeeNo: cols[0]?.replaceAll('"', ""),
          lastName: cols[1]?.replaceAll('"', ""),
          firstName: cols[2]?.replaceAll('"', ""),
          email: cols[3]?.replaceAll('"', ""),
        },
      });

      await logAudit({
        action: "EMPLOYEE_IMPORTED",
        targetType: "Employee",
        targetId: employee.id,
        description: `${employee.employeeNo} をCSVインポート`,
      });
    }

    return Response.redirect(new URL("/employees", req.url));
  } catch (error) {
    console.error(error);

    return Response.json({ error: "インポート失敗" }, { status: 500 });
  }
}
