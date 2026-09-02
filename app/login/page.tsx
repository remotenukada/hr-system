"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Auth.js の signIn メソッドを呼び出す
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false, // 自前でリダイレクトを制御する
      });

      if (result?.error) {
        setError("メールアドレスまたはパスワードが正しくありません。");
      } else {
        // ログイン成功！ トップページへ
        router.push("/");
        router.refresh();
      }
    } catch {
      setError("予期せぬエラーが発生しました。");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.logoWrap}>
          <Image
            src="/fy-nexus-one-logo.svg"
            alt="FY Nexus One Logo"
            style={styles.logoImage}
            priority
          />
          <p
            style={{
              marginTop: "6px",
              marginBottom: "10px",
              fontSize: "11px",
              color: "#94A3B8",
              letterSpacing: "0.08em",
            }}
          >
            Version 1.0
          </p>

          <p style={styles.subtitle}>サインインしてください</p>
        </div>

        {error && <div style={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>メールアドレス</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              required
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>パスワード</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              style={styles.input}
            />
          </div>

          <button type="submit" disabled={loading} style={styles.button}>
            {loading ? "ログイン中..." : "ログイン"}
          </button>
        </form>
      </div>
    </div>
  );
}

// 簡易的なインラインスタイル（CSSフレームワークがなくても綺麗に見えるように）
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f5f7fb",
    fontFamily: "sans-serif",
  },
  card: {
    backgroundColor: "#fff",
    padding: "40px",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    width: "100%",
    maxWidth: "400px",
  },
  logoWrap: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    marginBottom: "24px",
  },
  logoImage: {
    display: "block",
    width: "100%",
    maxWidth: "320px",
    height: "auto",
  },
  title: {
    margin: "0 0 8px 0",
    textAlign: "center" as const,
    fontSize: "24px",
    color: "#333",
  },
  subtitle: {
    margin: "0 0 24px 0",
    textAlign: "center" as const,
    color: "#666",
    fontSize: "14px",
  },
  form: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "16px",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "6px",
  },
  label: {
    fontSize: "14px",
    fontWeight: "bold",
    color: "#444",
  },
  input: {
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },
  button: {
    padding: "12px",
    borderRadius: "4px",
    border: "none",
    backgroundColor: "#0070f3",
    color: "#fff",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: "8px",
  },
  error: {
    backgroundColor: "#ffebee",
    color: "#c62828",
    padding: "10px",
    borderRadius: "4px",
    fontSize: "14px",
    marginBottom: "16px",
    textAlign: "center" as const,
  },
};
