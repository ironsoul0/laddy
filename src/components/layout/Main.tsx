import React from "react";
import { RouterState } from "connected-react-router";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import {
  AiOutlineUnorderedList as List,
  AiOutlineUser as User,
  AiOutlineLogout as Logout
} from "react-icons/ai";
import Div100vh from "react-div-100vh";

import MenuIcon from "../icons/MenuIcon";
import { ApplicationState } from "../../store/reducers";
import logo from "../../assets/logo.svg";
import styled from "../../utils/styled";

interface PropsFromState {
  router: RouterState;
}

const Main: React.FC<PropsFromState> = props => {
  const location = props.router.location.pathname;
  const isProfile = location.includes("profile");

  return (
    <Container>
      <Menu>
        <Logo to="/" />
        {/* <div style={{ width: "100%", textAlign: "center" }}> */}
        <MenuIcon to="/ladders" active={!isProfile}>
          <List />
        </MenuIcon>
        <MenuIcon to="/profile" active={isProfile}>
          <User />
        </MenuIcon>
        {/* </div> */}
        <MenuIcon to="/logout">
          <Logout />
        </MenuIcon>
      </Menu>
      <Body>{props.children}</Body>
    </Container>
  );
};

const mapStateToProps = (state: ApplicationState) => ({
  router: state.router
});

export default connect(mapStateToProps)(Main);

const Logo = styled(NavLink)`
  width: 60px;
  height: 30px;
  background: url(${logo}) no-repeat center center;

  @media screen and (max-width: ${props => props.theme.breakpoints.sm}) {
    display: none;
  }
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
    height: auto;
    width: 100%;
    padding-top: 10px;
    padding-bottom: 7px;
    position: absolute;
    bottom: 0;
    top: unset;
    z-index: 100;
    background-color: ${props => props.theme.colors.background};
  }
`;

const Container = styled(Div100vh)`
  width: 100%;
  display: flex;
  max-width: ${props => props.theme.widths.lg};
  margin: 0 auto;
  position: relative;
  overflow-y: scroll;

  @media screen and (max-width: ${props => props.theme.breakpoints.lg}) {
    padding: 0 30px;
  }

  @media screen and (max-width: ${props => props.theme.breakpoints.sm}) {
    padding: 0;
  }
`;

const Body = styled.div`
  width: 100%;
  padding-bottom: 10px;
  overflow-y: scroll;

  @media screen and (max-width: ${props => props.theme.breakpoints.sm}) {
    padding: 0 20px;
  }
`;

const IconsGroup = styled.div`
  width: 100%;
  text-align: center;

  @media screen and (max-width: ${props => props.theme.breakpoints.sm}) {
    display: none;
  }
`;
