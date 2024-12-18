import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import {
  getBuildId,
  nextDataRouteToPathname,
  pathnameToNextDataRoute,
} from "./utils/next-data-url";

export function middleware(request: NextRequest) {
  // block direct access to /nested/[num].tsx
  if (request.nextUrl.pathname.startsWith("/nested")) {
    return NextResponse.rewrite(new URL("/404", request.url));
  }

  // redirect / to /nested/0
  if (request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/testing/0", request.url));
  }

  // rewrite /**/_next/data to /_next/data
  if (request.nextUrl.pathname.includes("/_next/data")) {
    const headers = new Headers(request.headers);
    headers.set("x-nextjs-data", "1");

    const buildId = getBuildId(request);
    const pathname = nextDataRouteToPathname(request.nextUrl.pathname);

    // rewrite /testing/* to /nested/*
    if (pathname.startsWith("/testing")) {
      const newPathname = pathname.replace("/testing", "/nested");
      return NextResponse.rewrite(
        new URL(
          // Note: there appears to be a bug in next.js where development and production don't behave the same way
          // when rewriting to a nextjs data route.
          process.env.NODE_ENV === "development"
            ? pathnameToNextDataRoute(buildId, newPathname)
            : newPathname,
          request.url
        ),
        { request: { headers } }
      );
    }

    return NextResponse.rewrite(
      new URL(
        process.env.NODE_ENV === "development"
          ? pathnameToNextDataRoute(buildId, pathname)
          : pathname,
        request.url
      ),
      { request: { headers } }
    );
  }

  // rewrite /**/_next/static to /_next/static
  if (request.nextUrl.pathname.includes("/_next/static")) {
    const newPathname = request.nextUrl.pathname.substring(
      request.nextUrl.pathname.indexOf("/_next/static")
    );
    return NextResponse.rewrite(new URL(newPathname, request.url));
  }

  // rewrite /testing/* to /nested/*
  if (request.nextUrl.pathname.startsWith("/testing")) {
    const newPathname = request.nextUrl.pathname.replace("/testing", "/nested");
    return NextResponse.rewrite(new URL(newPathname, request.url));
  }
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/testing/:num", "/nested/:num", "/testing/_next/:path*"],
};
