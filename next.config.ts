
const isProd = process.env.NODE_ENV === "production";
const repo = 'sujin_portfolio'; 

const nextConfig = {
  output: 'export',
  reactStrictMode: true,

  basePath: isProd ? `/${repo}` : "",         
  assetPrefix: isProd ? `/${repo}/` : "",       
  
  trailingSlash: true, 
  images: {
    unoptimized: true, 
  },
  env: {
    BASE_PATH: isProd ? `/${repo}` : "",
  },
};

export default nextConfig;