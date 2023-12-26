/** @type {import('next').NextConfig} */
// next.config.js
module.exports = {
  images: {
    domains: ["cdn.sanity.io"],
  },
  async rewrites() {
    return [
      {
        source: "/studio/:path*",
        destination: "https://xrt5fta3.sanity.studio/:path*",
      },
    ];
  },
};
