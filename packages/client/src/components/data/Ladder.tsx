import React from "react";
import { NavLink } from "react-router-dom";

import Card from "./Card";
import mixins from "../../styles/mixins";
import styled from "../../utils/styled";

interface LadderProps {
  rating: string;
  totalUsers?: number;
  totalProblems?: number;
  completed?: number;
  ladderID: string;
}

const Ladder: React.FC<LadderProps> = ({
  rating,
  totalUsers,
  totalProblems,
  completed,
  ladderID
}) => {
  const content =
    completed !== undefined ? (
      <Card content={[rating, `${completed}%`]} fontSize={14} />
    ) : (
      <Card content={[rating, totalUsers!, totalProblems!]} fontSize={14} />
    );

  return <Container to={`/ladders/${ladderID}`}>{content}</Container>;
};

export default Ladder;

const Container = styled(NavLink)`
  width: 100%;
  display: flex;
  border-radius: 10px;
  margin-bottom: 10px;
  background-color: ${props => props.theme.colors.white};
  ${mixins.dropDecoration};
`;
