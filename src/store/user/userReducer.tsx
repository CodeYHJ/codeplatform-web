import { InitState, Action } from "./userTypes"

export const userReducer = (state: InitState, action: Action) => {
  switch (action.type) {
    case "SIGN_IN":
      localStorage.setItem("user", JSON.stringify(action.playload))
      return { ...state, ...action.playload, auth: true };
    case "SIGN_OUT":
      localStorage.removeItem('user')
      return Object.assign({}, state, { auth: false });
    case "CHANGE_USER_INFO":
      const user = JSON.parse(localStorage.getItem("user"))
      const newUser = { ...user, ...action.playload };
      localStorage.setItem("user", JSON.stringify(newUser))
      return newUser;
    default:
      return state;
  }
};
