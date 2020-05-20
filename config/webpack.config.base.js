const moduleConfig = require("./util/moduleConfig");

const HtmlwebpackPlugin = require("html-webpack-plugin");

const webpack = require("webpack");

const path = require("path");

const config = {
  entry: "./src/app.tsx",
  output: {
    path: path.resolve(__dirname, "admin"),
    filename: "js/[name].[hash].js",
    chunkFilename: "js/[name].[hash].js",
    publicPath: "/",
  },
  devServer: {
    historyApiFallback: true,
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx"],
    alias: {
      "@router": path.resolve(__dirname, "../src/router"),
      "@page": path.resolve(__dirname, "../src/page"),
      "@less": path.resolve(__dirname, "../src/less"),
      "@store": path.resolve(__dirname, "../src/store"),
      "@util": path.resolve(__dirname, "../src/util"),
      "@img": path.resolve(__dirname, "../src/assets/img"),
      "@config": path.resolve(__dirname, "../src/config"),
      "@api": path.resolve(__dirname, "../src/api"),
      "@component": path.resolve(__dirname, "../src/page/Component"),
    },
  },
  plugins: [
    new HtmlwebpackPlugin({
      title: "admin",
      template: path.resolve(__dirname, "./util/index.html"),
      favicon: path.resolve(__dirname, "./util/favicon.ico"),
    }),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        DEPLOY: JSON.stringify(process.env.DEPLOY),
      },
    }),
  ],
  module: moduleConfig,
};

module.exports = config;
