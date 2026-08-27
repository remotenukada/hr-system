import BackLink from "@/components/BackLink";
import Link from "next/link";

export default function MastersPage() {
  const menus = [
    {
      href: "/work-schedule-masters",
      name: "勤務帯マスタ",
    },
    {
      href: "/allowance-masters",
      name: "手当マスタ",
    },
    {
      href: "/employment-category-masters",
      name: "雇用形態マスタ",
    },
    {
      href: "/contract-type-masters",
      name: "契約区分マスタ",
    },
    {
      href: "/job-title-masters",
      name: "職種マスタ",
    },
    {
      href: "/position-masters",
      name: "役職マスタ",
    },
    {
      href: "/leave-type-masters",
      name: "休暇種別マスタ",
    },
    {
      href: "/annual-leave-service-rules",
      name: "年次有給付与ルール",
    },
    {
      href: "/annual-leave-entry-rules",
      name: "入職月別有給付与ルール",
    },
    {
      href: "/annual-leave-entry-rules",
      name: "入職月別有給付与ルール",
    },
  ];

  return (
    <main className="mx-auto max-w-4xl p-6">
      <BackLink href="/" label="ダッシュボードへ戻る" />
      <h1 className="mb-6 text-2xl font-bold">マスタ管理</h1>

      <div className="grid gap-4 md:grid-cols-2">
        {menus.map((menu) => (
          <Link
            key={menu.href}
            href={menu.href}
            className="block rounded-lg border p-6 transition hover:border-blue-500 hover:shadow-md"
          >
            <div className="text-lg font-semibold">{menu.name}</div>
          </Link>
        ))}
      </div>
    </main>
  );
}
