import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    qualities: [75, 95, 100],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      }
    ],
  },
  cacheComponents: true,
  partialPrefetching: true,

  experimental: {
    cpus: 2,
  },
};

export default nextConfig;
