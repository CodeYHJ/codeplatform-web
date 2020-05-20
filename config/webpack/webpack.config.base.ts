import moduleConfig from "./util/moduleConfig";

import HtmlwebpackPlugin from "html-webpack-plugin";

import webpack from "webpack";

import { pathFn } from "./util/index";

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
    new HtmlwebpackPlugin({
      title: "admin",
      template: pathFn("./config/HTML/index.html"),
      favicon: pathFn("./config/HTML/favicon.ico"),
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
export default config;
