import React from 'react';

import { InitTaskState, IContextProps } from "./taskTypes"

import { taskReducer } from "@store/task/taskReducer"

import moment from 'moment';

const { createContext, useReducer } = React


export const INIT_STATE: InitTaskState = {
    id: 0,
    name: '',
    type: 1,
    starttime: moment().format('YYYY-MM-DD'),
    endtime: moment().endOf('day').format('YYYY-MM-DD'),
    frequency: 1,
    complete: 0,
    microtasks: []
};
export const TaskContext = createContext({} as IContextProps);

export const TaskProvider: React.SFC = (props) => {
    const [taskStore, dispatchForeTask] = useReducer(taskReducer, INIT_STATE);
    return (
        <TaskContext.Provider value={{ dispatchForeTask, taskStore }}>
            {props.children}
        </TaskContext.Provider>
    );
}
