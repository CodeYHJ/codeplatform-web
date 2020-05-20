import request from "./index";
import { PromiseAxiosNoPra, PromiseAxios } from "./char";

enum AuthTypeEnum {
  yuque = 1,
  Gitee,
  GitHub,
}
interface Token {
  name: string;
  id: number;
  credential: string;
  oauthType: AuthTypeEnum;
}
interface GetTokenResponse {
  tokenList: Token[];
}
interface SetTokenRequest {
  id?: number;
  name: string;
  credential: string;
  oauthtype: AuthTypeEnum;
}
interface SetTokenResponse {
  status: boolean;
}

interface DeleteTokenRequest {
  id: number
}

export const getToken: PromiseAxiosNoPra<GetTokenResponse> = () => {
  return request.get("/auth/getToken");
};

export const setToken: PromiseAxios<SetTokenRequest, SetTokenResponse> = (
  data
) => {
  return request.post("/auth/setToken", data);
};
export const updateToken: PromiseAxios<SetTokenRequest, SetTokenResponse> = (
  data
) => {
  return request.post("/auth/updateToken", data);
};

export const deleteToken: PromiseAxios<DeleteTokenRequest, SetTokenResponse> = (
  data
) => {
  return request.post("/auth/deleteToken", data);
};

