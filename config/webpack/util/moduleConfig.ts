import MiniCssExtractPlugin from "mini-css-extract-plugin";

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
      include: [/node_modules/],
      use: [
        process.env.NODE_ENV === "development"
          ? "style-loader"
          : MiniCssExtractPlugin.loader,
        "css-loader",
        "postcss-loader",
        {
          loader: "less-loader",
          options: {
            javascriptEnabled: true,
          },
        },
      ],
    },
    // 项目样式
    {
      test: /\.less$/,
      exclude: [/node_modules/],
      use: [
        process.env.NODE_ENV === "development"
          ? "style-loader"
          : MiniCssExtractPlugin.loader,
        {
          loader: "css-loader",
          options: {
            importLoaders: 1,
            modules: true,
            // localIdentName: "[name]__[local]___[hash:base64:5]",
          },
        },
        "postcss-loader",
        "less-loader",
      ],
    },
    // img优化
    {
      test: /\.(png|svg|jpg|gif|jpeg)$/,
      use: [
        {
          loader: "url-loader",
          options: {
            limit: 100, //默认单位为bytes
            outputPath: "images/",
          },
        },
      ],
    },
  ],
};
