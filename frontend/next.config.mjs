/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:a*',
        destination: 'http://localhost:8000/:a*'
      },
    ];
  },
};

export default nextConfig;
