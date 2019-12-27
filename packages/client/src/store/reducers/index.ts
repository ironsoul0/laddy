import { combineReducers, Reducer } from "redux";
import { connectRouter, RouterState } from "connected-react-router";
import { History } from "history";

import { NotificationsState } from "./notifications/types";
import { notificationsReducer } from "./notifications/reducer";
import { userReducer } from "./user/reducer";
import { UserState } from "./user/types";

export interface ApplicationState {
  router: RouterState;
  notifications: NotificationsState;
  user: UserState;
}

const createRootReducer = (history: History): Reducer =>
  combineReducers({
    router: connectRouter(history),
    notifications: notificationsReducer,
    user: userReducer
  });

export default createRootReducer;
