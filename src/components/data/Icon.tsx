import React from "react";

import styled from "../../utils/styled";

interface IconProps {
  src: string;
  selected?: boolean;
}

const Icon: React.FC<IconProps> = props => {
  return <Container {...props}></Container>;
};

export default Icon;

const Container = styled.a<IconProps>`
  display: block;
  height: 50px;
  width: 100%;
  background-color: red;
  background: url(${props => props.src}) no-repeat center center;
  border-left: ${props => (props.selected ? "3px solid #f8c845" : "")};
`;
