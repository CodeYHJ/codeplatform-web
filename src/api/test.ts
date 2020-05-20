import { PromiseAxiosNoPra, PromiseAxios } from "./char";
import request from "./index";

export interface TestResponse {
  name: string;
  url: string;
  working: boolean;
  [key: string]: any;
}
export interface TestDscResponst {
  building: boolean;
  fullDisplayName: string;
  id: number;
  queueId: number;
  result: string;
  [key: string]: any;
}
export interface GetTestDscResponse {
  dscList: TestDscResponst[];
}

interface TestListResponse {
  list: TestResponse[];
}

export const getTestList: PromiseAxiosNoPra<TestListResponse> = () => {
  return request.get("/jenkins/alltest");
};

export const getTestDsc: PromiseAxios<string, GetTestDscResponse> = (
  testname
) => {
  return request.get("/jenkins/testdsc", { params: { testname } });
};
