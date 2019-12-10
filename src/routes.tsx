import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Global } from "@emotion/core";

import Root from "./components/layout/Root";
import Main from "./components/layout/Main";
import normalize from "./styles/normalize";
import globals from "./styles/globals";

import Problems from "./pages/problems";
import Ladders from "./pages/ladders";

const Routes: React.FC = () => (
  <Root>
    <Global styles={normalize} />
    <Global styles={globals} />
    <Main>
      <Switch>
        <Route exact path="/">
          <Redirect to="/ladders" />
        </Route>
        <Route
          exact
          path="/ladders"
          render={(): React.ReactNode => <Ladders />}
        />
        <Route
          exact
          path="/problems/1"
          render={(): React.ReactNode => <Problems range="[1300, 1399]" />}
        />
        <Route
          render={(): React.ReactNode => (
            <h1 style={{ width: "100%" }}>Miss</h1>
          )}
        />
      </Switch>
    </Main>
  </Root>
);

export default Routes;
