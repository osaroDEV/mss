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
  compress: true,
  poweredByHeader: false,
  generateEtags: false,
}

module.exports = nextConfig