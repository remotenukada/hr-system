import BackLink from "@/components/BackLink";
import Link from "next/link";

import { requireHRManager } from "@/lib/auth-guard";

const permissions = [
  ["社員一覧閲覧", "○", "○", "○", "×"],
  ["社員詳細閲覧", "○", "○", "○", "×"],
  ["社員登録", "○", "○", "×", "×"],
  ["社員編集", "○", "○", "×", "×"],

  ["マスタ管理", "○", "○", "×", "×"],
  ["勤務帯マスタ管理", "○", "○", "×", "×"],
  ["手当マスタ管理", "○", "○", "×", "×"],
  ["雇用形態マスタ管理", "○", "○", "×", "×"],
  ["契約区分マスタ管理", "○", "○", "×", "×"],
  ["職種マスタ管理", "○", "○", "×", "×"],
  ["役職マスタ管理", "○", "○", "×", "×"],

  ["雇用条件書閲覧", "○", "○", "○", "△"],
  ["雇用条件書作成", "○", "○", "×", "×"],
  ["雇用条件書編集", "○", "○", "×", "×"],
  ["雇用条件書PDF出力", "○", "○", "○", "△"],
  ["雇用条件書テンプレート管理", "○", "○", "×", "×"],
  ["部署管理", "○", "○", "×", "×"],
  ["有給レポート", "○", "○", "○", "×"],
  ["申請承認", "○", "○", "○", "×"],
  ["口座情報確認", "○", "○", "×", "×"],
  ["特定個人情報等（マイナンバー等）確認", "○", "○", "×", "×"],
  ["休職・復職管理", "○", "○", "×", "×"],
  ["退職管理", "○", "○", "×", "×"],
  ["組織変更履歴", "○", "○", "×", "×"],
  ["人事異動一覧", "○", "○", "×", "×"],
  ["監査ログ", "○", "○", "×", "×"],
  ["ユーザー管理", "○", "×", "×", "×"],
  ["マイページ", "○", "○", "○", "○"],
];

export default async function RolePermissionsPage() {
  await requireHRManager();

  return (
    <main className="mx-auto max-w-7xl p-8">
      <BackLink href="/" label="ダッシュボードへ戻る" />
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">権限マトリクス</h1>

          <p className="mt-2 text-sm text-gray-500">
            各ロールが利用できる機能を確認できます。
          </p>
        </div>
      </div>

      <div className="mb-8 grid gap-4 md:grid-cols-4">
        <div className="rounded-lg border bg-white p-4 shadow-sm">
          <h3 className="font-semibold text-red-700">システム管理者</h3>
          <p className="mt-2 text-sm text-gray-600">システム管理者</p>
        </div>

        <div className="rounded-lg border bg-white p-4 shadow-sm">
          <h3 className="font-semibold text-blue-700">人事管理者</h3>
          <p className="mt-2 text-sm text-gray-600">人事担当者</p>
        </div>

        <div className="rounded-lg border bg-white p-4 shadow-sm">
          <h3 className="font-semibold text-green-700">部署責任者</h3>
          <p className="mt-2 text-sm text-gray-600">所属長</p>
        </div>

        <div className="rounded-lg border bg-white p-4 shadow-sm">
          <h3 className="font-semibold text-gray-700">一般利用者</h3>
          <p className="mt-2 text-sm text-gray-600">一般利用者</p>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50">
              <th className="border-b p-3 text-left font-medium text-gray-700">
                機能
              </th>
              <th className="border-b p-3 text-center font-medium text-gray-700">
                ADMIN
              </th>
              <th className="border-b p-3 text-center font-medium text-gray-700">
                HR_MANAGER
              </th>
              <th className="border-b p-3 text-center font-medium text-gray-700">
                MANAGER
              </th>
              <th className="border-b p-3 text-center font-medium text-gray-700">
                USER
              </th>
            </tr>
          </thead>

          <tbody>
            {permissions.map((row) => (
              <tr key={row[0]} className="hover:bg-gray-50">
                <td className="border-b p-3 font-medium">{row[0]}</td>

                <td className="border-b p-3 text-center">{row[1]}</td>

                <td className="border-b p-3 text-center">{row[2]}</td>

                <td className="border-b p-3 text-center">{row[3]}</td>

                <td className="border-b p-3 text-center">{row[4]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
