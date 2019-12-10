import { combineReducers, Reducer } from "redux";
import { connectRouter, RouterState } from "connected-react-router";
import { History } from "history";

import { NotificationsState } from "./notifications/types";
import { notificationsReducer } from "./notifications/reducer";

export interface ApplicationState {
  router: RouterState;
  notifications: NotificationsState;
}

const createRootReducer = (history: History): Reducer =>
  combineReducers({
    router: connectRouter(history),
    notifications: notificationsReducer
  });

export default createRootReducer;
