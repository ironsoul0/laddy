import React from "react";

import styled from "../../utils/styled";

interface CardProps {
  content: (string | number)[];
  fontSize: number;
  className?: string;
}

const Card: React.FC<CardProps> = ({ content, fontSize, className }) => {
  return (
    <Container className={className}>
      {content.map((element, index) => (
        <Item fontSize={fontSize} key={index}>
          {element}
        </Item>
      ))}
    </Container>
  );
};

export default Card;

const Container = styled.div`
  width: 100%;
  display: flex;
  border-radius: 10px;
  padding-left: 35px;

  @media screen and (max-width: ${props => props.theme.breakpoints.sm}) {
    padding-left: 25px;
  }
`;

interface ItemProps {
  fontSize: number;
}

const Item = styled.p<ItemProps>`
  font-size: ${props => props.fontSize}px;
  margin: 10px 0;
  width: 165px;
  padding: 0px 5px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;
