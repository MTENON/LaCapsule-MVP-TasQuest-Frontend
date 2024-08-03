/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [],
  },
  env: {
    backLink: process.env.BACK_LINK
  }
};

module.exports = nextConfig;
