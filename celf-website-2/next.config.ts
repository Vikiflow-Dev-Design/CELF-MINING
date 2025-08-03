import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  // Removed 'output: export' to enable server-side features
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },


  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ui-avatars.com',
        port: '',
        pathname: '/api/**',
      },
    ],
  },

  // Add this watchOptions configuration
  webpack: (config, { isServer, dev }) => {
    if (dev && !isServer) {
      // Ignore watching the pagefile.sys and other system files
      config.watchOptions = {
        ignored: [/node_modules/, /\.git/, /pagefile\.sys/],
      };
    }
    return config;
  },
};

export default nextConfig;
