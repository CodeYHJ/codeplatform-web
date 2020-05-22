import request from "./index";
import { BaseMicrotask } from "./task";

interface TaskTodayResponse {
  tasksNum: {
    totalNum: number;
    completedNum: number;
    failNum: number;
  };
}
interface TaskWeekResponse extends TaskTodayResponse { }
interface TaskMonthResponse {
  tasksList: { name: string; day: string; num: number }[];
}

export type PromiseAxios<D, T> = (data?: D) => Promise<T>;

export type PromiseAxiosNoPra<T> = () => Promise<T>;

export const getTasksToday: PromiseAxios<unknown, TaskTodayResponse> = () => {
  return request.get("/chart/taskstoday");
};
export const getTasksInWeek: PromiseAxios<unknown, TaskWeekResponse> = () => {
  return request.get("/chart/tasksweek");
};
export const getTaskInMonth: PromiseAxios<unknown, TaskMonthResponse> = () => {
  return request.get("/chart/tasksmonth");
};

/**
 *
 *
 */

export interface GetTasksNumMicro {
  complete: string;
  priority: number;
  total: number;
  day: number;
}
interface GetTasksNumResult {
  result: GetTasksNumMicro[];
}
export const getTasksNum: PromiseAxios<unknown, GetTasksNumResult> = () => {
  return request.get("/chart/getNum");
};


export const getTrend: PromiseAxios<unknown, GetTasksNumResult> = () => {
  return request.get("/chart/getTrend");
};