/** @type {import('next').NextConfig} */

// @ts-check
const { i18n } = require('./next-i18next.config.js')

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
    i18n,
};

module.exports = nextConfig;
