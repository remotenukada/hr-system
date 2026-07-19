import { auth } from "./auth";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isLoginPage = req.nextUrl.pathname === "/login";

  // ログインページにいるのにログイン済みの場合は、ダッシュボードへ戻す
  if (isLoginPage && isLoggedIn) {
    return Response.redirect(new URL("/", req.nextUrl));
  }

  // ログインしていない、かつログインページ以外にアクセスしようとした場合はログインへ
  if (!isLoggedIn && !isLoginPage) {
    return Response.redirect(new URL("/login", req.nextUrl));
  }
});

export const config = {
  // 認証を適用するルート（静的ファイルやAPIなどを除外）
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
