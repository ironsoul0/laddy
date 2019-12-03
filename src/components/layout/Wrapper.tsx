import React from "react";

import Icon from "../data/Icon";
import list from "../../assets/list.svg";
import exit from "../../assets/exit.svg";
import logo from "../../assets/logo.svg";
import problems from "../../assets/problems.svg";
import profile from "../../assets/profile.svg";
import styled from "../../utils/styled";

const Wrapper: React.FC = props => {
  return (
    <Container>
      <Menu>
        <Logo
          href="https://brainex.co"
          target="_blank"
          rel="noopener noreferrer"
        />
        <div style={{ width: "100%" }}>
          <Icon src={list} selected />
          <Icon src={profile} />
        </div>
        <Icon src={exit} />
      </Menu>
      {props.children}
    </Container>
  );
};

const Logo = styled.a`
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

  @media screen and (max-width: ${props => props.theme.breakpoints.lg}) {
    padding: 0 30px;
  }

  @media screen and (max-width: ${props => props.theme.breakpoints.sm}) {
    display: block;
  }
`;

export default Wrapper;
