import request from "./index";

import { AxiosResponse } from "axios";

import { PromiseAxios } from "./char";

type userRequest = { name: string; password: string };

interface LoginRespone extends AxiosResponse {
  user: {
    name: string;
    id: number;
    avatar_url: string;
    create_at: string;
    auth: boolean;
  };
}
interface findNameResponse {
  status: boolean;
}

export interface UpdateUserRequest {
  name?: string;
  avatar_url?: string;
  password?: string;
}
interface UpdateUserResponse {
  name: string;
  avatar_url: string;
  password: boolean;
}

interface UserResponse {
  user: {
    name: string;
    avatar_url: string;
  };
}

export const singIn: PromiseAxios<userRequest, LoginRespone> = (
  requestData
) => {
  return request.post("/user/login", requestData);
};

export const registered: PromiseAxios<userRequest, LoginRespone> = (
  requestData
) => {
  return request.post("/user/registered", requestData);
};

export const singOut: PromiseAxios<any, LoginRespone> = () => {
  return request.post("/user/logout");
};

export const findName: PromiseAxios<string, findNameResponse> = (name) => {
  return request.post("/user/findname", { name });
};

export const updateUser: PromiseAxios<UpdateUserRequest, UpdateUserResponse> = (
  data
) => {
  return request.post("/user/updateuser", data);
};

export const getUserInfo: PromiseAxios<unknown, UserResponse> = () => {
  return request.get("/user/userinfo");
};
