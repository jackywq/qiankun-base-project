const { merge } = require("webpack-merge");
const getBaseConfig = require("./base");
const webpack = require("webpack");

module.exports = merge(getBaseConfig(false), {
  devtool: "eval-source-map",
  mode: "development",
  plugins: [
    // ✅ 热更新必须加这个插件（React 16 必备）
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    contentBase: "dist",
    historyApiFallback: {
      rewrites: [
        // 根路径重定向到/react，同时兼容路由刷新404
        { from: /^\/$/, to: "/react/" },
        // 其他路径重定向到/react，同时兼容路由刷新404
        { from: /^\/react\/.*$/, to: "/react/index.html" },
      ],
    },
    inline: true,
    open: false,
    overlay: true,
    disableHostCheck: true,
    // ✅ 开启热更新
    // hot: true,
    // ✅ 必须关闭，否则热更新失效
    // liveReload: false,
    port: 20000, // 端口
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type",
    },
  },
});
