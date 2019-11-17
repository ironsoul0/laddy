import React from "react";
import { Route, Switch } from "react-router-dom";
import { Global } from "@emotion/core";

import Root from "./components/layout/Root";
import normalize from "./styles/normalize";
import globals from "./styles/globals";

const Routes: React.SFC = () => (
  <Root>
    <Global styles={normalize} />
    <Global styles={globals} />
    <Switch>
      <Route exact path="/" render={(): React.ReactNode => <div>Match</div>} />
      <Route render={(): React.ReactNode => <div>Miss</div>} />
    </Switch>
  </Root>
);

export default Routes;
