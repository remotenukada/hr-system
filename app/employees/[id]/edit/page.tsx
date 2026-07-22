import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import {
  Gender,
  EmploymentType,
  EmployeeStatus,
} from "@/generated/prisma";
import PhotoUploadField from "./PhotoUploadField";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

function toDateInputValue(date: Date | null) {
  if (!date) return "";
  return new Date(date).toISOString().slice(0, 10);
}

export default async function EmployeeEditPage({ params }: Props) {
  const { id } = await params;

  const employee = await prisma.employee.findUnique({
    where: {
      id,
    },
  });

  if (!employee) {
    notFound();
  }

  const departments = await prisma.department.findMany({
    orderBy: {
      name: "asc",
    },
  });

  async function updateEmployee(formData: FormData) {
    "use server";

    const employeeNo = formData.get("employeeNo") as string;
    const lastName = formData.get("lastName") as string;
    const firstName = formData.get("firstName") as string;
    const email = formData.get("email") as string;
    const departmentId = formData.get("departmentId") as string;

    const lastNameKana = formData.get("lastNameKana") as string;
    const firstNameKana = formData.get("firstNameKana") as string;
    const genderRaw = formData.get("gender") as string;
    const birthDate = formData.get("birthDate") as string;
    const phoneNumber = formData.get("phoneNumber") as string;
    const address = formData.get("address") as string;
    const occupation = formData.get("occupation") as string;
    const position = formData.get("position") as string;
    const hireDate = formData.get("hireDate") as string;
    const retirementDate = formData.get("retirementDate") as string;
    const employmentTypeRaw = formData.get("employmentType") as string;
    const commutingType = formData.get("commutingType") as string;
    const statusRaw = formData.get("status") as string;
    const healthInsuranceNo = formData.get("healthInsuranceNo") as string;
    const employmentInsuranceNo = formData.get("employmentInsuranceNo") as string;
    const photoPath = formData.get("photoPath") as string;

    await prisma.employee.update({
      where: {
        id,
      },
      data: {
        employeeNo,
        lastName,
        firstName,
        email,

        lastNameKana: lastNameKana || null,
        firstNameKana: firstNameKana || null,

        gender: genderRaw ? (genderRaw as Gender) : null,
        birthDate: birthDate ? new Date(birthDate) : null,

        phoneNumber: phoneNumber || null,
        address: address || null,

        departmentId: departmentId || null,
        occupation: occupation || null,
        position: position || null,

        hireDate: hireDate ? new Date(hireDate) : null,
        retirementDate: retirementDate ? new Date(retirementDate) : null,

        employmentType: employmentTypeRaw
          ? (employmentTypeRaw as EmploymentType)
          : null,

        commutingType: commutingType || null,

        status: statusRaw ? (statusRaw as EmployeeStatus) : "ACTIVE",

        healthInsuranceNo: healthInsuranceNo || null,
        employmentInsuranceNo: employmentInsuranceNo || null,
        photoPath: photoPath || employee.photoPath || null,
      },
    });

    revalidatePath(`/employees/${id}`);
    revalidatePath("/employees");

    redirect(`/employees/${id}`);
  }

  return (
    <main className="mx-auto max-w-3xl p-8">
      <div className="rounded-lg border bg-white p-6 shadow-sm">
        <h1 className="mb-6 text-2xl font-bold text-slate-800">
          社員編集
        </h1>

        <form action={updateEmployee} className="space-y-6">
          <section className="space-y-4">
            <h2 className="border-b pb-1 text-sm font-semibold text-slate-500">
              基本情報
            </h2>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-700">
                  社員番号 <span className="text-red-500">*</span>
                </label>
                <input
                  required
                  name="employeeNo"
                  defaultValue={employee.employeeNo}
                  className="w-full rounded border p-2 focus:outline-indigo-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-slate-700">
                  メールアドレス <span className="text-red-500">*</span>
                </label>
                <input
                  required
                  type="email"
                  name="email"
                  defaultValue={employee.email}
                  className="w-full rounded border p-2 focus:outline-indigo-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-slate-700">
                  氏名（漢字） <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-2">
                  <input
                    required
                    name="lastName"
                    defaultValue={employee.lastName}
                    className="w-full rounded border p-2 focus:outline-indigo-500"
                    placeholder="姓"
                  />
                  <input
                    required
                    name="firstName"
                    defaultValue={employee.firstName}
                    className="w-full rounded border p-2 focus:outline-indigo-500"
                    placeholder="名"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-slate-700">
                  氏名（ふりがな）
                </label>
                <div className="flex gap-2">
                  <input
                    name="lastNameKana"
                    defaultValue={employee.lastNameKana ?? ""}
                    className="w-full rounded border p-2 focus:outline-indigo-500"
                    placeholder="姓（ふりがな）"
                  />
                  <input
                    name="firstNameKana"
                    defaultValue={employee.firstNameKana ?? ""}
                    className="w-full rounded border p-2 focus:outline-indigo-500"
                    placeholder="名（ふりがな）"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-slate-700">
                  性別
                </label>
                <select
                  name="gender"
                  defaultValue={employee.gender ?? ""}
                  className="w-full rounded border bg-white p-2 focus:outline-indigo-500"
                >
                  <option value="">性別を選択</option>
                  <option value="MALE">男性</option>
                  <option value="FEMALE">女性</option>
                  <option value="OTHER">その他</option>
                </select>
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-slate-700">
                  生年月日
                </label>
                <input
                  type="date"
                  name="birthDate"
                  defaultValue={toDateInputValue(employee.birthDate)}
                  className="w-full rounded border p-2 focus:outline-indigo-500"
                />
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="border-b pb-1 text-sm font-semibold text-slate-500">
              連絡先・住所
            </h2>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-700">
                  電話番号
                </label>
                <input
                  name="phoneNumber"
                  defaultValue={employee.phoneNumber ?? ""}
                  className="w-full rounded border p-2 focus:outline-indigo-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="mb-1 block text-xs font-medium text-slate-700">
                  住所
                </label>
                <textarea
                  name="address"
                  rows={2}
                  defaultValue={employee.address ?? ""}
                  className="w-full resize-none rounded border p-2 focus:outline-indigo-500"
                />
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="border-b pb-1 text-sm font-semibold text-slate-500">
              組織・雇用情報
            </h2>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-700">
                  部署
                </label>
                <select
                  name="departmentId"
                  defaultValue={employee.departmentId ?? ""}
                  className="w-full rounded border bg-white p-2 focus:outline-indigo-500"
                >
                  <option value="">部署を選択（未所属）</option>
                  {departments.map((department) => (
                    <option key={department.id} value={department.id}>
                      {department.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-slate-700">
                  職種
                </label>
                <input
                  name="occupation"
                  defaultValue={employee.occupation ?? ""}
                  className="w-full rounded border p-2 focus:outline-indigo-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-slate-700">
                  役職
                </label>
                <input
                  name="position"
                  defaultValue={employee.position ?? ""}
                  className="w-full rounded border p-2 focus:outline-indigo-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-slate-700">
                  雇用形態
                </label>
                <select
                  name="employmentType"
                  defaultValue={employee.employmentType ?? ""}
                  className="w-full rounded border bg-white p-2 focus:outline-indigo-500"
                >
                  <option value="">雇用形態を選択</option>
                  <option value="FULL_TIME">正職員</option>
                  <option value="CONTRACT">契約職員</option>
                  <option value="PART_TIME">パート</option>
                  <option value="TEMPORARY">派遣</option>
                </select>
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-slate-700">
                  入職日
                </label>
                <input
                  type="date"
                  name="hireDate"
                  defaultValue={toDateInputValue(employee.hireDate)}
                  className="w-full rounded border p-2 focus:outline-indigo-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-slate-700">
                  退職日
                </label>
                <input
                  type="date"
                  name="retirementDate"
                  defaultValue={toDateInputValue(employee.retirementDate)}
                  className="w-full rounded border p-2 focus:outline-indigo-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-slate-700">
                  通勤区分
                </label>
                <input
                  name="commutingType"
                  defaultValue={employee.commutingType ?? ""}
                  className="w-full rounded border p-2 focus:outline-indigo-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-slate-700">
                  ステータス
                </label>
                <select
                  name="status"
                  defaultValue={employee.status ?? "ACTIVE"}
                  className="w-full rounded border bg-white p-2 focus:outline-indigo-500"
                >
                  <option value="ACTIVE">在職</option>
                  <option value="LEAVE">休職</option>
                  <option value="RETIRED">退職</option>
                </select>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="border-b pb-1 text-sm font-semibold text-slate-500">
              保険情報
            </h2>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-700">
                  被保険者番号
                </label>
                <input
                  name="healthInsuranceNo"
                  defaultValue={employee.healthInsuranceNo ?? ""}
                  className="w-full rounded border p-2 focus:outline-indigo-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-slate-700">
                  雇用保険番号
                </label>
                <input
                  name="employmentInsuranceNo"
                  defaultValue={employee.employmentInsuranceNo ?? ""}
                  className="w-full rounded border p-2 focus:outline-indigo-500"
                />
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="border-b pb-1 text-sm font-semibold text-slate-500">
              プロフィール写真
            </h2>

            <div className="space-y-3">
              {employee.photoPath && (
                <div>
                  <p className="mb-2 text-xs font-medium text-slate-700">
                    現在の写真
                  </p>
                  <img
                    src={employee.photoPath}
                    alt="プロフィール写真"
                    className="h-20 w-20 rounded-full object-cover border"
                  />
                </div>
              )}

              <PhotoUploadField initialPath={employee.photoPath} />
            </div>
          </section>

          <div className="flex justify-end border-t pt-4">
            <button
              type="submit"
              className="rounded bg-blue-600 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
            >
              更新する
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
