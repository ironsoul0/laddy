export enum UserActionTypes {
  LOGIN = "@@user/LOGIN",
  LOGOUT = "@@user/LOGOUT"
}

export interface UserState {
  token: string;
  loggedIn: boolean;
}
