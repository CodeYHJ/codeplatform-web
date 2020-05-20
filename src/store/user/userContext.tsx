import React from 'react';

import { InitState, IContextProps } from "./userTypes"

import { userReducer } from "@store/user/userReducer"

const { createContext, useReducer } = React


const INIT_STATE: InitState = {
    id: 0,
    name: '',
    avatar_url: "",
    create_at: "",
    auth: false
};
export const UserContext = createContext({} as IContextProps);

export const UserProvider: React.SFC = (props) => {
    const [userStore, dispatchForeUser] = useReducer(userReducer, INIT_STATE);
    return (
        <UserContext.Provider value={{ userStore, dispatchForeUser }}>
            {props.children}
        </UserContext.Provider>
    );
}
