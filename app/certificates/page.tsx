import Link from "next/link";

const cards = [
  {
    href: "/certificates/employment",
    title: "在職証明書",
    description: "職員を選択して在職証明書を発行します。",
  },
  {
    href: "/certificates/retirement",
    title: "退職証明書",
    description: "職員を選択して退職証明書を発行します。",
  },
];

export default function CertificateCenterPage() {
  return (
    <main className="mx-auto max-w-5xl p-6">
      <h1 className="mb-2 text-3xl font-bold">証明書センター</h1>
      <p className="mb-8 text-gray-600">
        発行する証明書を選択してください。
      </p>

      <div className="grid gap-6 md:grid-cols-2">
        {cards.map((card) => (
          <Link key={card.href} href={card.href}>
            <h2 className="mb-3 text-xl font-semibold">{card.title}</h2>
            <p className="mb-6 text-sm text-gray-600">
              {card.description}
            </p>
            <span className="inline-flex rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white">
              職員を選択
            </span>
          </Link>
        ))}
      </div>
    </main>
  );
}
