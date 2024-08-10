/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: [],
  },
  env: {
    backLink: process.env.BACK_LINK,
  },
};

module.exports = nextConfig;
