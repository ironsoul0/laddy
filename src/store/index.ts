import { createBrowserHistory } from "history";
import { applyMiddleware, compose, createStore, Store } from "redux";
import { routerMiddleware } from "connected-react-router";

import createRootReducer from "./reducers";

export const history = createBrowserHistory();

const composeEnhancers =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store: Store = createStore(
  createRootReducer(history), // root reducer with router state
  composeEnhancers(
    applyMiddleware(
      routerMiddleware(history) // for dispatching history actions
      // ... other middlewares ...
    )
  )
);

export default store;
