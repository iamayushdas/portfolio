/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["cdn.sanity.io"],
  },
  async redirects() {
    return [
      {
        source: "/studio",
        destination: "https://portfolio-iamayushdas.sanity.studio",
        permanent: false,
      },
      {
        source: "/contentful",
        destination:
          "https://app.contentful.com/spaces/i17fgav06ug6/entries/4Yq1AhsNeSl6vv3FIvN4X0",
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
