import BackLink from "@/components/BackLink";
import Link from "next/link";
import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { updateEmploymentContractTemplate } from "@/app/actions/employment-contract-template";
import { DirtySubmitButton } from "@/components/DirtySubmitButton";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditEmploymentContractTemplatePage(
  { params }: Props,
) {
  const { id } = await params;

  const template =
    await prisma.employmentContractTemplate.findUnique({
      where: {
        id,
      },
    });

  if (!template) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-4xl p-6">
      <BackLink href="/employee-contract-templates" label="テンプレート一覧へ戻る" />

      <h1 className="mb-6 text-2xl font-bold">
        雇用条件書テンプレート編集
      </h1>

      <form action={updateEmploymentContractTemplate} className="space-y-6">
        <input
          type="hidden"
          name="id"
          value={template.id}
        />

        <div>
          <label className="mb-1 block text-sm font-medium">
            テンプレート名
          </label>
          <input
            name="name"
            required
            defaultValue={template.name}
            className="w-full rounded border p-2"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">
            契約区分
          </label>
          <input
            name="contractType"
            required
            defaultValue={template.contractType}
            className="w-full rounded border p-2"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div>
            <label className="mb-1 block text-sm font-medium">
              始業時刻
            </label>
            <input
              type="time"
              name="workStartTime"
              defaultValue={template.workStartTime}
              className="w-full rounded border p-2"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              終業時刻
            </label>
            <input
              type="time"
              name="workEndTime"
              defaultValue={template.workEndTime}
              className="w-full rounded border p-2"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              休憩時間（分）
            </label>
            <input
              type="number"
              name="breakMinutes"
              defaultValue={template.breakMinutes}
              className="w-full rounded border p-2"
            />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">
            休日ルール
          </label>
          <input
            name="holidayRule"
            defaultValue={template.holidayRule}
            className="w-full rounded border p-2"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">
            賃金形態
          </label>
          <select
            name="wageType"
            defaultValue={template.wageType}
            className="w-full rounded border p-2"
          >
            <option value="月給">月給</option>
            <option value="日給">日給</option>
            <option value="時給">時給</option>
            <option value="その他">その他</option>
          </select>
        </div>

        <section className="space-y-4 rounded-lg border bg-gray-50 p-5">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              労務・福利厚生条件
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              常勤・非常勤など、テンプレートごとの条件を設定します。
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium">
                昇給
              </label>
              <textarea
                name="raiseRule"
                rows={3}
                defaultValue={template.raiseRule ?? ""}
                className="w-full rounded border p-2"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">
                賞与
              </label>
              <textarea
                name="bonusRule"
                rows={3}
                defaultValue={template.bonusRule ?? ""}
                className="w-full rounded border p-2"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">
                退職事項
              </label>
              <textarea
                name="retirementRule"
                rows={3}
                defaultValue={template.retirementRule ?? ""}
                className="w-full rounded border p-2"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">
                退職金
              </label>
              <textarea
                name="retirementAllowanceRule"
                rows={3}
                defaultValue={template.retirementAllowanceRule ?? ""}
                className="w-full rounded border p-2"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">
                社会保険
              </label>
              <textarea
                name="socialInsuranceRule"
                rows={3}
                defaultValue={template.socialInsuranceRule ?? ""}
                className="w-full rounded border p-2"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">
                雇用保険
              </label>
              <textarea
                name="employmentInsuranceRule"
                rows={3}
                defaultValue={template.employmentInsuranceRule ?? ""}
                className="w-full rounded border p-2"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">
                相談窓口
              </label>
              <textarea
                name="consultationDesk"
                rows={3}
                defaultValue={template.consultationDesk ?? ""}
                className="w-full rounded border p-2"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">
                就業規則保管場所・確認方法
              </label>
              <textarea
                name="workRuleLocation"
                rows={3}
                defaultValue={template.workRuleLocation ?? ""}
                className="w-full rounded border p-2"
              />
            </div>
          </div>
        </section>

        <div>
          <label className="mb-1 block text-sm font-medium">
            試用期間
          </label>
          <input
            name="probationPeriod"
            defaultValue={template.probationPeriod ?? ""}
            className="w-full rounded border p-2"
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="isActive"
            name="isActive"
            defaultChecked={template.isActive}
            className="h-4 w-4 rounded border-gray-300"
          />
          <label htmlFor="isActive" className="text-sm font-medium">
            有効にする
          </label>
        </div>

        <div className="flex justify-end gap-3">
          <Link
            href="/employee-contract-templates"
            className="rounded border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            キャンセル
          </Link>

          <DirtySubmitButton
            label="更新する"
            pendingLabel="更新中..."
          />
        </div>
      </form>
    </main>
  );
}
