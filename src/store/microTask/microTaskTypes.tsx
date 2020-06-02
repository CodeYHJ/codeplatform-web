


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


export interface InitTaskState {
  titleOPen?: boolean;
  dateOpen?: boolean;
  nameOpen?: boolean;

}

export type Action = { type: "CLOSE_ALL" } | { type: "CLOSE", playload: InitTaskState } | { type: "OPEN", playload: InitTaskState }

export interface IContextProps {
  microTaskStore: InitTaskState,
  dispatchForeTask: React.Dispatch<Action>
}
