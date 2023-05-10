/** @type {import('next').NextConfig} */

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const nextConfig = {
    reactStrictMode: true,
    webpack: (config, {buildId, dev, isServer, defaultLoaders}) => {
        // Add the mini-css-extract-plugin to the plugins array
        config.plugins.push(
            new MiniCssExtractPlugin({
                filename: dev ? '[name].css' : '[name].[contenthash].css',
                chunkFilename: dev ? '[id].css' : '[id].[contenthash].css',
            })
        );
        // Find the CSS rule in the existing configuration and replace the style-loader with the MiniCssExtractPlugin.loader
        config.module.rules.forEach((rule) => {
            if (rule.oneOf) {
                rule.oneOf.forEach((testRule) => {
                    if (
                        testRule.use &&
                        testRule.use.loader === 'next/dist/build/webpack/loaders/css-loader'
                    ) {
                        testRule.use = [
                            MiniCssExtractPlugin.loader,
                            testRule.use,
                        ];
                    }
                });
            }
        });
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