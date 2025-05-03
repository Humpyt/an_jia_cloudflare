/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static image imports
  images: {
    domains: ['localhost', 'yourdomain.com'], // Add your WordPress domain
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
    unoptimized: true, // Required for Cloudflare Pages
  },
  // Strict mode helps catch bugs early
  reactStrictMode: true,
  // Optimize page loading
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
    styledComponents: true,
  },
  // Ignore build errors during deployment
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Environment variables
  env: {
    NEXT_PUBLIC_WORDPRESS_API_URL: process.env.NEXT_PUBLIC_WORDPRESS_API_URL || 'http://anjia-wordpress.local/wp-json',
  },
  // Add rewrites for WordPress API
  async rewrites() {
    return [
      {
        source: '/api/wordpress/:path*',
        destination: `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/:path*`,
      },
    ];
  },
  // Experimental features
  experimental: {
    allowedRevalidateHeaderKeys: ['x-wordpress-update'],
  },
};

module.exports = nextConfig;
