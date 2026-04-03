const packageName = "vueApp";

module.exports = {
  // 生产环境打包到二级目录 /vue，并让静态资源引用以 /vue/ 为前缀
  publicPath: "./",
  // 生产环境输出目录
  outputDir: "dist",

  devServer: {
    port: 10000,
    // 支持跨域
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },

  configureWebpack: {
    output: {
      library: packageName,
      libraryTarget: "umd",
      jsonpFunction: `webpackJsonp_${packageName}`,
    },
  },
};
