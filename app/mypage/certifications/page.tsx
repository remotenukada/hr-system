import Link from "next/link";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { randomUUID } from "crypto";
import path from "path";
import { mkdir, writeFile, unlink } from "fs/promises";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import CertificationAttachmentFields from "@/components/CertificationAttachmentFields";

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

async function getCurrentEmployee() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const employee = await prisma.employee.findUnique({
    where: {
      userId: session.user.id,
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
    redirect("/mypage");
  }

  return employee;
}

type Props = {
  searchParams: Promise<{
    error?: string;
  }>;
};

export default async function MyCertificationsPage({
  searchParams,
}: Props) {
  const employee = await getCurrentEmployee();
  const { error } = await searchParams;

  const certifications = await prisma.certification.findMany({
    orderBy: {
      name: "asc",
    },
  });

  async function addMyCertification(formData: FormData) {
    "use server";

    const currentEmployee = await getCurrentEmployee();

    const selectedCertificationId = String(
      formData.get("certificationId") ?? "",
    ).trim();

    const newCertificationName = String(
      formData.get("newCertificationName") ?? "",
    ).trim();

    const acquiredDateRaw = String(
      formData.get("acquiredDate") ?? "",
    );

    const expiryDateRaw = String(
      formData.get("expiryDate") ?? "",
    );

    if (!selectedCertificationId && !newCertificationName) {
      redirect("/mypage/certifications?error=required");
    }

    let targetCertificationId = selectedCertificationId;

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

    const existing =
      await prisma.employeeCertification.findUnique({
        where: {
          employeeId_certificationId: {
            employeeId: currentEmployee.id,
            certificationId: targetCertificationId,
          },
        },
      });

    if (existing) {
      redirect("/mypage/certifications?error=duplicate");
    }

    const certificationInfo =
      await prisma.certification.findUnique({
        where: {
          id: targetCertificationId,
        },
        select: {
          name: true,
        },
      });

    const isDoctorCertification =
      certificationInfo?.name.trim() === "医師";

    const doctorFiles = [
      formData.get("doctorLicenseFile"),
      formData.get("clinicalTrainingFile"),
      formData.get("insuranceDoctorFile"),
    ];

    if (
      isDoctorCertification &&
      doctorFiles.some(
        (file) => !(file instanceof File) || file.size === 0,
      )
    ) {
      redirect("/mypage/certifications?error=doctorAttachments");
    }

    const files = isDoctorCertification
      ? doctorFiles
      : formData.getAll("certificateFiles");

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
        redirect("/mypage/certifications?error=invalidFile");
      }

      if (file.size > 5 * 1024 * 1024) {
        redirect("/mypage/certifications?error=fileTooLarge");
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

      const storedFileName =
        `${currentEmployee.id}-${targetCertificationId}-${randomUUID()}${extension}`;

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
        employeeId: currentEmployee.id,
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

    revalidatePath("/mypage");
    revalidatePath("/mypage/certifications");

    redirect("/mypage/certifications");
  }

  async function deleteMyCertification(formData: FormData) {
    "use server";

    const currentEmployee = await getCurrentEmployee();

    const employeeCertificationId = String(
      formData.get("employeeCertificationId") ?? "",
    ).trim();

    if (!employeeCertificationId) {
      redirect("/mypage/certifications");
    }

    await prisma.employeeCertification.deleteMany({
      where: {
        id: employeeCertificationId,
        employeeId: currentEmployee.id,
      },
    });

    revalidatePath("/mypage");
    revalidatePath("/mypage/certifications");

    redirect("/mypage/certifications");
  }

  async function deleteMyCertificationAttachment(formData: FormData) {
    "use server";

    const currentEmployee = await getCurrentEmployee();

    const attachmentId = String(
      formData.get("attachmentId") ?? "",
    ).trim();

    if (!attachmentId) {
      redirect("/mypage/certifications");
    }

    const attachment =
      await prisma.employeeCertificationAttachment.findFirst({
        where: {
          id: attachmentId,
          employeeCertification: {
            employeeId: currentEmployee.id,
          },
        },
      });

    if (!attachment) {
      redirect("/mypage/certifications");
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

    revalidatePath("/mypage");
    revalidatePath("/mypage/certifications");

    redirect("/mypage/certifications");
  }

  return (
    <main className="mx-auto max-w-5xl p-8">
      <div className="mb-6">
        <Link href="/mypage" className="text-sm text-blue-600 hover:underline">
          ← ダッシュボードへ戻る
        </Link>

        <h1 className="mt-2 text-3xl font-bold">
          自分の資格・免許証
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          保有資格の登録、資格証・免許証ファイルの添付ができます。
        </p>
      </div>

      {error === "doctorAttachments" && (
        <div className="mb-4 max-w-xl rounded border border-red-300 bg-red-50 p-3 text-sm text-red-700">
          医師資格登録には「医師免許証」「臨床研修修了登録証」
          「保険医登録票」の3点すべてが必要です。
        </div>
      )}

      <section className="mb-8 max-w-xl rounded border bg-white p-6">
        <h2 className="mb-4 text-xl font-bold">
          資格を追加
        </h2>

        <form action={addMyCertification} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">
              資格を選択
            </label>

            <select
              name="certificationId"
              className="w-full rounded border p-2"
            >
              <option value="">選択してください</option>
              {certifications.map((certification) => (
                <option key={certification.id} value={certification.id}>
                  {certification.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              または新しい資格名を入力
            </label>

            <input
              name="newCertificationName"
              className="w-full rounded border p-2"
              placeholder="例: 認知症ケア専門士"
            />

            <p className="mt-1 text-xs text-gray-500">
              入力した場合は、プルダウンよりこちらを優先します。
            </p>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              取得日
            </label>

            <input
              type="date"
              name="acquiredDate"
              className="w-full rounded border p-2"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              有効期限
            </label>

            <input
              type="date"
              name="expiryDate"
              className="w-full rounded border p-2"
            />
          </div>

          <CertificationAttachmentFields />

          <button
            type="submit"
            className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            登録
          </button>
        </form>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-bold">
          登録済み資格
        </h2>

        {employee.certifications.length === 0 ? (
          <p className="text-sm text-gray-500">
            登録済みの資格はありません。
          </p>
        ) : (
          <table className="w-full border-collapse border text-sm">
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
                  <td className="border p-2">
                    {item.certification.name}
                  </td>

                  <td className="border p-2">
                    {formatDate(item.acquiredDate)}
                  </td>

                  <td className="border p-2">
                    {formatDate(item.expiryDate)}
                  </td>

                  <td className="border p-2">
                    {item.employeeCertificationAttachments.length === 0 ? (
                      "-"
                    ) : (
                      <ul className="space-y-1">
                        {item.employeeCertificationAttachments.map((attachment) => (
                          <li
                            key={attachment.id}
                            className="flex items-center gap-2"
                          >
                            <a
                              href={`/api/certification-attachments/${attachment.id}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline"
                            >
                              {attachment.fileName}
                            </a>

                            <form action={deleteMyCertificationAttachment}>
                              <input
                                type="hidden"
                                name="attachmentId"
                                value={attachment.id}
                              />

                              <button
                                type="submit"
                                className="rounded bg-red-50 px-2 py-1 text-xs text-red-700 hover:bg-red-100"
                              >
                                削除
                              </button>
                            </form>
                          </li>
                        ))}
                      </ul>
                    )}
                  </td>

                  <td className="border p-2 text-center">
                    <form action={deleteMyCertification}>
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
