import React from "react";
import { Route, Switch } from "react-router-dom";
import { Global } from "@emotion/core";

import Root from "./components/layout/Root";
import Wrapper from "./components/layout/Wrapper";
import normalize from "./styles/normalize";
import globals from "./styles/globals";

import Problems from "./pages/problems";
import Ladders from "./pages/ladders";

const Routes: React.FC = () => (
  <Root>
    <Global styles={normalize} />
    <Global styles={globals} />
    <Wrapper>
      <Switch>
        <Route
          exact
          path="/"
          render={(): React.ReactNode => <Problems range="[1300, 1399]" />}
        />
        <Route
          exact
          path="/ladders"
          render={(): React.ReactNode => <Ladders range="[1300, 1399]" />}
        />
        <Route
          render={(): React.ReactNode => (
            <h1 style={{ width: "100%" }}>Miss</h1>
          )}
        />
      </Switch>
    </Wrapper>
  </Root>
);

export default Routes;
