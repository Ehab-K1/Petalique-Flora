import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PROTECTED_ROUTES = {
  "/account": ["CUSTOMER", "WHOLESALE", "PLANNER", "ADMIN", "SUPER_ADMIN"],
  "/wholesale/dashboard": ["WHOLESALE", "ADMIN", "SUPER_ADMIN"],
  "/planner/dashboard": ["PLANNER", "ADMIN", "SUPER_ADMIN"],
  "/admin": ["ADMIN", "SUPER_ADMIN"],
};

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const session = req.auth;

  // Check each protected route prefix
  for (const [route, allowedRoles] of Object.entries(PROTECTED_ROUTES)) {
    if (pathname.startsWith(route)) {
      if (!session) {
        const loginUrl = new URL("/login", req.url);
        loginUrl.searchParams.set("callbackUrl", pathname);
        return NextResponse.redirect(loginUrl);
      }

      const role = session.user?.role;
      if (!allowedRoles.includes(role)) {
        return NextResponse.redirect(new URL("/", req.url));
      }
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/account/:path*",
    "/wholesale/dashboard/:path*",
    "/planner/dashboard/:path*",
    "/admin/:path*",
  ],
};
