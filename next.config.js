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
        destination: "https://portfolio-iamayushdas.sanity.studio/:path*",
      },
    ];
  },
};
