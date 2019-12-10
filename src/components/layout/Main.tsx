import React from "react";
import { RouterState } from "connected-react-router";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

import { ApplicationState } from "../../store/reducers";
import List from "../icons/List";
import User from "../icons/User";
import Logout from "../icons/Logout";
import logo from "../../assets/logo.svg";
import styled from "../../utils/styled";

interface PropsFromState {
  router: RouterState;
}

const Main: React.FC<PropsFromState> = props => {
  const location = props.router.location.pathname;

  return (
    <Container>
      <Menu>
        <Logo to="/" />
        <div style={{ width: "100%", textAlign: "center" }}>
          <IconWrap
            isActive={
              location.includes("ladders") || location.includes("problems")
            }
          >
            <Icon to="/ladders">
              <List />
            </Icon>
          </IconWrap>
          <IconWrap isActive={location.includes("profile")}>
            <Icon to="/">
              <User />
            </Icon>
          </IconWrap>
        </div>
        <IconWrap>
          <Icon to="/logout">
            <Logout />
          </Icon>
        </IconWrap>
      </Menu>
      <Body>{props.children}</Body>
    </Container>
  );
};

const mapStateToProps = (state: ApplicationState) => ({
  router: state.router
});

export default connect(mapStateToProps)(Main);

interface IconWrapProps {
  isActive?: boolean;
}

const IconWrap = styled.div<IconWrapProps>`
  display: block;

  & svg {
    stroke: ${props =>
      props.isActive ? props.theme.colors.yellow : props.theme.colors.black};
    transition: stroke 0.2s ease-in-out;
  }

  &:nth-of-type(1) {
    margin-bottom: 15px;
  }
`;

const Icon = styled(NavLink)`
  width: 100%;
`;

const Logo = styled(NavLink)`
  width: 60px;
  height: 30px;
  background: url(${logo}) no-repeat center center;
`;

const Menu = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0px;
  width: 80px;
  box-shadow: 0px 10px 40px #f2f2f2;
  margin-right: 60px;

  @media screen and (max-width: ${props => props.theme.breakpoints.sm}) {
    flex-direction: row;
    justify-content: space-between;
    height: auto;
    width: 100%;
  }
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  max-width: ${props => props.theme.widths.lg};
  margin: 0 auto;
  position: relative;

  @media screen and (max-width: ${props => props.theme.breakpoints.lg}) {
    padding: 0 30px;
  }

  @media screen and (max-width: ${props => props.theme.breakpoints.sm}) {
    display: block;
  }
`;

const Body = styled.div`
  width: 100%;
  padding-bottom: 10px;
  max-height: 100vh;
  overflow-y: scroll;
`;
