const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const optimizeCssPlugin = require("optimize-css-assets-webpack-plugin");

const CompressionPlugin = require("compression-webpack-plugin");

const TerserPlugin = require("terser-webpack-plugin");

const InjectCDN = require("./util/injectCDN");

const HtmlwebpackPlugin = require("html-webpack-plugin");

const merge = require("webpack-merge");

const baseConfig = require("./webpack.config.base");

const webpack = require("webpack");

const path = require("path");

const smp = new SpeedMeasurePlugin();
const proConfig = {
  output: {
    path: path.resolve(__dirname, "../admin"),
    filename: `js/[name].[chunkhash].js`,
    chunkFilename: `js/[name].[chunkhash].js`,
    publicPath: "/",
  },
  plugins: [
    //清除上一次打包
    new CleanWebpackPlugin(),
    new HtmlwebpackPlugin({
      title: "admin",
      template: path.resolve(__dirname, "./util/index.html"),
      favicon: path.resolve(__dirname, "./util/favicon.ico"),
      cdn: {
        js: [
          "https://cdn.bootcss.com/react/16.13.1/umd/react.production.min.js",
          "https://cdn.bootcss.com/react-dom/16.13.1/umd/react-dom.production.min.js",
          "https://gw.alipayobjects.com/os/lib/bizcharts/3.5.8/umd/BizCharts.js",
        ],
      },
    }),
    //分析
    // new BundleAnalyzerPlugin(),
    // 提取 css
    new MiniCssExtractPlugin({
      filename: "css/[name].[contenthash].css",
      chunkFilename: "css/[name].[contenthash].css",
      ignoreOrder: false, // Enable to remove warnings about conflicting order
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

    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require("../dll/antd.manifest.json"),
    }),
  ],
  optimization: {
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: false,
      }),
    ],
    splitChunks: {
      cacheGroups: {
        componet: {
          test: /[\\/]node_modules[\\/](axios)[\\/]/,
          name: "componet",
          chunks: "all",
        },
        antd: {
          test: /[\\/]node_modules[\\/](antd)[\\/]/,
          name: "antd",
          chunks: "all",
        },
      },
    },
  },
  externals: {
    react: "React",
    "react-dom": "ReactDOM",
    bizcharts: "BizCharts",
  },
};
// module.exports = smp.wrap(merge(baseConfig, proConfig));
const mergeConfig = merge(baseConfig, proConfig);
module.exports = smp.wrap(mergeConfig);
