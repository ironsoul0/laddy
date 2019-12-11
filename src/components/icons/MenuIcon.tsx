import React from "react";
import { NavLink } from "react-router-dom";

import styled from "../../utils/styled";

interface IconProps {
  to: string;
  active?: boolean;
}

const Icon: React.FC<IconProps> = props => {
  return <Container {...props}>{props.children}</Container>;
};

export default Icon;

const Container = styled(NavLink)<IconProps>`
  display: block;
  width: 100%;
  text-align: center;
  font-size: 28px;
  transition: color 0.2s ease-in-out;
  color: ${props =>
    props.active ? props.theme.colors.yellow : props.theme.colors.black};

  &:nth-of-type(1) {
    margin-bottom: 15px;
  }

  @media screen and (max-width: ${props => props.theme.breakpoints.sm}) {
    &:nth-of-type(1) {
      margin-bottom: 0px;
    }
  }
`;
