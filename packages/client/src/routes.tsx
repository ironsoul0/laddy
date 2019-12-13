import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Global } from "@emotion/core";

import Root from "./components/layout/Root";
import Main from "./components/layout/Main";
import normalize from "./styles/normalize";
import globals from "./styles/globals";

import Problems from "./pages/problems";
import Ladders from "./pages/ladders";
import Profile from "./pages/profile";
import Login from "./pages/login";

const loggedIn = true;

const Routes: React.FC = () => (
  <Root>
    <Global styles={normalize} />
    <Global styles={globals} />
    {loggedIn ? (
      <Main>
        <Switch>
          <Route exact path="/">
            <Redirect to="/ladders" />
          </Route>
          <Route exact path="/ladders" component={Ladders} />
          <Route exact path="/profile" component={Profile} />
          <Route
            exact
            path="/ladders/1"
            render={(): React.ReactNode => <Problems range="[1300, 1399]" />}
          />
          <Redirect to="/" />
        </Switch>
      </Main>
    ) : (
      <Switch>
        <Route exact path="/" component={Login} />
        <Redirect to="/" />
      </Switch>
    )}
  </Root>
);

export default Routes;
