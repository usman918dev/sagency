/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,       // recommended
  output: 'standalone',        // ensures all needed files are included
  images: {
    unoptimized: true,         // avoids image optimization issues on Vercel
  },
};

export default nextConfig;
