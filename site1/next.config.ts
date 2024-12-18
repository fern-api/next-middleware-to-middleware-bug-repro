import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  // note: this lets deployments that proxy into site1 still work
  assetPrefix: process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}/`
    : "/tenant/",

  experimental: {
    externalMiddlewareRewritesResolve: true,
  },
};

export default nextConfig;
