/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "34.121.182.168",
        port: "8000",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "uat.arabanah.com",
        pathname: "/**",
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  async rewrites() {
    return [
      {
        source: "/html/:slug",
        destination: "/html/:slug.html",
      },
    ]
  },
  
}

module.exports = nextConfig