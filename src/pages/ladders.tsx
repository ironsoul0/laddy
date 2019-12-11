import React, { useState } from "react";

import styled from "../utils/styled";
import Heading from "../components/data/Heading";
import Ladder from "../components/data/Ladder";

const Ladders: React.FC = () => {
  const [isJoined, setJoined] = useState(true);

  return (
    <>
      <Heading>Ladders</Heading>
      <Nav>
        <NavItem active={isJoined} onClick={() => setJoined(!isJoined)}>
          Joined
        </NavItem>
        <NavItem active={!isJoined} onClick={() => setJoined(!isJoined)}>
          All
        </NavItem>
        <Separator />
      </Nav>
      <LaddersHeader>
        <ListItem>Rating</ListItem>
        <ListItem>Users</ListItem>
        <ListItem>Problems</ListItem>
      </LaddersHeader>
      <Ladder range="< 1300" users={10901} problems={2413} ladderID={1} />
      <Ladder range="[1400, 1499]" users={10901} problems={2413} ladderID={1} />
      <Ladder range="[1500, 1599]" users={10901} problems={2413} ladderID={1} />
    </>
  );
};

export default Ladders;

const Nav = styled.ul`
  display: flex;
  padding: 0;
  margin-top: 50px;
  margin-bottom: 30px;
  position: relative;
`;

interface NavItemProps {
  active?: boolean;
}

const NavItem = styled.div<NavItemProps>`
  font-weight: bold;
  font-size: 20px;
  list-style-type: none;
  width: 85px;
  padding-bottom: 7px;
  z-index: 1;
  text-align: center;
  border-bottom: ${props =>
    props.active
      ? `2px solid ${props.theme.colors.yellow}`
      : `2px solid #eaecef`};
  color: ${props =>
    props.active ? props.theme.colors.yellow : props.theme.colors.black};

  &:nth-of-last-type(1) {
    width: 0px;
  }

  &:hover {
    cursor: pointer;
  }

  transition: border-bottom-color 0.2s ease-in-out, color 0.2s ease-in-out;
`;

const Separator = styled.div`
  width: 100%;
  height: 2px;
  background-color: #eaecef;
  margin-bottom: 40px;
  position: absolute;
  top: 30px;
`;

const ListItem = styled.li`
  font-size: 16px;
  list-style-type: none;
  width: 175px;

  &:nth-of-last-type(1) {
    width: 0px;
  }
`;

const LaddersHeader = styled.ul`
  display: flex;
  padding-left: 35px;
`;
