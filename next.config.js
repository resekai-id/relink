/** @type {import('next').NextConfig} */
module.exports = {
  env: {
    HOST: process.env.HOST || 'localhost',
  },
  reactStrictMode: true,
  styledComponents: true,
  experimental: {
    images: {
      layoutRaw: true,
    },
  },
};
