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
  webpack: (config) => {
    config.resolve.fallback = { fs: false, path: false };
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
              "img-src 'self' blob: data: *.mapbox.com",
              "connect-src 'self' *.mapbox.com api.mapbox.com events.mapbox.com",
              "worker-src 'self' blob:",
              "child-src blob:",
            ].join('; ')
          }
        ],
      }
    ];
  }
};

module.exports = nextConfig; 