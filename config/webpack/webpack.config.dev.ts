import merge from "webpack-merge";

import baseConfig from "./webpack.config.base";

import TerserPlugin from "terser-webpack-plugin";

import webpack from "webpack";

import { pathFn } from "./util/index";

const devConfig: webpack.Configuration = {
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
      manifest: require(pathFn("./dll/react.manifest.json")),
    }),
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require(pathFn("./dll/antd.manifest.json")),
    }),
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require(pathFn("./dll/bizcharts.manifest.json")),
    }),
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require(pathFn("./dll/axios.manifest.json")),
    }),
  ],
  devtool: "inline-source-map",
};

const mergeConfig = merge(baseConfig, devConfig);

export default mergeConfig;
