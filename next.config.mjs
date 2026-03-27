/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  serverExternalPackages: [
    "@remotion/bundler",
    "@remotion/renderer"
  ],
};

export default nextConfig;
