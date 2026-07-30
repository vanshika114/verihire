import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Tells Next.js to restrict file tracing strictly to this project directory
  outputFileTracingRoot: __dirname,
};

export default nextConfig;