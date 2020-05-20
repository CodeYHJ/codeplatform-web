
type MicrotaskModel = {
  taskid: number;
  dsc: string;
  id?: number;
  complete: number
};

export enum FrequencyEnum {
  Today = 1,
  Dayliy,
  Weekliy,
}

enum Complete {
  UnComplete = 0,
  Complete = 1,
}
export enum SelectType {
  Date = 1,
  Frequency,
}
export interface InitTaskState {
  id: number;
  name: string;
  type?: SelectType;
  frequency?: FrequencyEnum;
  complete?: Complete;
  microtasks?: MicrotaskModel[];
  starttime?: string;
  endtime?: string
}

export interface playloadState {
  id?: number;
  name?: string;
  type?: SelectType;
  starttime?: string;
  endtime?: string
  frequency?: FrequencyEnum;
  complete?: Complete;
  microtasks?: MicrotaskModel[];
}

export type Action = { type: "EDIT", playload: playloadState } | { type: "EDIT_OUT" } | { type: "FILTER" }

export interface IContextProps {
  taskStore: InitTaskState,
  dispatchForeTask: React.Dispatch<Action>
}
