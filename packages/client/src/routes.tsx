import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Global } from "@emotion/core";
import { connect } from "react-redux";

import Root from "./components/layout/Root";
import Main from "./components/layout/Main";

import normalize from "./styles/normalize";
import globals from "./styles/globals";

import Problems from "./pages/problems";
import Ladders from "./pages/ladders";
import Profile from "./pages/profile";
import Login from "./pages/login";
import Confirm from "./pages/confirm";

import { ApplicationState } from "./store/reducers";
import { UserState } from "./store/reducers/user/types";

interface RoutesProps {
  user: UserState;
}

const Routes: React.FC<RoutesProps> = ({ user }) => (
  <Root>
    <Global styles={normalize} />
    <Global styles={globals} />
    {user.loggedIn ? (
      <Main>
        <Switch>
          <Route exact path="/">
            <Redirect to="/ladders" />
          </Route>
          <Route exact path="/ladders" component={Ladders} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/ladders/:id" component={Problems} />
          <Route exact path="/confirm/:token" component={Confirm} />
          <Redirect to="/" />
        </Switch>
      </Main>
    ) : (
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/confirm/:token" component={Confirm} />
        <Redirect to="/" />
      </Switch>
    )}
  </Root>
);

const mapStateToProps = (state: ApplicationState) => ({
  user: state.user
});

export default connect(mapStateToProps)(Routes);
