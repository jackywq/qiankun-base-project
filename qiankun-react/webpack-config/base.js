const path = require("path");
const os = require("os");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");
const AutoPrefixer = require("autoprefixer");
const svgToMiniDataURI = require("mini-svg-data-uri");

function resolve(dir) {
  return path.resolve(__dirname, "..", dir);
}

const PostcssLoader = {
  loader: "postcss-loader",
  options: {
    postcssOptions: {
      ident: "postcss",
      plugins: [AutoPrefixer],
    },
  },
};

const packageName = "reactApp";

module.exports = (isProductionMode) => ({
  entry: isProductionMode
    ? "./src/index.js"
    : /**
       * 在 Webpack 5 中，当 entry 是一个数组时，Webpack 会将数组中 最后一个模块的导出（exports） 作为整个库（library）的导出。
       * 如果你不手动写这个数组 ： webpack-dev-server 默认会自动将这两个热更新脚本追加到你的 entry 后面。导致最终导出的其实是 webpack/hot/dev-server 的内容，而不是你 index.js 里写的生命周期函数。这就会引发你之前遇到的报错： You need to export lifecycle functions in reactApp entry 。
       * 手动配置并放在最后 ：通过手动配置，我们将热更新客户端代码放在前面，而把真实的业务入口 ./src/index.js 放在数组的最后。这样一来，既让热更新代码生效了，又保证了最终对外暴露的是 index.js 中定义的 Qiankun 生命周期函数。
       */
      [
        "webpack-dev-server/client?http://localhost:20000",
        "webpack/hot/dev-server",
        "./src/index.js",
      ],
  output: {
    path: resolve("./dist"), // 打包后的文件存放的地方
    library: `${packageName}-[name]`,
    libraryTarget: "umd",
    chunkLoadingGlobal: `webpackJsonp_${packageName}`,
    filename: "js/[name].[chunkhash:8].js",
    chunkFilename: "js/[name].[chunkhash:8].js",
    publicPath: "/",
    // qiankun 场景下固定挂载到 window，避免 UMD 默认挂到 self 导致生命周期读取异常
    globalObject: "window",
  },
  module: {
    rules: [
      {
        test: /\.m?js/,
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.(js|jsx)$/i,
        include: path.resolve("src"),
        use: [
          {
            loader: "thread-loader",
            options: {
              // 开销大的时候开启多线程，用node获取cpu数启动
              workers: os.cpus().length,
            },
          },
          "babel-loader",
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.(gif|jpg|png|woff|eot|ttf)\??.*$/i,
        use: "url-loader?limit=15000&name=./images/[name].[ext]",
      },
      {
        test: /\.css$/i,
        use: [
          isProductionMode ? MiniCssExtractPlugin.loader : "style-loader",
          "css-loader",
          PostcssLoader,
        ],
      },
      {
        test: /\.less$/i,
        use: [
          isProductionMode ? MiniCssExtractPlugin.loader : "style-loader",
          "css-loader",
          PostcssLoader,
          {
            loader: "less-loader",
            options: {
              javascriptEnabled: true,
            },
          },
        ],
      },
      {
        test: /\.svg$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              generator: (content) => svgToMiniDataURI(content.toString()),
            },
          },
        ],
      },
    ],
  },
  resolve: {
    modules: ["node_modules", resolve("./node_modules"), resolve("./src")],
    extensions: [".js", ".jsx", ".json"],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/[name].[contenthash:8].min.css",
      chunkFilename: "css/[name].[contenthash:8].min.css",
    }),
    new HtmlWebpackPlugin({
      // 根据模板插入css/js等生成最终HTML
      filename: "./index.html", // 生成的html存放路径，相对于 path
      template: "./public/index.html", // html模板路径
      hash: true, // 为静态资源生成hash值
      minify: false,
    }),
    new CaseSensitivePathsPlugin(),
  ],
});
