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
  entry: "./src/index.js",
  output: {
    path: resolve("./dist"), // 打包后的文件存放的地方
    library: `${packageName}-[name]`,
    libraryTarget: "umd",
    filename: "react/js/[name].[chunkhash:8].js",
    chunkFilename: "react/js/[name].[chunkhash:8].js",
    publicPath: "/",
    chunkLoadingGlobal: `webpackJsonp_${packageName}`,
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
      filename: "./react/index.html", // 生成的html存放路径，相对于 path
      template: "./public/index.html", // html模板路径
      hash: true, // 为静态资源生成hash值
      minify: false,
    }),
    new CaseSensitivePathsPlugin(),
  ],
});
