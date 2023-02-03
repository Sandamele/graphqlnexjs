/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    STRAPI_LINK: process.env.STRAPI_LINK,
  },
};

module.exports = nextConfig;
