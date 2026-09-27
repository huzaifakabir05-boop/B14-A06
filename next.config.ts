import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/B14-A06',
  assetPrefix: '/B14-A06/',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
