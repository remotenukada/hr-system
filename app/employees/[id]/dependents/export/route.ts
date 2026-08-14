import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

type Context = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(
  _request: Request,
  { params }: Context,
) {
  const { id } = await params;

  const employee = await prisma.employee.findUnique({
    where: {
      id,
    },
    include: {
      dependents: {
        orderBy: {
          createdAt: "asc",
        },
      },
    },
  });

  if (!employee) {
    return new NextResponse("Employee not found", {
      status: 404,
    });
  }

  const rows = [
    [
      "氏名",
      "続柄",
      "生年月日",
      "同居",
      "年収",
      "健康保険扶養",
      "状態",
    ].join(","),
  ];

  for (const dependent of employee.dependents) {
    rows.push(
      [
        dependent.name,
        dependent.relationship,
        dependent.birthDate
          ? new Date(dependent.birthDate)
              .toLocaleDateString("ja-JP")
          : "",
        dependent.cohabiting ? "○" : "×",
        dependent.annualIncome ?? "",
        dependent.healthInsuranceDependent
          ? "対象"
          : "対象外",
        dependent.isActive ? "有効" : "解除",
      ].join(","),
    );
  }

  // UTF-8 BOM 付与による文字化け防止
  const csv = "\uFEFF" + rows.join("\n");

  return new NextResponse(csv, {
    headers: {
      "Content-Type":
        "text/csv; charset=utf-8",
      "Content-Disposition":
        `attachment; filename="dependents-${employee.employeeNo}.csv"`,
    },
  });
}
