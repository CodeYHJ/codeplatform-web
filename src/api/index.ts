import axios, { AxiosRequestConfig, AxiosError, AxiosResponse } from "axios";

import { message } from "antd";

let baseURL = "";

if (process.env.DEPLOY === "pro") {
  baseURL = "https://api.codeyhj.top";
} else if (process.env.DEPLOY === "pre") {
  baseURL = "https://apipretest.codeyhj.top";
} else {
  baseURL = "/api";
}
const config: AxiosRequestConfig = {
  baseURL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 8000,
};

const instance = axios.create(config);

instance.interceptors.request.use(
  (cfg: AxiosRequestConfig) => {
    // if (cfg.method === 'post') {
    //     cfg.data = qs.stringify(cfg.data)
    // }
    return cfg;
  },
  (err: AxiosError) => {
    console.log(err, "请求报错");
    return Promise.reject(err);
  }
);

instance.interceptors.response.use(
  (res: AxiosResponse) => {
    const { code, message: msg, data } = res.data;
    if (code === "200") {
      return data;
    } else if (code === "401") {
      localStorage.removeItem("user");
      window.location.replace("/login");
    } else {
      message.error(msg);
      return Promise.reject(msg);
    }
  },
  (err: AxiosError) => {
    let msg = null;
    if (err.message === "Request failed with status code 404") {
      msg = "连接失败，请检查网络是否正常";
    }
    message.error(msg || err.message);

    return Promise.reject(err);
  }
);

export default instance;
