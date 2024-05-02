/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    reactStrictMode: true,
    basePath: '/next-portal',
    assetPrefix: '/next-portal/',
    env: {
        NEXT_PUBLIC_CHATGPT_API_KEY: process.env.NEXT_PUBLIC_CHATGPT_API_KEY,
        NEXT_PUBLIC_CHATGPT_API_URL: process.env.NEXT_PUBLIC_CHATGPT_API_URL,
        PORT: process.env.PORT,
        NEXT_PUBLIC_GA_ID: process.env.NEXT_PUBLIC_GA_ID,
        EMAIL_USERNAME: process.env.EMAIL_USERNAME,
        EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
        EMAIL_HOST: process.env.EMAIL_HOST,
        EMAIL: process.env.EMAIL
    },
    images: {
        domains: [],
        unoptimized: true
    },
    devIndicators: {
        buildActivity: false,
        buildActivityPosition: 'bottom-right',
    },
};

module.exports = nextConfig;
