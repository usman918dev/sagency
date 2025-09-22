/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,       // recommended
  swcMinify: true,             // faster builds
  output: 'standalone',        // ensures all needed files are included
  images: {
    unoptimized: true,         // avoids image optimization issues on Vercel
  },
  experimental: {
    appDir: true,              // if using /app directory
  },
};

export default nextConfig;
