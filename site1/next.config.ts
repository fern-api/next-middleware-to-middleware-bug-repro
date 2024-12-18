import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  assetPrefix: "/basepath/",
  experimental: {
    externalMiddlewareRewritesResolve: true,
  },
};

export default nextConfig;
