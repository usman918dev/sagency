/** @type {import('next').NextConfig} */
const nextConfig = {
	output: 'export',
	trailingSlash: true,
	// Update this if your repo name or deployment path is different
	basePath: '/sagency',
	assetPrefix: '/sagency',
};

export default nextConfig;
