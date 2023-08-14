/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        PROMPT: process.env.PROMPT,
        EMAIL: process.env.EMAIL,
    },
    reactStrictMode: true,
    images: {
        domains: [],
    },
    devIndicators: {
        buildActivity: false,
        buildActivityPosition: 'bottom-right',
    },
};

module.exports = nextConfig;