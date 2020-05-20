const merge = require("webpack-merge");

const baseConfig = require("./webpack.config.base");

const TerserPlugin = require("terser-webpack-plugin");

const webpack = require("webpack");

const path = require("path");

const devConfig = {
  mode: "development",
  devServer: {
    historyApiFallback: true,
    publicPath: "/",
    stats: "minimal",
    proxy: {
      "/api": {
        target: "http://localhost:7001",
        changeOrigin: true,
        pathRewrite: {
          "^/api": "", // 重写path
        },
        secure: true, // 设置支持https协议的代理
      },
    },
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
      }),
    ],
  },
  plugins: [
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require("../dll/react.manifest.json"),
    }),
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require("../dll/antd.manifest.json"),
    }),
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require("../dll/bizcharts.manifest.json"),
    }),
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require("../dll/axios.manifest.json"),
    }),
  ],
  devtool: "inline-source-map",
};

module.exports = merge(baseConfig, devConfig);
