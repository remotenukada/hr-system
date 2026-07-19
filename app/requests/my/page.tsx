import { auth } from "../../../auth";
import { prisma } from "../../../lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function MyRequestsPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  const user = session.user;

  const requests = await prisma.employeeRequest.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div style={{ padding: "24px", fontFamily: "sans-serif" }}>
      <h1 style={{ fontSize: "24px", marginBottom: "8px" }}>マイ申請履歴</h1>
      <p style={{ color: "#666", marginBottom: "24px" }}>あなたが提出した申請の一覧です。</p>

      {requests.length === 0 ? (
        <p style={{ color: "#999", fontStyle: "italic" }}>提出済みの申請はありません。</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "2px solid #ddd", textAlign: "left" }}>
              <th style={{ padding: "12px" }}>タイトル</th>
              <th style={{ padding: "12px" }}>種別</th>
              <th style={{ padding: "12px" }}>ステータス</th>
              <th style={{ padding: "12px" }}>申請日</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req.id} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "12px", fontWeight: "bold" }}>{req.title}</td>
                <td style={{ padding: "12px" }}>{req.type}</td>
                <td style={{ padding: "12px" }}>
                  <span style={{
                    padding: "4px 8px",
                    borderRadius: "4px",
                    fontSize: "12px",
                    backgroundColor: req.status === "APPROVED" ? "#e6f4ea" : req.status === "REJECTED" ? "#fce8e6" : "#ffe17d",
                    color: req.status === "APPROVED" ? "#137333" : req.status === "REJECTED" ? "#c5221f" : "#b06000"
                  }}>
                    {req.status}
                  </span>
                </td>
                <td style={{ padding: "12px", color: "#666" }}>
                  {new Date(req.createdAt).toLocaleDateString("ja-JP")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      
      <Link href="/" style={{ display: "inline-block", marginTop: "24px", color: "#0070f3", textDecoration: "none" }}>
        ← ダッシュボードに戻る
      </Link>
    </div>
  );
}
