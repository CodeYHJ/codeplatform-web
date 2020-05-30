import { InitTaskState, Action } from "./microTaskTypes"
import { INIT_STATE } from './microTaskContext';

const getInit = () => {
    return INIT_STATE;
}
export const taskReducer = (state: InitTaskState, action: Action) => {
    switch (action.type) {
        case "CLOSE_ALL":
            return { ...getInit() };
        case "OPEN":
            return { ...state, ...action.playload };
        case "CLOSE":
            return { ...state, ...action.playload };
        default:
            return state;
    }
};
