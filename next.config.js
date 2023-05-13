/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    webpack(config) {
        return config;
    },
    images: {
        domains: [],
    },
    devIndicators: {
        buildActivity: false,
        buildActivityPosition: 'bottom-right',
    },
};

module.exports = nextConfig;
