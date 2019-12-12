import React from "react";

import styled from "../../utils/styled";
import Card from "./Card";

interface HeaderCardProps {
  content: (string | number)[];
}

const HeaderCard: React.FC<HeaderCardProps> = ({ content }) => {
  return <Container content={content} fontSize={16} />;
};

export default HeaderCard;

const Container = styled(Card)`
  margin-bottom: 10px;
`;
