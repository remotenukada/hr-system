import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { randomUUID } from "crypto";
import path from "path";
import { mkdir, writeFile, unlink } from "fs/promises";
import { prisma } from "../../../../lib/prisma";
import { requireHRManager } from "@/lib/auth-guard";

type Props = {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    error?: string;
  }>;
};

const allowedFileTypes = [
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/webp",
];

function formatDate(date: Date | null) {
  if (!date) return "-";
  return date.toLocaleDateString("ja-JP");
}

export default async function EmployeeCertificationsPage({
  params,
  searchParams,
}: Props) {
  await requireHRManager();

  const cookieStore = await cookies();
  const facilityScope = cookieStore.get("facilityScope")?.value ?? "ALL";

  const { id } = await params;
  const { error } = await searchParams;

  const employee = await prisma.employee.findUnique({
    where: {
      id,
    },
    include: {
      certifications: {
        include: {
          certification: true,
          employeeCertificationAttachments: {
            orderBy: {
              createdAt: "desc",
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!employee) {
    notFound();
  }

  if (facilityScope !== "ALL" && employee.facilityId !== facilityScope) {
    notFound();
  }

  const certifications = await prisma.certification.findMany({
    orderBy: {
      name: "asc",
    },
  });

  async function addEmployeeCertification(formData: FormData) {
    "use server";

    await requireHRManager();

    const actionCookieStore = await cookies();
    const actionFacilityScope =
      actionCookieStore.get("facilityScope")?.value ?? "ALL";

    const targetEmployee = await prisma.employee.findUnique({
      where: { id },
      select: { facilityId: true },
    });

    if (!targetEmployee) {
      notFound();
    }

    if (
      actionFacilityScope !== "ALL" &&
      targetEmployee.facilityId !== actionFacilityScope
    ) {
      notFound();
    }

    const certificationId = String(
      formData.get("certificationId") ?? "",
    ).trim();

    const newCertificationName = String(
      formData.get("newCertificationName") ?? "",
    ).trim();

    const acquiredDateRaw = String(formData.get("acquiredDate") ?? "");

    const expiryDateRaw = String(formData.get("expiryDate") ?? "");

    if (!certificationId && !newCertificationName) {
      redirect(`/employees/${id}/certifications?error=required`);
    }

    let targetCertificationId = certificationId;

    if (newCertificationName) {
      const certification = await prisma.certification.upsert({
        where: {
          name: newCertificationName,
        },
        update: {},
        create: {
          name: newCertificationName,
        },
      });

      targetCertificationId = certification.id;
    }

    const existing = await prisma.employeeCertification.findUnique({
      where: {
        employeeId_certificationId: {
          employeeId: id,
          certificationId: targetCertificationId,
        },
      },
    });

    if (existing) {
      redirect(`/employees/${id}/certifications?error=duplicate`);
    }

    const files = formData.getAll("certificateFiles");

    const savedAttachments: {
      fileName: string;
      filePath: string;
      fileType: string;
      fileSize: number;
    }[] = [];

    for (const file of files) {
      if (!(file instanceof File) || file.size === 0) {
        continue;
      }

      if (!allowedFileTypes.includes(file.type)) {
        redirect(`/employees/${id}/certifications?error=invalidFile`);
      }

      if (file.size > 5 * 1024 * 1024) {
        redirect(`/employees/${id}/certifications?error=fileTooLarge`);
      }

      const extension =
        path.extname(file.name).toLowerCase() ||
        (file.type === "application/pdf" ? ".pdf" : ".jpg");

      const uploadDir = path.join(
        process.cwd(),
        "storage",
        "certifications",
      );

      await mkdir(uploadDir, {
        recursive: true,
      });

      const storedFileName = `${id}-${targetCertificationId}-${randomUUID()}${extension}`;

      const filePath = path.join(uploadDir, storedFileName);

      const bytes = await file.arrayBuffer();
      await writeFile(filePath, Buffer.from(bytes));

      savedAttachments.push({
        fileName: file.name,
        filePath: storedFileName,
        fileType: file.type,
        fileSize: file.size,
      });
    }

    await prisma.employeeCertification.create({
      data: {
        employeeId: id,
        certificationId: targetCertificationId,
        acquiredDate: acquiredDateRaw
          ? new Date(`${acquiredDateRaw}T00:00:00`)
          : null,
        expiryDate: expiryDateRaw
          ? new Date(`${expiryDateRaw}T00:00:00`)
          : null,
        employeeCertificationAttachments:
          savedAttachments.length > 0
            ? {
                create: savedAttachments,
              }
            : undefined,
      },
    });

    revalidatePath(`/employees/${id}`);
    revalidatePath(`/employees/${id}/certifications`);

    redirect(`/employees/${id}/certifications`);
  }

  async function deleteEmployeeCertification(formData: FormData) {
    "use server";

    const employeeCertificationId = String(
      formData.get("employeeCertificationId") ?? "",
    ).trim();

    if (!employeeCertificationId) {
      redirect(`/employees/${id}/certifications`);
    }

    await prisma.employeeCertification.deleteMany({
      where: {
        id: employeeCertificationId,
        employeeId: id,
      },
    });

    revalidatePath(`/employees/${id}`);
    revalidatePath(`/employees/${id}/certifications`);

    redirect(`/employees/${id}/certifications`);
  }

  async function deleteEmployeeCertificationAttachment(formData: FormData) {
    "use server";

    const attachmentId = String(formData.get("attachmentId") ?? "").trim();

    if (!attachmentId) {
      redirect(`/employees/${id}/certifications`);
    }

    const attachment = await prisma.employeeCertificationAttachment.findFirst({
      where: {
        id: attachmentId,
        employeeCertification: {
          employeeId: id,
        },
      },
    });

    if (!attachment) {
      redirect(`/employees/${id}/certifications`);
    }

    await prisma.employeeCertificationAttachment.delete({
      where: {
        id: attachment.id,
      },
    });

    const storedFileName = path.basename(attachment.filePath);
    const absolutePath = path.join(
      process.cwd(),
      "storage",
      "certifications",
      storedFileName,
    );

    await unlink(absolutePath).catch(() => undefined);

    revalidatePath(`/employees/${id}`);
    revalidatePath(`/employees/${id}/certifications`);

    redirect(`/employees/${id}/certifications`);
  }

  return (
    <main className="p-8">
      <div className="mb-6">
        <Link
          href={`/employees/${employee.id}`}
          className="text-sm text-blue-600 hover:underline"
        >
          ← 職員詳細へ戻る
        </Link>

        <h1 className="mt-2 text-3xl font-bold">職員資格管理</h1>

        <p className="mt-1 text-sm text-gray-500">
          {employee.lastName} {employee.firstName} さんの保有資格を管理します。
        </p>
      </div>

      {error === "required" && (
        <div className="mb-4 max-w-xl rounded border border-red-300 bg-red-50 p-3 text-sm text-red-700">
          資格を選択するか、新しい資格名を入力してください。
        </div>
      )}

      {error === "duplicate" && (
        <div className="mb-4 max-w-xl rounded border border-red-300 bg-red-50 p-3 text-sm text-red-700">
          この資格は既に登録されています。
        </div>
      )}

      {error === "invalidFile" && (
        <div className="mb-4 max-w-xl rounded border border-red-300 bg-red-50 p-3 text-sm text-red-700">
          添付できるファイルは PDF、JPG、PNG、WebP のみです。
        </div>
      )}

      {error === "fileTooLarge" && (
        <div className="mb-4 max-w-xl rounded border border-red-300 bg-red-50 p-3 text-sm text-red-700">
          添付ファイルは1ファイルあたり5MB以下にしてください。
        </div>
      )}

      <section className="mb-8 max-w-xl rounded border bg-white p-6">
        <h2 className="mb-4 text-xl font-bold">資格を追加</h2>

        <form action={addEmployeeCertification} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">
              既存資格から選択
            </label>

            <select
              name="certificationId"
              className="w-full rounded border p-2"
            >
              <option value="">既存の資格を選択</option>
              {certifications.map((certification) => (
                <option key={certification.id} value={certification.id}>
                  {certification.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              または 新しい資格名を入力
            </label>

            <input
              type="text"
              name="newCertificationName"
              placeholder="リストにない場合は入力してください"
              className="w-full rounded border p-2"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">取得日</label>

            <input
              type="date"
              name="acquiredDate"
              className="w-full rounded border p-2"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">有効期限</label>

            <input
              type="date"
              name="expiryDate"
              className="w-full rounded border p-2"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              資格証・免許証ファイル
            </label>

            <input
              type="file"
              name="certificateFiles"
              accept="application/pdf,image/jpeg,image/png,image/webp"
              multiple
              className="w-full rounded border p-2"
            />

            <p className="mt-1 text-xs text-gray-500">
              PDF、JPG、PNG、WebPを複数添付できます。1ファイル最大5MBです。
            </p>
          </div>

          <button
            type="submit"
            className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            追加
          </button>
        </form>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-bold">保有資格一覧</h2>

        {employee.certifications.length === 0 ? (
          <p className="text-sm text-gray-500">登録済みの資格はありません。</p>
        ) : (
          <table className="w-full max-w-6xl border-collapse border">
            <thead>
              <tr className="bg-gray-50">
                <th className="border p-2 text-left">資格名</th>
                <th className="border p-2 text-left">取得日</th>
                <th className="border p-2 text-left">有効期限</th>
                <th className="border p-2 text-left">添付ファイル</th>
                <th className="border p-2 text-center">操作</th>
              </tr>
            </thead>

            <tbody>
              {employee.certifications.map((item) => (
                <tr key={item.id}>
                  <td className="border p-2">{item.certification.name}</td>

                  <td className="border p-2">
                    {formatDate(item.acquiredDate)}
                  </td>

                  <td className="border p-2">{formatDate(item.expiryDate)}</td>

                  <td className="border p-2">
                    {item.employeeCertificationAttachments.length === 0 ? (
                      "-"
                    ) : (
                      <ul className="space-y-1">
                        {item.employeeCertificationAttachments.map(
                          (attachment) => (
                            <li
                              key={attachment.id}
                              className="flex items-center gap-2"
                            >
                              <a
                                href={`/api/certification-attachments/${attachment.id}`}
                                target="_blank"
                                rel="noreferrer"
                                className="text-blue-600 hover:underline"
                              >
                                {attachment.fileName}
                              </a>

                              <form
                                action={deleteEmployeeCertificationAttachment}
                              >
                                <input
                                  type="hidden"
                                  name="attachmentId"
                                  value={attachment.id}
                                />

                                <button
                                  type="submit"
                                  className="rounded bg-red-50 px-2 py-0.5 text-xs text-red-700 hover:bg-red-100"
                                >
                                  削除
                                </button>
                              </form>
                            </li>
                          ),
                        )}
                      </ul>
                    )}
                  </td>

                  <td className="border p-2 text-center">
                    <form action={deleteEmployeeCertification}>
                      <input
                        type="hidden"
                        name="employeeCertificationId"
                        value={item.id}
                      />

                      <button
                        type="submit"
                        className="rounded bg-red-600 px-3 py-1 text-sm text-white hover:bg-red-700"
                      >
                        削除
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </main>
  );
}
