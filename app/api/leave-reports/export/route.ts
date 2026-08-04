import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireManager } from "@/lib/auth-guard";

function escapeCsv(value: string | number) {
  const text = String(value);

  if (
    text.includes(",") ||
    text.includes('"') ||
    text.includes("\n")
  ) {
    return `"${text.replace(/"/g, '""')}"`;
  }

  return text;
}

export async function GET() {
  await requireManager();

  const balances = await prisma.leaveBalance.findMany({
    include: {
      employee: {
        include: {
          department: true,
        },
      },
    },
    orderBy: {
      employeeId: "asc",
    },
  });

  const rows = balances.map((balance) => {
    const grantedDays = balance.grantedDays;
    const usedDays = balance.usedDays;
    const remainingDays = grantedDays - usedDays;
    const rate =
      grantedDays > 0
        ? ((usedDays / grantedDays) * 100).toFixed(1)
        : "0.0";

    return [
      balance.employee?.employeeNo ?? "",
      balance.employee
        ? `${balance.employee.lastName} ${balance.employee.firstName}`
        : "",
      balance.employee?.department?.name ?? "未所属",
      grantedDays.toFixed(1),
      usedDays.toFixed(1),
      remainingDays.toFixed(1),
      `${rate}%`,
    ];
  });

  const header = [
    "社員番号",
    "社員名",
    "部署",
    "付与日数",
    "使用日数",
    "残日数",
    "取得率",
  ];

  const csv = [
    header.map(escapeCsv).join(","),
    ...rows.map((row) => row.map(escapeCsv).join(",")),
  ].join("\n");

  return new NextResponse(`\uFEFF${csv}`, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition":
        'attachment; filename="leave-reports.csv"',
    },
  });
}
