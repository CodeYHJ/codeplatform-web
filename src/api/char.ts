import request from "./index";

interface TaskTodayResponse {
  tasksNum: {
    totalNum: number;
    completedNum: number;
    failNum: number;
  };
}
interface TaskWeekResponse extends TaskTodayResponse {}
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
interface GetTasksNumResult {
  total: number;
  complete: number;
}
interface GetTasksNumResultList {
  general: GetTasksNumResult;
  ordinary: GetTasksNumResult;
  warn: GetTasksNumResult;
  danger: GetTasksNumResult;
}

export const getTasksNum: PromiseAxios<unknown, GetTasksNumResultList> = () => {
  return request.get("/chart/getNum");
};
