/** @type {import('next').NextConfig} */
const nextConfig = {
reactStrictMode: false,
  redirects: async () => {
    return [
      {
        source: "/deploy",
        destination: "https://vercel.com/templates/next.js/chat-calc",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
