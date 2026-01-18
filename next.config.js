/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['react-diff-viewer'],
  env: {
    DEEPSEEK_API_URL: process.env.DEEPSEEK_API_URL || 'https://api.deepseek.com',
  },
}

module.exports = nextConfig
