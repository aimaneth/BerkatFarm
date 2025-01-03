const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com'
      },
      {
        protocol: 'https',
        hostname: 'api.mapbox.com'
      },
      {
        protocol: 'https',
        hostname: 'a.tiles.mapbox.com'
      },
      {
        protocol: 'https',
        hostname: 'b.tiles.mapbox.com'
      }
    ],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  webpack: (config, { dev, isServer }) => {
    config.resolve.fallback = { fs: false, path: false };
    
    if (dev) {
      // Use a more reliable source map option for development
      config.devtool = 'source-map';
      
      // Ensure proper error handling middleware
      config.output = {
        ...config.output,
        devtoolModuleFilenameTemplate: (info) =>
          path.resolve(info.absoluteResourcePath).replace(/\\/g, '/'),
      };
    }
    
    return config;
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' api.mapbox.com",
              "style-src 'self' 'unsafe-inline' api.mapbox.com",
              "img-src 'self' blob: data: *.mapbox.com https: data:",
              "connect-src 'self' *.mapbox.com api.mapbox.com events.mapbox.com localhost:3000",
              "worker-src 'self' blob:",
              "child-src blob:",
              "frame-src 'self'"
            ].join('; ')
          }
        ],
      }
    ];
  },
  // Development server configuration
  onDemandEntries: {
    maxInactiveAge: 60 * 1000, // Increased buffer time
    pagesBufferLength: 5, // Increased buffer size
  }
};

module.exports = nextConfig; 