import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // rewrite /basepath/:num to /tenant/:num
  if (request.nextUrl.pathname.startsWith("/basepath")) {
    console.log("rewriting", request.nextUrl.pathname);
    return NextResponse.rewrite(
      new URL(
        request.nextUrl.pathname,
        process.env.SITE1_ORIGIN ||
          "https://next-middleware-to-middleware-bug-repro-site1.vercel.app"
      )
    );
  }
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/basepath/:path*"],
};
