import { CleanWebpackPlugin } from "clean-webpack-plugin";

import BundleAnalyzerPlugin from "webpack-bundle-analyzer";


import MiniCssExtractPlugin from "mini-css-extract-plugin";

import optimizeCssPlugin from "optimize-css-assets-webpack-plugin";

import CompressionPlugin from "compression-webpack-plugin";

import TerserPlugin from "terser-webpack-plugin";

import HtmlwebpackPlugin from "html-webpack-plugin";

import merge from "webpack-merge";

import baseConfig from "./webpack.config.base";

import webpack from "webpack";

import { pathFn } from "./utils";




const proConfig: webpack.Configuration = {
  mode: "production",
  output: {
    path: pathFn("./admin"),
    filename: `js/[name].[chunkhash].js`,
    chunkFilename: `js/[name].[chunkhash].js`,
    publicPath: "/",
  },
  plugins: [
    //清除上一次打包
    new CleanWebpackPlugin(),
    // new BundleAnalyzerPlugin.BundleAnalyzerPlugin(),
    new HtmlwebpackPlugin({
      title: "admin",
      template: pathFn("./config/HTML/index.html"),
      favicon: pathFn("./config/HTML/favicon.ico"),
      cdn: {
        js: [
          "https://cdn.bootcss.com/react/16.13.1/umd/react.production.min.js",
          "https://cdn.bootcss.com/react-dom/16.13.1/umd/react-dom.production.min.js",
          "https://gw.alipayobjects.com/os/lib/bizcharts/4.0.3/umd/BizCharts.js",
        ],
      },

    }),
    //分析
    // new BundleAnalyzerPlugin(),
    // 提取 css
    new MiniCssExtractPlugin({
      filename: "css/[name].[contenthash].css",
      chunkFilename: "css/[name].[contenthash].css",
      ignoreOrder: true, // Enable to remove warnings about conflicting order
    }),
    // opt css
    new optimizeCssPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require("cssnano"),
      cssProcessorOptions: { discardComments: { removeAll: true } },
      canPrint: true,
    }),
    // gzip
    new CompressionPlugin({
      filename: "[path].gz[query]", //目标资源名称。[file] 会被替换成原资源。[path] 会被替换成原资源路径，[query] 替换成原查询字符串
      algorithm: "gzip", //算法
      test: /\.(js|css)$/, //压缩 js 与 css
      threshold: 10240, //只处理比这个值大的资源。按字节计算
      minRatio: 0.8, //只有压缩率比这个值小的资源才会被处理
    }),
  ],
  optimization: {
    runtimeChunk: { name: 'manifest' },
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: false,
      }),
    ],
    splitChunks: {
      cacheGroups: {
        axios: {
          test: /[\\/]node_modules[\\/](axios)[\\/]/,
          name: "axios",
          chunks: "all",
          priority: 2
        },
        antd: {
          test: /[\\/]node_modules[\\/](antd)|(@ant-design)[\\/]/,
          name: "antd",
          chunks: "all",
          priority: 3
        },
        moment: {
          test: /[\\/]node_modules[\\/](moment)[\\/]/,
          name: "moment",
          chunks: "all",
          priority: 4
        },
        rc: {
          test: /[\\/]node_modules[\\/](rc-table)|(rc-mentions)|(rc-tree)|(rc-picker)|(rc-select)[\\/]/,
          name: "rc",
          chunks: "all",
          priority: 4
        }
      },
    },
  },
  externals: {
    react: "React",
    "react-dom": "ReactDOM",
    bizcharts: "BizCharts",
  },
};
const mergeConfig = merge(baseConfig, proConfig)

export default mergeConfig;
