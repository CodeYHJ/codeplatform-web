const path = require("path");

const webpack = require("webpack");

const dllConfig = {
  entry: {
    react: ["react", "react-dom", "react-router-dom"],
    antd: ["antd"],
    bizcharts: ["bizcharts"],
    axios: ["axios"],
  },
  output: {
    filename: "[name].dll.js",
    path: path.resolve(__dirname, "../dll"),
    library: "[name]_dll_[hash]",
  },
  plugins: [
    new webpack.DllPlugin({
      name: "[name]_dll_[hash]",
      path: path.resolve(__dirname, "../dll", "[name].manifest.json"),
    }),
  ],
};

module.exports = dllConfig;
