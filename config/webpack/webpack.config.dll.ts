import webpack from "webpack";
import { pathFn } from "./utils";

const dllConfig = {
  mode: "development",
  entry: {
    react: ["react", "react-dom", "react-router-dom"],
    antd: ["antd"],
    bizcharts: ["bizcharts"],
    axios: ["axios"],
  },
  output: {
    filename: "[name].dll.js",
    path: pathFn("./dll"),
    library: "[name]_dll_[hash]",
  },
  plugins: [
    new webpack.DllPlugin({
      name: "[name]_dll_[hash]",
      path: pathFn("./dll/[name].mainfest.json"),
    }),
  ],
};
export default dllConfig;
