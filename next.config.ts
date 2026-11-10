import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites(){
    return [
        {
            source:"/api/:path*",
            destination:"http://187.77.136.158/api/:path*"

        }
    ]
  }
};

export default nextConfig;
