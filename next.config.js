/** @type {import('next').NextConfig} */
const nextConfig = {
reactStrictMode: false,
  redirects: async () => {
    return [
      {
        source: "/github",
        destination: "https://github.com/ConnectAI-E/Chat-Calculator",
        permanent: true,
      },
      {
        source: "/deploy",
        destination: "https://vercel.com/templates/next.js/chat-calc",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
