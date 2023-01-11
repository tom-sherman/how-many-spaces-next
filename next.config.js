/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    styledComponents: true
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/norwich',
        permanent: false
      },
      {
        source: '/car-park/:slug',
        destination: '/norwich/car-park/:slug',
        permanent: true,
      }
    ]
  }
}

module.exports = nextConfig;
