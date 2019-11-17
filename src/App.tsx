import React from "react";
import { Provider } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";

import store, { history } from "./store";

const App: React.FC = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route
          exact
          path="/"
          render={(): React.ReactNode => <div>Match</div>}
        />
        <Route render={(): React.ReactNode => <div>Miss</div>} />
      </Switch>
    </ConnectedRouter>
  </Provider>
);

export default App;
