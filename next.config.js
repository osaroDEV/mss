/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { 
    unoptimized: true,
    domains: ['cdn.sanity.io']
  },
  trailingSlash: true,
}

module.exports = nextConfig