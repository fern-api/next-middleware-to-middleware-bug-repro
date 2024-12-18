import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  assetPrefix: "/testing/",
  experimental: {
    externalMiddlewareRewritesResolve: true,
  },
};

export default nextConfig;
