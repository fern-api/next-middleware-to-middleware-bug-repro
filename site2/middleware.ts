import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // rewrite /testing/:num to /nested/:num
  if (request.nextUrl.pathname.startsWith("/testing")) {
    console.log("rewriting", request.nextUrl.pathname);
    return NextResponse.rewrite(
      new URL(
        request.nextUrl.pathname,
        process.env.SITE1_ORIGIN || "http://localhost:3001"
      )
    );
  }
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/testing/:path*"],
};
