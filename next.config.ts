import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // Brimble serves static assets by URL path. Emit /route/index.html so
  // direct navigations (especially the OAuth callback) resolve correctly.
  trailingSlash: true,
  images: { unoptimized: true },
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;
