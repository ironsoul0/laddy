import React from "react";
import { NavLink } from "react-router-dom";

import styled from "../../utils/styled";

interface IconProps {
  src: string;
  selected?: boolean;
  to: string;
}

const Icon: React.FC<IconProps> = props => {
  return <Container to={props.to} {...props}></Container>;
};

export default Icon;

const Container = styled(NavLink)<IconProps>`
  display: block;
  height: 50px;
  width: 100%;
  background-color: red;
  background: url(${props => props.src}) no-repeat center center;
  border-left: ${props => (props.selected ? "3px solid #f8c845" : "")};
`;
