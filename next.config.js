/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  // Ignore the api directory in app since it's causing issues
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    return config;
  },
};

module.exports = nextConfig;