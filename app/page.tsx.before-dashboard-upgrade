import { auth, signOut } from "../auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const user = session.user;

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div>
          <h1 style={styles.title}>人事管理システム</h1>
          <p style={styles.welcome}>ようこそ、{user.name} さん（権限: {user.role}）</p>
        </div>
        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/login" });
          }}
        >
          <button type="submit" style={styles.logoutButton}>
            ログアウト
          </button>
        </form>
      </header>

      <main style={styles.main}>
        <div style={styles.grid}>
          <div style={styles.card}>
            <h3>各種申請の確認・作成</h3>
            <p>休暇申請、住所変更、各種申請の提出とステータス確認を行います。</p>
            <Link href="/requests" style={styles.link}>申請一覧へ →</Link>
          </div>

          {user.role === "ADMIN" && (
            <div style={{ ...styles.card, borderColor: "#0070f3" }}>
              <h3 style={{ color: "#0070f3" }}>【管理者専用】社員マスタ管理</h3>
              <p>社員の新規登録、所属部署の変更、アカウント権限の管理を行います。</p>
              <Link href="/employees" style={styles.link}>社員一覧へ →</Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

const styles = {
  container: { padding: "24px", fontFamily: "sans-serif", backgroundColor: "#f9fafb", minHeight: "100vh" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #e5e7eb", paddingBottom: "16px", marginBottom: "32px" },
  title: { margin: 0, fontSize: "24px", color: "#111827" },
  welcome: { margin: "4px 0 0 0", color: "#4b5563", fontSize: "14px" },
  logoutButton: { padding: "8px 16px", backgroundColor: "#ef4444", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" },
  main: { maxWidth: "1200px", margin: "0 auto" },
  grid: { display: "flex", gap: "24px", flexWrap: "wrap" as const },
  card: { backgroundColor: "#fff", padding: "24px", borderRadius: "8px", border: "1px solid #e5e7eb", width: "calc(50% - 12px)", minWidth: "300px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" },
  link: { display: "inline-block", marginTop: "16px", color: "#0070f3", textDecoration: "none", fontWeight: "bold" },
};
