import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";
const repo = "https://github.com/Nuuuing/sujin_portfolio";

const rep ='/sujin_portfolio';

const nextConfig: NextConfig = {
  output: 'export',
  reactStrictMode: true,
  assetPrefix:  isProd ? rep : "/public", 
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  env: {
    BASE_PATH: isProd ? rep : "", 
  },
};

export default nextConfig;