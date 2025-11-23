import { NextResponse, NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const isAdminRoute = req.nextUrl.pathname.startsWith("/admin");

  // protect admin routes
  if (isAdminRoute) {
    const password = req.nextUrl.searchParams.get("password");

    if (password !== process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      return NextResponse.redirect(
        new URL("/admin-login", req.url)
      );
    }
  }

  return NextResponse.next();
}
