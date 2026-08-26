import Link from "next/link";

type Props = {
  pendingBankAccounts: number;
  pendingMyNumbers: number;
  userRole: string;
};

export default function HRManagementMenu({
  pendingBankAccounts,
  pendingMyNumbers,
  userRole,
}: Props) {
  return (
    <div className="space-y-6">
      <section className="rounded-lg border bg-gray-50 p-4">
        <h4 className="mb-2 font-semibold">職員管理</h4>
        <div className="flex flex-wrap gap-3">
          <Link href="/employees">社員一覧</Link>
          <Link href="/employees/new">新規社員登録</Link>
          <Link href="/departments">部署一覧</Link>
        </div>
      </section>

      <section className="rounded-lg border bg-gray-50 p-4">
        <h4 className="mb-2 font-semibold">人事異動・組織</h4>
        <div className="flex flex-wrap gap-3">
          <Link href="/personnel-orders">人事発令管理</Link>
          <Link href="/employee-transfers">異動履歴一覧</Link>
          <Link href="/organization-history">組織変更履歴レポート</Link>
        </div>
      </section>

      <section className="rounded-lg border bg-gray-50 p-4">
        <h4 className="mb-2 font-semibold">労務管理</h4>
        <div className="flex flex-wrap gap-3">
          <Link href="/employee-leaves">休職・復職管理</Link>
          <Link href="/employee-retirements">退職管理</Link>
          <Link href="/retirement-management">退職予定者管理</Link>
        </div>
      </section>

      <section className="rounded-lg border bg-gray-50 p-4">
        <h4 className="mb-2 font-semibold">有給管理</h4>
        <div className="flex flex-wrap gap-3">
          <Link href="/leave-balances">有給管理一覧</Link>
          <Link href="/leave-grants">有給付与履歴</Link>
          <Link href="/leave-grants/pending">有給付与対象者一覧</Link>
          <Link href="/leave-expiration">有給失効管理</Link>
        </div>
      </section>

      <section className="rounded-lg border bg-gray-50 p-4">
        <h4 className="mb-2 font-semibold">雇用契約・証明書</h4>
        <div className="flex flex-wrap gap-3">
          <Link href="/employee-contracts/new">雇用契約書作成</Link>
          <Link href="/employee-contracts">雇用契約書一覧</Link>
          <Link href="/employee-contract-templates">雇用契約テンプレート</Link>
          <Link href="/certificates">証明書センター</Link>
        </div>
      </section>

      <section className="rounded-lg border bg-gray-50 p-4">
        <h4 className="mb-2 font-semibold">申請・本人確認</h4>
        <div className="flex flex-wrap gap-3">
          <Link href="/bank-accounts">
            口座情報確認 ({pendingBankAccounts})
          </Link>
          <Link href="/my-numbers">マイナンバー確認 ({pendingMyNumbers})</Link>
        </div>
      </section>

      <section className="rounded-lg border bg-gray-50 p-4">
        <h4 className="mb-2 font-semibold">システム管理</h4>
        <div className="flex flex-wrap gap-3">
          <Link href="/audit-logs">監査ログ一覧</Link>
          <Link href="/role-permissions">権限マトリクス</Link>
          <Link href="/masters">マスタ管理</Link>
          <Link href="/company-settings">会社設定</Link>

          {userRole === "ADMIN" && (
            <>
              <Link href="/users">ユーザー管理</Link>
              <Link href="/user-invitations">ユーザー招待</Link>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
