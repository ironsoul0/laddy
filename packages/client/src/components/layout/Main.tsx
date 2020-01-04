import React, { useState, useEffect } from "react";
import { RouterState } from "connected-react-router";
import { connect } from "react-redux";
import {
  AiOutlineUnorderedList as List,
  AiOutlineUser as User,
  AiOutlineLogout as Logout
} from "react-icons/ai";
import Div100vh from "react-div-100vh";

import MenuIcon from "../icons/MenuIcon";
import Logo from "../icons/Logo";
import { ApplicationState } from "../../store/reducers";
import styled from "../../utils/styled";
import { logout } from "../../store/reducers/user/actions";
import mixins from "../../styles/mixins";

interface PropsFromState {
  router: RouterState;
  logout: typeof logout;
}

const Main: React.FC<PropsFromState> = props => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const updateWidth = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  });

  const location = props.router.location.pathname;

  const mainLinks = (
    <>
      <MenuIcon
        to="/ladders"
        isActiveIcon={location.includes("ladders")}
        label="Main"
      >
        <List />
      </MenuIcon>
      <MenuIcon
        to="/profile"
        isActiveIcon={location.includes("profile")}
        label="Profile"
      >
        <User />
      </MenuIcon>
    </>
  );

  const handleLogout = () => {
    props.logout();
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <Container>
      <Menu>
        <LogoWrapper>
          <MenuIcon to="/">
            <Logo />
          </MenuIcon>
        </LogoWrapper>
        {width <= 576 ? mainLinks : <DesktopLinks>{mainLinks}</DesktopLinks>}
        <MenuIcon to="/logout" label="Logout" onClick={handleLogout}>
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

export default connect(mapStateToProps, { logout })(Main);

const LogoWrapper = styled.div`
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
  padding-top: 20px;
  padding-bottom: 10px;
  width: 80px;
  box-shadow: 0px 10px 40px #f2f2f2;
  margin-right: 60px;

  &:hover span {
    opacity: 1;
  }

  @media screen and (max-width: ${props => props.theme.breakpoints.sm}) {
    flex-direction: row;
    height: auto;
    width: 100%;
    padding-top: 10px;
    padding-bottom: 7px;
    position: absolute;
    bottom: 0;
    top: unset;
    z-index: 1;
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
  ${mixins.hideScrollBar};

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
    padding-bottom: 80px;
  }
`;

const DesktopLinks = styled.div`
  width: 100%;
  text-align: center;
`;
