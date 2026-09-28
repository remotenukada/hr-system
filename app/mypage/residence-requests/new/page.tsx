import Link from "next/link";
import path from "path";
import { randomUUID } from "crypto";
import { mkdir, writeFile, unlink } from "fs/promises";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { logAudit } from "@/lib/audit-log";
import ResidenceRequestForm from "./ResidenceRequestForm";

const MAX_FILE_SIZE = 10 * 1024 * 1024;

const ALLOWED_MIME_TYPES = new Set([
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/webp",
]);

const ATTACHMENT_TYPES = [
  "LEASE_CONTRACT",
  "SALES_CONTRACT",
  "REGISTRY",
  "RESIDENCE_CERTIFICATE",
  "OTHER",
] as const;

type ResidenceAttachmentType =
  (typeof ATTACHMENT_TYPES)[number];

async function saveAttachment(file: File) {
  if (file.size > MAX_FILE_SIZE) {
    throw new Error("ファイルサイズは10MB以下にしてください。");
  }

  if (!ALLOWED_MIME_TYPES.has(file.type)) {
    throw new Error("対応していないファイル形式です。");
  }

  const uploadDir = path.join(
    process.cwd(),
    "storage",
    "residence-requests",
  );

  await mkdir(uploadDir, { recursive: true });

  const extension = path.extname(file.name).toLowerCase();
  const filePath = path.join(
    uploadDir,
    `${randomUUID()}${extension}`,
  );

  await writeFile(
    filePath,
    Buffer.from(await file.arrayBuffer()),
  );

  return {
    fileName: file.name,
    filePath,
    fileType: file.type,
    fileSize: file.size,
  };
}

async function getCurrentEmployee() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const employee = await prisma.employee.findUnique({
    where: {
      userId: session.user.id,
    },
  });

  if (!employee) {
    redirect("/");
  }

  return { session, employee };
}

function optionalText(formData: FormData, name: string) {
  const value = String(formData.get(name) ?? "").trim();
  return value || null;
}

function optionalNumber(formData: FormData, name: string) {
  const value = String(formData.get(name) ?? "").trim();

  if (!value) {
    return null;
  }

  const number = Number(value);

  if (!Number.isInteger(number) || number < 0) {
    throw new Error(`${name}は0以上の整数で入力してください。`);
  }

  return number;
}

export default async function NewResidenceRequestPage() {
  const { employee } = await getCurrentEmployee();

  async function createResidenceRequest(formData: FormData) {
    "use server";

    const { session, employee: currentEmployee } =
      await getCurrentEmployee();

    const residenceType = String(formData.get("residenceType") ?? "");
    const notificationType = String(
      formData.get("notificationType") ?? "",
    );
    const changeDate = String(formData.get("changeDate") ?? "").trim();
    const postalCode = String(formData.get("postalCode") ?? "").trim();
    const address = String(formData.get("address") ?? "").trim();

    const residenceTypes = [
      "RENTAL",
      "CORPORATE_HOUSING",
      "OWNED",
    ] as const;

    const notificationTypes = [
      "NEW",
      "ADDRESS_CHANGE",
      "CONTENT_CHANGE",
    ] as const;

    if (
      !residenceTypes.includes(
        residenceType as (typeof residenceTypes)[number],
      )
    ) {
      throw new Error("住居区分が正しくありません。");
    }

    if (
      !notificationTypes.includes(
        notificationType as (typeof notificationTypes)[number],
      )
    ) {
      throw new Error("届出区分が正しくありません。");
    }

    if (!changeDate || !postalCode || !address) {
      throw new Error("必須項目を入力してください。");
    }

    const ownershipTypeRaw = optionalText(formData, "ownershipType");
    const acquisitionDateRaw = optionalText(formData, "acquisitionDate");

    const attachmentTypeRaw = String(
      formData.get("attachmentType") ?? "OTHER",
    );

    if (
      !ATTACHMENT_TYPES.includes(
        attachmentTypeRaw as ResidenceAttachmentType,
      )
    ) {
      throw new Error("添付書類種別が正しくありません。");
    }

    const attachmentValue = formData.get("attachment");
    const attachment =
      attachmentValue instanceof File &&
      attachmentValue.size > 0
        ? await saveAttachment(attachmentValue)
        : null;

    let newRequest;

    try {
      newRequest = await prisma.residenceRequest.create({
      data: {
        employeeId: currentEmployee.id,
        residenceType: residenceType as (typeof residenceTypes)[number],
        notificationType: notificationType as (typeof notificationTypes)[number],
        changeDate: new Date(changeDate),
        postalCode,
        address,
        phoneNumber: optionalText(formData, "phoneNumber"),
        note: optionalText(formData, "note"),

        landlordName: optionalText(formData, "landlordName"),
        landlordAddress: optionalText(formData, "landlordAddress"),
        contractHolderName: optionalText(formData, "contractHolderName"),
        contractHolderRelationship: optionalText(formData, "contractHolderRelationship"),
        monthlyRent: optionalNumber(formData, "monthlyRent"),
        commonServiceFee: optionalNumber(formData, "commonServiceFee"),

        housingName: optionalText(formData, "housingName"),
        roomNumber: optionalText(formData, "roomNumber"),

        ownershipType: ownershipTypeRaw ? (ownershipTypeRaw as any) : null,
        ownerName1: optionalText(formData, "ownerName1"),
        ownerName2: optionalText(formData, "ownerName2"),
        acquisitionDate: acquisitionDateRaw ? new Date(acquisitionDateRaw) : null,
        attachments: attachment
          ? {
              create: {
                attachmentType:
                  attachmentTypeRaw as ResidenceAttachmentType,
                ...attachment,
              },
            }
          : undefined,
      },
    });
    } catch (error) {
      if (attachment) {
        await unlink(attachment.filePath).catch(() => undefined);
      }
      throw error;
    }

    await logAudit({
      userId: session.user.id,
      action: "CREATE_RESIDENCE_REQUEST",
      targetType: "ResidenceRequest",
      targetId: newRequest.id,
      description: `${currentEmployee.employeeNo} の住居届を作成`,
      afterData: {
        employeeId: currentEmployee.id,
        attachmentCount: attachment ? 1 : 0,
      },
    });

    revalidatePath("/mypage/residence-requests");
    redirect("/mypage/residence-requests");
  }

  return (
    <div className="mx-auto max-w-4xl p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">住居届の新規申請</h1>
        <Link
          href="/mypage/residence-requests"
          className="text-sm text-blue-600 hover:underline"
        >
          一覧に戻る
        </Link>
      </div>

      <ResidenceRequestForm
        action={createResidenceRequest}
        employeeName={`${employee.lastName ?? ""} ${employee.firstName ?? ""}`.trim() || employee.id}
        defaultAddress={employee.address ?? ""}
        defaultPhoneNumber={employee.phoneNumber ?? ""}
      />
    </div>
  );
}
