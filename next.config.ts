import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";
const repo = "sujin_portfolio"; 

const nextConfig: NextConfig = {
  output: "export", // 정적 사이트 생성
  basePath: isProd ? `/${repo}` : "",
  assetPrefix: isProd ? `/${repo}/` : "",
};

export default nextConfig;