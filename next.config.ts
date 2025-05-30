import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";
const repo = "sujin_portfolio"; 

const nextConfig: NextConfig = {
  output:'export',
  assetPrefix: isProd ? `/${repo}/` : "",
};

export default nextConfig;