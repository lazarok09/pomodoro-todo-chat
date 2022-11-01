/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    styledComponents: {
      fileName: true,
      displayName: true,
      ssr: true,
    },
  },
};

module.exports = nextConfig;
