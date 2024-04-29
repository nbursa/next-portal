/** @type {import('next').NextConfig} */
const nextConfig = {
    basePath: '/',
    assetPrefix: '/',
    reactStrictMode: true,
    // webpack(config) {
    //     return config;
    // },
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
