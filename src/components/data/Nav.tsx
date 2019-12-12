import React from "react";

import styled from "../../utils/styled";

interface NavProps {
  firstTab: string;
  secondTab: string;
  firstIsActive: boolean;
  setFirstActive: (firstState: boolean) => void;
  className?: string;
}

const Nav: React.FC<NavProps> = ({
  firstTab,
  secondTab,
  firstIsActive,
  setFirstActive,
  className
}) => {
  return (
    <Container className={className}>
      <NavItem active={firstIsActive} onClick={() => setFirstActive(true)}>
        {firstTab}
      </NavItem>
      <NavItem active={!firstIsActive} onClick={() => setFirstActive(false)}>
        {secondTab}
      </NavItem>
      <Separator />
    </Container>
  );
};

export default Nav;

const Container = styled.ul`
  display: flex;
  padding: 0;
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
