import merge from "webpack-merge";

import baseConfig from "./webpack.config.base";

import TerserPlugin from "terser-webpack-plugin";

import webpack from "webpack";

import { pathFn } from "./utils";

import SpeedMeasurePlugin from "speed-measure-webpack-plugin";

import HtmlwebpackPlugin from "html-webpack-plugin";

import HardSourceWebpackPlugin from 'hard-source-webpack-plugin';


const smp = new SpeedMeasurePlugin();

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
    new HtmlwebpackPlugin({
      inject: true,
      title: "admin",
      template: pathFn("./config/HTML/index.html"),
      favicon: pathFn("./config/HTML/favicon.ico"),
      dll: [
        '/dll/antd.dll.js',
        '/dll/react.dll.js',
        '/dll/bizcharts.dll.js',
        '/dll/axios.dll.js',
      ]
    }),
    new webpack.DllReferencePlugin({
      context: pathFn("./admin/dll"),
      manifest: require(pathFn("./admin/dll/antd.mainfest.json")),
    }),
    new webpack.DllReferencePlugin({
      context: pathFn("./admin/dll"),
      manifest: require(pathFn("./admin/dll/axios.mainfest.json")),
    }),
    new webpack.DllReferencePlugin({
      context: pathFn("./admin/dll"),
      manifest: require(pathFn("./admin/dll/bizcharts.mainfest.json")),
    }),
    new webpack.DllReferencePlugin({
      context: pathFn("./admin/dll"),
      manifest: require(pathFn("./admin/dll/react.mainfest.json")),
    }),
    new HardSourceWebpackPlugin()
  ],
  devtool: "inline-source-map",

};
const mergeConfig = smp.wrap(merge(baseConfig, devConfig));

export default mergeConfig;
