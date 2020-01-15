import React from "react";
import Div100vh from "react-div-100vh";
import { connect } from "react-redux";
import { RouterState } from "connected-react-router";
import Helmet from "react-helmet";

import Notification from "../data/Notification";
import styled from "../../utils/styled";
import ForkMe from "../data/ForkMe";
import mixins from "../../styles/mixins";
import { ApplicationState } from "../../store/reducers";

interface RootProps {
  children?: React.ReactNode;
}

interface PropsFromState {
  router: RouterState;
}

const Root: React.FC<RootProps & PropsFromState> = ({ children, router }) => {
  const isMainPage = router.location.pathname === "/";

  return (
    <Wrapper>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Laddy</title>
        <link rel="canonical" href="https://laddy.app" />
        <meta
          name="description"
          content="Ladders consisting of Codeforces problems for your rating."
        />
      </Helmet>
      {!isMainPage && <ForkMe />}
      <Notification />
      {children}
    </Wrapper>
  );
};

const mapStateToProps = (state: ApplicationState) => ({
  router: state.router
});

export default connect(mapStateToProps)(Root);

const Wrapper = styled(Div100vh)`
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
  background-color: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.body};
  font-family: ${props => props.theme.fonts.body};
  ${mixins.hideScrollBar};
`;
