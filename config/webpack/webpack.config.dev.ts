import merge from "webpack-merge";

import baseConfig from "./webpack.config.base";

import TerserPlugin from "terser-webpack-plugin";

import webpack from "webpack";

import { pathFn } from "./utils";

import AutoDllPlugin from "autodll-webpack-plugin";


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
    new AutoDllPlugin({
      inject: true, // will inject the DLL bundles to index.html
      filename: '[name].dll.js',
      entry: {
        react: ["react", "react-dom", "react-router-dom"],
        antd: ["antd"],
        bizcharts: ["bizcharts"],
        axios: ["axios"],
      }
    })
  ],
  devtool: "inline-source-map",
};

const mergeConfig = merge(baseConfig, devConfig);

export default mergeConfig;
