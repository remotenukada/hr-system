import NextAuth from "next-auth";
import authConfig from "./auth.config";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const isLoggedIn = Boolean(req.auth);
  const pathname = req.nextUrl.pathname;

  const isLoginPage = pathname === "/login";

  const isPublicPage =
    pathname === "/fy-nexus-one-logo.svg" ||
    pathname.startsWith("/register/");

  if (isLoginPage && isLoggedIn) {
    return Response.redirect(new URL("/", req.nextUrl));
  }

  if (!isLoggedIn && !isLoginPage && !isPublicPage) {
    return Response.redirect(new URL("/login", req.nextUrl));
  }
});

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
