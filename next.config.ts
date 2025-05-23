import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
   images: {
        
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
                pathname: '**',
            },
            {
                protocol: 'https',
                hostname: 'raw.githubusercontent.com',
                pathname: '**',
            },
                        {
                protocol: 'https',
                hostname: 'localhost',
                pathname: '**',
            },
        ],
    },
};

export default nextConfig;
