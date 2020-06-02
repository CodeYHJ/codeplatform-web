import React from 'react';

import { InitTaskState, IContextProps } from "./microTaskTypes"

import { taskReducer } from "@store/microTask/microTaskReducer"

const { createContext, useReducer } = React

export const INIT_STATE: InitTaskState = {
    titleOPen: false,
    dateOpen: false,
    nameOpen: false
};
export const MicroTaskContext = createContext({} as IContextProps);

export const MicroTaskProvider: React.SFC = (props) => {
    const [microTaskStore, dispatchForeTask] = useReducer(taskReducer, INIT_STATE);
    return (
        <MicroTaskContext.Provider value={{ dispatchForeTask, microTaskStore }}>
            {props.children}
        </MicroTaskContext.Provider>
    );
}
