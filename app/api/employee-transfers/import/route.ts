import { requireHRManager } from "@/lib/auth-guard";
import { prisma } from "@/lib/prisma";

function parseCsvLine(line: string) {
  const values: string[] = [];
  let value = "";
  let quoted = false;

  for (let index = 0; index < line.length; index += 1) {
    const character = line[index];

    if (character === '"') {
      if (quoted && line[index + 1] === '"') {
        value += '"';
        index += 1;
      } else {
        quoted = !quoted;
      }

      continue;
    }

    if (character === "," && !quoted) {
      values.push(value.trim());
      value = "";
      continue;
    }

    value += character;
  }

  values.push(value.trim());

  return {
    values,
    valid: !quoted,
  };
}

function parseEffectiveDate(value: string) {
  if (!value) {
    return new Date();
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return null;
  }

  const date = new Date(`${value}T00:00:00`);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  const normalized = [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
  ].join("-");

  return normalized === value ? date : null;
}

type ValidatedTransfer = {
  rowNumber: number;
  employeeId: string;
  employeeNo: string;

  fromFacilityId: string | null;
  fromFacilityName: string | null;
  toFacilityId: string;
  toFacilityName: string;

  fromDepartmentId: string | null;
  fromDepartmentName: string | null;
  toDepartmentId: string | null;
  toDepartmentName: string | null;

  effectiveDate: Date;
  reason: string;
};

export async function POST(request: Request) {
  const session = await requireHRManager();

  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File) || file.size === 0) {
    return Response.json(
      {
        error: "CSVファイルが選択されていません。",
      },
      {
        status: 400,
      },
    );
  }

  const text = (await file.text()).replace(/^\uFEFF/, "");

  const lines = text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  if (lines.length < 2) {
    return Response.json(
      {
        error: "異動データがありません。",
      },
      {
        status: 400,
      },
    );
  }

  const headerResult = parseCsvLine(lines[0]);

  const requiredHeaders = [
    "employeeNo",
    "toFacilityCode",
    "toDepartmentName",
    "effectiveDate",
    "reason",
  ];

  if (
    !headerResult.valid ||
    headerResult.values.length !== requiredHeaders.length ||
    requiredHeaders.some(
      (requiredHeader, index) => headerResult.values[index] !== requiredHeader,
    )
  ) {
    return Response.json(
      {
        error:
          "CSVの列名が正しくありません。正しい列名: " +
          requiredHeaders.join(","),
      },
      {
        status: 400,
      },
    );
  }

  const validationErrors: string[] = [];
  const validatedTransfers: ValidatedTransfer[] = [];
  const importedEmployeeNos = new Set<string>();
  let skipped = 0;

  /*
   * 第1段階
   * 全行を検証します。
   * この段階ではデータベースを更新しません。
   */
  for (let index = 1; index < lines.length; index += 1) {
    const rowNumber = index + 1;
    const parsed = parseCsvLine(lines[index]);

    if (!parsed.valid) {
      validationErrors.push(
        `${rowNumber}行目: ダブルクォートが閉じられていません。`,
      );
      continue;
    }

    if (parsed.values.length !== requiredHeaders.length) {
      validationErrors.push(
        `${rowNumber}行目: 列数が正しくありません。` +
          `必要列数は${requiredHeaders.length}列です。`,
      );
      continue;
    }

    const employeeNo = parsed.values[0]?.trim() ?? "";
    const toFacilityCode = parsed.values[1]?.trim() ?? "";
    const toDepartmentName = parsed.values[2]?.trim() ?? "";
    const effectiveDateValue = parsed.values[3]?.trim() ?? "";
    const inputReason = parsed.values[4]?.trim() ?? "";

    if (!employeeNo) {
      validationErrors.push(`${rowNumber}行目: 社員番号が未入力です。`);
      continue;
    }

    if (!toFacilityCode) {
      validationErrors.push(`${rowNumber}行目: 異動先施設コードが未入力です。`);
      continue;
    }

    if (importedEmployeeNos.has(employeeNo)) {
      validationErrors.push(
        `${rowNumber}行目: 社員番号 ${employeeNo} がCSV内で重複しています。`,
      );
      continue;
    }

    importedEmployeeNos.add(employeeNo);

    const effectiveDate = parseEffectiveDate(effectiveDateValue);

    if (!effectiveDate) {
      validationErrors.push(
        `${rowNumber}行目: 異動日はYYYY-MM-DD形式で入力してください。`,
      );
      continue;
    }

    const [employee, facility, department] = await Promise.all([
      prisma.employee.findUnique({
        where: {
          employeeNo,
        },
        include: {
          facility: true,
          department: true,
        },
      }),
      prisma.facility.findUnique({
        where: {
          code: toFacilityCode,
        },
      }),
      toDepartmentName
        ? prisma.department.findUnique({
            where: {
              name: toDepartmentName,
            },
          })
        : Promise.resolve(null),
    ]);

    if (!employee) {
      validationErrors.push(
        `${rowNumber}行目: 社員番号 ${employeeNo} が見つかりません。`,
      );
      continue;
    }

    if (!facility) {
      validationErrors.push(
        `${rowNumber}行目: 施設コード ${toFacilityCode} が見つかりません。`,
      );
      continue;
    }

    if (toDepartmentName && !department) {
      validationErrors.push(
        `${rowNumber}行目: 部署 ${toDepartmentName} が見つかりません。`,
      );
      continue;
    }

    const facilityChanged = employee.facilityId !== facility.id;

    const departmentChanged =
      employee.departmentId !== (department?.id ?? null);

    if (!facilityChanged && !departmentChanged) {
      skipped += 1;
      continue;
    }

    const reason =
      inputReason ||
      `所属変更: ` +
        `${employee.facility?.name ?? "未設定"} / ` +
        `${employee.department?.name ?? "未所属"}` +
        ` → ${facility.name} / ` +
        `${department?.name ?? "未所属"}`;

    validatedTransfers.push({
      rowNumber,
      employeeId: employee.id,
      employeeNo: employee.employeeNo,

      fromFacilityId: employee.facilityId,
      fromFacilityName: employee.facility?.name ?? null,
      toFacilityId: facility.id,
      toFacilityName: facility.name,

      fromDepartmentId: employee.departmentId,
      fromDepartmentName: employee.department?.name ?? null,
      toDepartmentId: department?.id ?? null,
      toDepartmentName: department?.name ?? null,

      effectiveDate,
      reason,
    });
  }

  /*
   * 1件でもエラーがあれば、更新せずに終了します。
   */
  if (validationErrors.length > 0) {
    for (const error of validationErrors) {
      console.error(`異動CSV検証エラー: ${error}`);
    }

    const redirectUrl = new URL("/employee-transfers/import", request.url);

    redirectUrl.searchParams.set("success", "0");
    redirectUrl.searchParams.set("skipped", String(skipped));
    redirectUrl.searchParams.set("failed", String(validationErrors.length));

    return Response.redirect(redirectUrl, 303);
  }

  /*
   * 第2段階
   * 全行の検証成功後に、1つのトランザクションで反映します。
   * 途中で失敗した場合は、全更新が取り消されます。
   */
  try {
    await prisma.$transaction(async (tx) => {
      for (const transfer of validatedTransfers) {
        const currentEmployee = await tx.employee.findUnique({
          where: {
            id: transfer.employeeId,
          },
          select: {
            facilityId: true,
            departmentId: true,
          },
        });

        if (!currentEmployee) {
          throw new Error(
            `${transfer.rowNumber}行目: ` +
              `社員番号 ${transfer.employeeNo} が見つかりません。`,
          );
        }

        /*
         * 検証後に別操作で所属が変更されていた場合は、
         * 古い情報で上書きせず、全処理を中止します。
         */
        if (
          currentEmployee.facilityId !== transfer.fromFacilityId ||
          currentEmployee.departmentId !== transfer.fromDepartmentId
        ) {
          throw new Error(
            `${transfer.rowNumber}行目: ` +
              `社員番号 ${transfer.employeeNo} の所属情報が` +
              `検証後に変更されました。再度CSVを実行してください。`,
          );
        }

        await tx.employee.update({
          where: {
            id: transfer.employeeId,
          },
          data: {
            facilityId: transfer.toFacilityId,
            departmentId: transfer.toDepartmentId,
          },
        });

        await tx.employeeTransfer.create({
          data: {
            employeeId: transfer.employeeId,
            fromFacilityId: transfer.fromFacilityId,
            toFacilityId: transfer.toFacilityId,
            fromDepartmentId: transfer.fromDepartmentId,
            toDepartmentId: transfer.toDepartmentId,
            effectiveDate: transfer.effectiveDate,
            reason: transfer.reason,
            createdBy:
              session.user.name ?? session.user.email ?? session.user.id,
          },
        });

        await tx.employmentHistory.create({
          data: {
            employeeId: transfer.employeeId,
            action: "TRANSFER",
            effectiveDate: transfer.effectiveDate,
            reason: transfer.reason,
          },
        });

        /*
         * 監査ログも同じトランザクションで保存します。
         */
        await tx.auditLog.create({
          data: {
            userId: session.user.id,
            userName: session.user.name ?? session.user.email ?? "管理者",
            action: "EMPLOYEE_TRANSFER_IMPORTED",
            targetType: "Employee",
            targetId: transfer.employeeId,
            description: `${transfer.employeeNo} の異動をCSV取込`,
            beforeData: {
              facilityId: transfer.fromFacilityId,
              facilityName: transfer.fromFacilityName,
              departmentId: transfer.fromDepartmentId,
              departmentName: transfer.fromDepartmentName,
            },
            afterData: {
              facilityId: transfer.toFacilityId,
              facilityName: transfer.toFacilityName,
              departmentId: transfer.toDepartmentId,
              departmentName: transfer.toDepartmentName,
              effectiveDate: transfer.effectiveDate.toISOString(),
              reason: transfer.reason,
            },
          },
        });
      }
    });
  } catch (error) {
    console.error(
      "異動CSV一括反映エラー:",
      error instanceof Error ? error.message : "不明なエラー",
    );

    const redirectUrl = new URL("/employee-transfers/import", request.url);

    redirectUrl.searchParams.set("success", "0");
    redirectUrl.searchParams.set("skipped", String(skipped));
    redirectUrl.searchParams.set(
      "failed",
      String(validatedTransfers.length || 1),
    );

    return Response.redirect(redirectUrl, 303);
  }

  const redirectUrl = new URL("/employee-transfers/import", request.url);

  redirectUrl.searchParams.set("success", String(validatedTransfers.length));
  redirectUrl.searchParams.set("skipped", String(skipped));
  redirectUrl.searchParams.set("failed", "0");

  return Response.redirect(redirectUrl, 303);
}
