const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { merge } = require("webpack-merge");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const getBaseConfig = require("./base");
const path = require("path");

module.exports = merge(getBaseConfig(true), {
  mode: "production",
  devtool: "source-map",
  plugins: [new CleanWebpackPlugin()],
  optimization: {
    runtimeChunk: "single", // 为所有 entry 创建一个共享的 runtime
    minimizer: [
      new TerserWebpackPlugin({
        parallel: true,
        exclude: /\/node_modules/,
        extractComments: false,
        terserOptions: {
          warnings: false,
          compress: {
            unused: true,
            drop_debugger: true,
            drop_console: true,
          },
        },
      }),
    ],
    splitChunks: {
      chunks: "all",
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            // get the name. E.g. node_modules/packageName/not/this/part.js
            // or node_modules/packageName
            const packageName = module.context.match(
              /[\\/]node_modules[\\/](.*?)([\\/]|$)/,
            )[1];

            // npm package names are URL-safe, but some servers don't like @ symbols
            return `npm/${packageName.replace("@", "")}`;
          },
        },
        common: {
          test: /[\\/]src[\\/](utils|components)/,
          name: "common", // todo: 区分 component / utils
        },
      },
    },
  },
});
