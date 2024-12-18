import getAssetPathFromRoute from "next/dist/shared/lib/router/utils/get-asset-path-from-route";
import { removeTrailingSlash } from "next/dist/shared/lib/router/utils/remove-trailing-slash";
import { NextRequest } from "next/server";

export function getBuildId(req: NextRequest): string {
  return (
    req.nextUrl.buildId ??
    extractBuildId(req.nextUrl.pathname) ??
    (process.env.NODE_ENV === "development" ? "development" : "")
  );
}

/**
 * when prefetching `/learn/_next/data/build-id/learn/home.json`, sometimes the pathname is inexplicably
 * `/learn/_next/data/build-id/learn/_next/data/build-id/learn/home.json.json`.
 *
 * This is a bug in Next.js that we need to work around.
 *
 * @returns the real pathname
 */
export function nextDataRouteToPathname(pathname: string): string {
  return (
    removeIndex(
      pathname.match(
        /\/_next\/data\/.*\/_next\/data\/[^/]*(\/.*)\.json.json/
      )?.[1] ?? pathname.match(/\/_next\/data\/[^/]*(\/.*)\.json/)?.[1]
    ) ?? pathname
  );
}

export function extractBuildId(pathname: string): string | undefined {
  return pathname.match(/\/_next\/data\/([^/]+)\//)?.[1];
}

export function pathnameToNextDataRoute(
  buildId: string,
  pathname: string
): string {
  return `/_next/data/${buildId}${getAssetPathFromRoute(
    addIndex(removeTrailingSlash(pathname)),
    ".json"
  )}`;
}

function removeIndex(pathname: string | undefined): string | undefined {
  if (pathname === "/index") {
    return "/";
  }
  return pathname;
}

function addIndex(pathname: string): string {
  if (pathname === "/") {
    return "/index";
  }
  return pathname;
}
