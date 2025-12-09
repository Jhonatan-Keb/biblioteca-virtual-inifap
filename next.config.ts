import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'framework-gb.cdn.gob.mx',
      },
    ],
  },
};

export default nextConfig;
