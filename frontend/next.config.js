/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://blog-app-xwiv.onrender.com',
    NEXT_PUBLIC_ADMIN_API_KEY: process.env.NEXT_PUBLIC_ADMIN_API_KEY || 'mySuperSecretAdminKey123!'
  },
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET, POST, PUT, DELETE, OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type, x-api-key' },
        ],
      },
    ];
  },
};

module.exports = nextConfig; 