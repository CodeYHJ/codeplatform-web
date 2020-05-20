import { InitTaskState, Action } from "./taskTypes"

export const taskReducer = (state: InitTaskState, action: Action) => {
    switch (action.type) {
        case "EDIT":
            const { microtasks } = action.playload
            if (microtasks) {
                const newMicroTasks = microtasks.map(el => el)
                return { ...state, ...action.playload, ...{ microtasks: newMicroTasks } };
            }
            return { ...state, ...action.playload };
        case "EDIT_OUT":
            return Object.assign({}, state);
        case "FILTER":
            const filterList: any[] = []
            state.microtasks.forEach(el => {
                if (el.dsc != '') {
                    filterList.push(el)
                }
            })
            state.microtasks = filterList
            return Object.assign({}, state)
        default:
            return state;
    }
};
