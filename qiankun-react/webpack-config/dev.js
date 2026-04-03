const { merge } = require("webpack-merge");
const getBaseConfig = require("./base");
const webpack = require("webpack");

module.exports = merge(getBaseConfig(false), {
  devtool: "eval-source-map",
  mode: "development",
  // 开发环境必须使用绝对 publicPath，避免主应用端口(8888)错误请求微应用静态资源
  // 同时保证 HMR 请求(.hot-update.*)始终发往 react 子应用服务(20000)
  output: {
    publicPath: "http://localhost:20000/",
  },
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
    injectClient: false,
    injectHot: false,
    // ✅ 开启热更新
    hot: true,
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
