/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  pageExtensions: [
    'api.ts',
    'api.tsx',
    'page.tsx'
  ]
}

module.exports = nextConfig
