import React from "react";
import { NavLink } from "react-router-dom";

import mixins from "../../styles/mixins";
import styled from "../../utils/styled";

interface IconProps {
  to: string;
  isActiveIcon?: boolean;
  label?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

const Icon: React.FC<IconProps> = props => {
  const { children, label, isActiveIcon, onClick } = props;

  return (
    <Container
      style={{ color: !!isActiveIcon ? "#f5cf67" : "black" }}
      onClick={onClick}
      to={props.to}
    >
      {children}
      {label ? <Label isActiveIcon={!!isActiveIcon}>{label}</Label> : null}
    </Container>
  );
};

export default Icon;

interface StyleProps {
  isActiveIcon: boolean;
}

const Container = styled(NavLink)`
  display: block;
  width: 100%;
  text-align: center;
  font-size: 28px;
  height: 50px;
  transition: color 0.2s ease-in-out;
  ${mixins.dropDecoration};

  &:nth-of-type(1) {
    margin-bottom: 15px;
  }

  &:hover span {
    font-size: 15px;
  }

  @media screen and (max-width: ${props => props.theme.breakpoints.sm}) {
    &:nth-of-type(1) {
      margin-bottom: 0px;
    }
  }
`;

const Label = styled.span<StyleProps>`
  font-size: 14px;
  display: block;
  opacity: 0;
  transition: opacity 0.1s linear, font-size 0.1s linear;

  color: ${props =>
    props.isActiveIcon ? props.theme.colors.yellow : props.theme.colors.black};

  @media screen and (max-width: ${props => props.theme.breakpoints.sm}) {
    opacity: 1;
  }
`;
