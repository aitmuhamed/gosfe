import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
    
    turbopack: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },

    // 'allowedDevOrigins' is not included in the Next.js ExperimentalConfig types here,
    // so cast the object to `any` to avoid the TypeScript error while keeping the setting.
    experimental: {
      allowedDevOrigins: ['http://10.10.228.139:3000', "http://10.10.228.148:8000", "http://172.16.16.7:8000"],
    } as any,
};

export default nextConfig;
