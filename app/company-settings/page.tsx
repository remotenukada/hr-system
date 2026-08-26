import BackLink from "@/components/BackLink";
import { prisma } from "@/lib/prisma";
import { saveCompanySetting } from "@/app/actions/company-setting";
import { DirtySubmitButton } from "@/components/DirtySubmitButton";

type Props = {
  searchParams: Promise<{
    smtpTest?: string;
    smtpMessage?: string;
  }>;
};

export default async function CompanySettingsPage({ searchParams }: Props) {
  const current = await prisma.companySetting.findFirst();
  const params = await searchParams;

  return (
    <main className="mx-auto max-w-4xl p-6">
      <BackLink href="/" label="ダッシュボードへ戻る" />
      <h1 className="mb-6 text-2xl font-bold">会社設定</h1>

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
          <label className="mb-1 block text-sm font-medium">郵便番号</label>
          <input
            name="postalCode"
            type="text"
            defaultValue={current?.postalCode ?? ""}
            className="w-full rounded border p-2"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">所在地</label>
          <input
            name="address"
            type="text"
            defaultValue={current?.address ?? ""}
            className="w-full rounded border p-2"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">電話番号</label>
          <input
            name="phoneNumber"
            type="text"
            defaultValue={current?.phoneNumber ?? ""}
            className="w-full rounded border p-2"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">代表者名</label>
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

        <hr className="my-6" />

        <h2 className="text-lg font-semibold">メール設定</h2>

        <div>
          <label className="mb-1 block text-sm font-medium">SMTPホスト</label>
          <input
            name="smtpHost"
            type="text"
            defaultValue={current?.smtpHost ?? ""}
            className="w-full rounded border p-2"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">SMTPポート</label>
          <input
            name="smtpPort"
            type="number"
            defaultValue={current?.smtpPort ?? ""}
            className="w-full rounded border p-2"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">SMTPユーザー</label>
          <input
            name="smtpUser"
            type="text"
            defaultValue={current?.smtpUser ?? ""}
            className="w-full rounded border p-2"
          />
        </div>

        <label className="flex items-center gap-2">
          <input
            name="smtpSecure"
            type="checkbox"
            defaultChecked={current?.smtpSecure ?? false}
          />
          SSL/TLSを使用
        </label>

        <div>
          <label className="mb-1 block text-sm font-medium">相談窓口</label>
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
          <DirtySubmitButton label="保存する" pendingLabel="保存中..." />
        </div>
      </form>

      <section className="mt-6 rounded-lg border bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold">SMTP接続テスト</h2>

        <p className="mt-1 text-sm text-gray-600">
          保存済みメール設定と環境変数のパスワードで接続を確認します。
        </p>

        {params.smtpTest === "success" && (
          <p className="mt-4 rounded bg-green-50 p-3 text-green-700">
            SMTP接続に成功しました。
          </p>
        )}

        {params.smtpTest === "error" && (
          <p className="mt-4 rounded bg-red-50 p-3 text-red-700">
            SMTP接続に失敗しました。
            {params.smtpMessage ? ` ${params.smtpMessage}` : ""}
          </p>
        )}

        <form
          action="/api/company-settings/test-smtp"
          method="POST"
          className="mt-4"
        >
          <button
            type="submit"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            SMTP接続テスト
          </button>
        </form>
      </section>
    </main>
  );
}
