import request from "./index";

import {
  InitTaskState,
  SelectType,
  FrequencyEnum,
} from "@store/task/taskTypes";

import { PromiseAxios, PromiseAxiosNoPra } from "./char";

interface UpdateTaskRequest extends InitTaskState {
  create_at?: string;
  microtaskid?: number;
  microtaskcomplete?: boolean;
}

interface ClosetaskRequest {
  id: number;
  complete: number;
}
interface addTaskRequest {
  name: string;
  type: SelectType;
  starttime: string;
  endtime: string;
}

interface TaskResponse {
  taskList: BaseTask[];
}

interface UpdateTaskResponse {
  status: boolean;
}
interface AddTaskResponse {
  task: BaseTask;
}

interface DeleteMicroTaskResponse extends UpdateTaskResponse { }

interface DeleteMicroTaskResponse extends UpdateTaskResponse { }

interface ClosetaskResponse extends UpdateTaskResponse { }

export const getTasks: PromiseAxios<unknown, TaskResponse> = () => {
  return request.get("task/tasks");
};

export const addTaskRequest: PromiseAxios<addTaskRequest, AddTaskResponse> = (
  data
) => {
  return request.post("/task/addtask", data);
};

export const updateTaskRequest: PromiseAxios<
  UpdateTaskRequest,
  UpdateTaskResponse
> = (task) => {
  if (task && task.hasOwnProperty("create_at")) delete task["create_at"];
  return request.post("/task/updatetask", task);
};

export const deleteMircoTask: PromiseAxios<number, DeleteMicroTaskResponse> = (
  id
) => {
  return request.post("/task/deletemicrotask", { microtaskid: id });
};

export const closetaskRequest: PromiseAxios<
  ClosetaskRequest,
  ClosetaskResponse
> = (data) => {
  return request.post("/task/closetask", data);
};

//////
interface BaseStatusResponse {
  status: boolean;
}
interface BaseRequest {
  name: string;
}
export interface BaseTask {
  id: number;
  name: String;
  frequency: FrequencyEnum;
  starttime: string;
  endtime: string;
  type: number;
  complete: number;
  create_at: String;
  microtasks: BaseMicrotask[];
}
export interface BaseMicrotask {
  id: number;
  taskid: number;
  dsc: string;
  complete: number;
  remark: null | string;
  priority: number,
  endtime:string,
}
interface CreateTaskRequest extends BaseRequest { }

export const createTaskRequest: PromiseAxios<
  CreateTaskRequest,
  BaseStatusResponse
> = (data) => {
  return request.post("/task/create", data);
};
interface GetTaskResponse {
  taskList: BaseTask[];
}
export const getTaskRequest: PromiseAxiosNoPra<GetTaskResponse> = () => {
  return request.get("/task/get");
};
interface CreateMicroRequest {
  id: number;
  name: string;
}
export const createMicroRequest: PromiseAxios<
  CreateMicroRequest,
  BaseStatusResponse
> = (data) => {
  return request.post("/task/createMicro", data);
};

interface GetTaskByTaskIdRequest {
  taskid: number;
}
interface GetTaskByTaskIdResponse {
  task: BaseTask;
}
export const getTaskByTaskId: PromiseAxios<
  GetTaskByTaskIdRequest,
  GetTaskByTaskIdResponse
> = (data) => {
  return request.get("/task/getTask", { params: data });
};

interface DeleteTaskRequest extends GetTaskByTaskIdRequest { }

interface DeleteTaskResponse extends BaseStatusResponse { }

export const deleteTaskRequest: PromiseAxios<
  DeleteTaskRequest,
  DeleteTaskResponse
> = (data) => {
  return request.post("/task/deleteTask", data);
};
interface UpDateMicroTaskStatusRequest {
  id: number;
  complete: number;
}
interface UpDateMicroTaskStatusResponse extends UpdateTaskResponse { }

export const upDateMicroTaskStatus: PromiseAxios<
  UpDateMicroTaskStatusRequest,
  BaseStatusResponse
> = (data) => {
  return request.post("/task/upMComplete", data);
};

interface UpDateMicroTaskDscRequest {
  id: number;
  dsc: string;
}
interface UpDateMicroTaskDscResponse extends UpdateTaskResponse { }

export const upDateMicroTaskDsc: PromiseAxios<
  UpDateMicroTaskDscRequest,
  UpDateMicroTaskDscResponse
> = (data) => {
  return request.post("/task/upMdsc", data);
};

interface UpDateMicroTaskLevelRequest {
  id: number;
  priority: number;
}
interface UpDateMicroTaskLevelResponse extends UpdateTaskResponse { }

export const upDateMicroTaskLevel: PromiseAxios<
  UpDateMicroTaskLevelRequest,
  UpDateMicroTaskLevelResponse
> = (data) => {
  return request.post("/task/upMlevel", data);
};


interface UpDateMicroTaskRemarkRequest {
  id: number;
  remark: string;
}
interface UpDateMicroTaskRemarkResponse extends UpdateTaskResponse { }

export const upDateMicroTaskRemark: PromiseAxios<
  UpDateMicroTaskRemarkRequest,
  UpDateMicroTaskRemarkResponse
> = (data) => {
  return request.post("/task/upMmark", data);
};

interface UpDateDeadTimeRequest {
  id: number;
  endtime?: string;
}
interface UpDateDeadTimeResponse extends UpdateTaskResponse { }
export const upDateDeadTime: PromiseAxios<
  UpDateDeadTimeRequest,
  UpDateDeadTimeResponse
> = (data) => {
  return request.post("/task/upMtime", data);
};


interface DeleteAllMicroTaskRequest {
  taskid: number;
}
interface DeleteAllMicroTaskResponse extends UpdateTaskResponse { }
export const deleteAllMicroTask: PromiseAxios<
DeleteAllMicroTaskRequest,
DeleteAllMicroTaskResponse
> = (data) => {
  return request.post("/task/deleteMall", data);
};
