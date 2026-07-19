import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function NewRequestPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div style={{ padding: "24px", fontFamily: "sans-serif" }}>
      <h1 style={{ fontSize: "24px", marginBottom: "16px" }}>新規申請作成</h1>
      <p style={{ color: "#666" }}>各種申請（休暇・住所変更など）の入力画面を準備中...</p>
    </div>
  );
}
