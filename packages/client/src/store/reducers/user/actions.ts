import { action } from "typesafe-actions";

import { UserActionTypes } from "./types";

export const logout = () => action(UserActionTypes.LOGOUT);

export const login = (token: string) => action(UserActionTypes.LOGIN, token);
