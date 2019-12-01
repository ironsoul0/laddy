import React from "react";
import { Route, Switch } from "react-router-dom";
import { Global } from "@emotion/core";

import Root from "./components/layout/Root";
import Wrapper from "./components/layout/Wrapper";
import normalize from "./styles/normalize";
import globals from "./styles/globals";

import Problems from "./pages/problems";

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
        <Route render={(): React.ReactNode => <div>Miss</div>} />
      </Switch>
    </Wrapper>
  </Root>
);

export default Routes;
