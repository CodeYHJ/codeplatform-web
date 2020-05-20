
export interface InitState {
  id: number,
  name: string,
  avatar_url: string,
  create_at: string,
  auth: boolean
}
interface ChangeUserInfo {
  name?: string,
  avatar_url?: string,
}
export type Action = { type: "SIGN_IN", playload: InitState } | { type: "SIGN_OUT" } | { type: "CHANGE_USER_INFO", playload: ChangeUserInfo }

export interface IContextProps {
  userStore: InitState,
  dispatchForeUser: React.Dispatch<Action>
}
