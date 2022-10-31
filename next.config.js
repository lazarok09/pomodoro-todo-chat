/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  styledComponents: {
    fileName: true,
    displayName: true,
  },
};

module.exports = nextConfig;
