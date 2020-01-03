import React from "react";

import Plus from "../icons/Plus";
import styled from "../../utils/styled";

interface FloatingButtonProps {
  joined: boolean;
  disabled?: boolean;
  onClick: () => void;
}

const FloatingButton: React.FC<FloatingButtonProps> = props => {
  return (
    <Button
      joined={props.joined}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      <Plus />
    </Button>
  );
};

export default FloatingButton;

const Button = styled.button<FloatingButtonProps>`
  background-color: ${props =>
    props.joined ? "rgba(246,99,108,0.8)" : "rgba(245, 207, 103, 0.9)"};
  box-shadow: ${props =>
    props.joined
      ? "0px 10px 40px rgba(246, 99, 108, 0.6)"
      : "0px 10px 40px rgba(249, 208, 95, 0.6)"};
  transform: ${props => (props.joined ? "rotate(45deg)" : "")};
  border: none;
  outline: none;
  position: absolute;
  bottom: 30px;
  right: 20px;
  color: #fff;
  width: 48px;
  height: 48px;
  border-radius: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: ${props =>
      props.joined ? "rgba(246,99,108,0.9)" : "rgba(245, 207, 103, 1.0)"};
    cursor: pointer;
  }

  @media screen and (max-width: ${props => props.theme.breakpoints.lg}) {
    right: 40px;
  }

  @media screen and (max-width: ${props => props.theme.breakpoints.sm}) {
    bottom: 80px;
  }
`;
