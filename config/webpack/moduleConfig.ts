import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { pathFn } from "./utils";
export default {
  rules: [
    {
      test: /\.js|jsx|ts|tsx/,
      exclude: /node_modules/,
      use: [
        {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-typescript", "@babel/preset-react"],
            plugins: [
              [
                "import",
                { libraryName: "antd", libraryDirectory: "lib", style: true },
              ],
              "syntax-dynamic-import",
            ],
          },
        },
      ],
    },
    // antd样式文件
    {
      test: /\.less$/,
      include: /[\\/]node_modules[\\/](antd)[\\/]/,
      exclude: pathFn("/src"),
      use: [
        process.env.NODE_ENV === "development"
          ? "style-loader"
          : MiniCssExtractPlugin.loader,
        "happypack/loader?id=antd",
      ],
    },
    // 项目样式
    {
      test: /\.less$/,
      include: pathFn("./src"),
      use: [
        process.env.NODE_ENV === "development"
          ? "style-loader"
          : MiniCssExtractPlugin.loader,
        "happypack/loader?id=styles",
      ],
    },
    // img优化
    {
      test: /\.(png|svg|jpg|gif|jpeg)$/,
      use: [
        {
          loader: "url-loader",
          options: {
            limit: 8192, //默认单位为bytes
            outputPath: "images/",
          },
        },
      ],
    },
  ],
};
