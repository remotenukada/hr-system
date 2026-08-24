import BackLink from "@/components/BackLink";
import { prisma } from "@/lib/prisma";
import { saveCompanySetting } from "@/app/actions/company-setting";
import { DirtySubmitButton } from "@/components/DirtySubmitButton";

export default async function CompanySettingsPage() {
  const current = await prisma.companySetting.findFirst();

  return (
    <main className="mx-auto max-w-4xl p-6">
      <BackLink href="/" label="ダッシュボードへ戻る" />
      <h1 className="mb-6 text-2xl font-bold">
        会社設定
      </h1>

      <form
        action={saveCompanySetting}
        className="space-y-6 rounded-lg border bg-white p-6 shadow-sm"
      >
        <div>
          <label className="mb-1 block text-sm font-medium">
            会社名 <span className="text-red-500">*</span>
          </label>
          <input
            name="companyName"
            type="text"
            required
            defaultValue={current?.companyName ?? ""}
            className="w-full rounded border p-2"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">
            郵便番号
          </label>
          <input
            name="postalCode"
            type="text"
            defaultValue={current?.postalCode ?? ""}
            className="w-full rounded border p-2"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">
            所在地
          </label>
          <input
            name="address"
            type="text"
            defaultValue={current?.address ?? ""}
            className="w-full rounded border p-2"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">
            電話番号
          </label>
          <input
            name="phoneNumber"
            type="text"
            defaultValue={current?.phoneNumber ?? ""}
            className="w-full rounded border p-2"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">
            代表者名
          </label>
          <input
            name="representativeName"
            type="text"
            defaultValue={current?.representativeName ?? ""}
            className="w-full rounded border p-2"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">
            招待メール送信元
          </label>
          <input
            name="mailFrom"
            type="email"
            defaultValue={current?.mailFrom ?? ""}
            className="w-full rounded border p-2"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">
            相談窓口
          </label>
          <input
            name="consultationDesk"
            type="text"
            defaultValue={current?.consultationDesk ?? ""}
            className="w-full rounded border p-2"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">
            就業規則確認方法
          </label>
          <input
            name="workRuleLocation"
            type="text"
            defaultValue={current?.workRuleLocation ?? ""}
            className="w-full rounded border p-2"
          />
        </div>


        <div>
          <label className="mb-1 block text-sm font-medium">
            電子印鑑（PNG）
          </label>
          <input
            name="sealImage"
            type="file"
            accept="image/png"
            className="w-full rounded border p-2"
          />
        </div>

        <div className="flex justify-end">
          <DirtySubmitButton
            label="保存する"
            pendingLabel="保存中..."
          />
        </div>
      </form>
    </main>
  );
}
