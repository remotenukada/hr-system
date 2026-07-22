import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

function escapeCsv(value: unknown) {
  const text = String(value ?? "");
  return `"${text.replace(/"/g, '""')}"`;
}

function formatDate(value: Date | null) {
  if (!value) return "";
  return new Date(value).toLocaleDateString("ja-JP");
}

function formatGender(value: string | null) {
  if (!value) return "";

  const labels: Record<string, string> = {
    MALE: "男性",
    FEMALE: "女性",
    OTHER: "その他",
  };

  return labels[value] ?? value;
}

function formatEmploymentType(value: string | null) {
  if (!value) return "";

  const labels: Record<string, string> = {
    FULL_TIME: "正職員",
    CONTRACT: "契約職員",
    PART_TIME: "パート",
    TEMPORARY: "派遣",
  };

  return labels[value] ?? value;
}

function formatStatus(value: string | null) {
  if (!value) return "";

  const labels: Record<string, string> = {
    ACTIVE: "在職",
    LEAVE: "休職",
    RETIRED: "退職",
  };

  return labels[value] ?? value;
}

export async function GET() {
  const session = await auth();

  if (!session?.user || session.user.role !== "ADMIN") {
    return new Response("Forbidden", {
      status: 403,
    });
  }

  const employees = await prisma.employee.findMany({
    include: {
      department: true,
    },
    orderBy: {
      employeeNo: "asc",
    },
  });

  const header = [
    "社員番号",
    "氏名",
    "ふりがな",
    "性別",
    "生年月日",
    "電話番号",
    "住所",
    "メールアドレス",
    "部署",
    "職種",
    "役職",
    "雇用形態",
    "入職日",
    "退職日",
    "通勤区分",
    "ステータス",
    "被保険者番号",
    "雇用保険番号",
  ];

  const rows = employees.map((employee) => [
    employee.employeeNo,
    `${employee.lastName} ${employee.firstName}`,
    `${employee.lastNameKana ?? ""} ${employee.firstNameKana ?? ""}`.trim(),
    formatGender(employee.gender),
    formatDate(employee.birthDate),
    employee.phoneNumber ?? "",
    employee.address ?? "",
    employee.email,
    employee.department?.name ?? "",
    employee.occupation ?? "",
    employee.position ?? "",
    formatEmploymentType(employee.employmentType),
    formatDate(employee.hireDate),
    formatDate(employee.retirementDate),
    employee.commutingType ?? "",
    formatStatus(employee.status),
    employee.healthInsuranceNo ?? "",
    employee.employmentInsuranceNo ?? "",
  ]);

  const csv = [
    header.map(escapeCsv).join(","),
    ...rows.map((row) => row.map(escapeCsv).join(",")),
  ].join("\n");

  const bom = "\uFEFF";

  return new Response(bom + csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="employee_master.csv"',
    },
  });
}
