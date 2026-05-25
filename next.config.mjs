/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: process.env.SKIP_NEXT_TYPECHECK === "1",
  },
};

export default nextConfig;
