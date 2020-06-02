import moduleConfig from "./moduleConfig";

import webpack from "webpack";

import { pathFn } from "./utils";

import HappyPack from "happypack";

import AntdDayjsWebpackPlugin from 'antd-dayjs-webpack-plugin';

const config: webpack.Configuration = {
  entry: pathFn("./src/app.tsx"),
  output: {
    path: pathFn("./admin"),
    filename: "js/[name].[hash].js",
    chunkFilename: "js/[name].[hash].js",
    publicPath: "/",
  },

  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx"],
    alias: {
      "@": pathFn("./src"),
      "@page": pathFn("./src/page"),
      "@store": pathFn("./src/store"),
      "@util": pathFn("./src/util"),
      "@img": pathFn("./src/assets/img"),
      "@api": pathFn("./src/api"),
      "@component": pathFn("./src/page/Component"),
    },
  },
  plugins: [
    new AntdDayjsWebpackPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        DEPLOY: JSON.stringify(process.env.DEPLOY),
      },
    }),
    new HappyPack({
      id: "styles",
      threads: 2,
      loaders: [
        {
          loader: "css-loader",
          options: {
            importLoaders: 2,
            modules: true,
          },
        },
        "postcss-loader",
        "less-loader",
      ],
    }),
    new HappyPack({
      id: "antd",
      threads: 2,
      loaders: [
        "css-loader",
        "postcss-loader",
        {
          loader: "less-loader",
          options: {
            javascriptEnabled: true,
          },
        },
      ],
    }),

  ],
  module: moduleConfig,
};
export default config;
