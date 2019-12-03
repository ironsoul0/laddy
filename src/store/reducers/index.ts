import { combineReducers, Reducer } from "redux";
import { connectRouter, RouterState } from "connected-react-router";
import { History } from "history";

export interface ApplicationState {
  router: RouterState;
}

const createRootReducer = (history: History): Reducer =>
  combineReducers({
    router: connectRouter(history)
  });

export default createRootReducer;
