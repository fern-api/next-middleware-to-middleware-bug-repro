import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  experimental: {
    externalMiddlewareRewritesResolve: true,
  },
};

export default nextConfig;
