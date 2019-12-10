import React from "react";
import { NavLink } from "react-router-dom";

import styled from "../../utils/styled";

interface LadderProps {
  range: string;
  users?: number;
  problems?: number;
  complete?: number;
  ladderID: number;
}

const Ladder: React.FC<LadderProps> = ({
  range,
  users,
  problems,
  complete,
  ladderID
}) => {
  const content = complete ? (
    <>
      <LadderDesc>{range}</LadderDesc>
      <LadderDesc>{complete}%</LadderDesc>
    </>
  ) : (
    <>
      <LadderDesc>{range}</LadderDesc>
      <LadderDesc>{users}</LadderDesc>
      <LadderDesc>{problems}</LadderDesc>
    </>
  );

  return <Container to={`/problems/${ladderID}`}>{content}</Container>;
};

export default Ladder;

const Container = styled(NavLink)`
  width: 100%;
  display: flex;
  border-radius: 10px;
  margin-bottom: 10px;
  background-color: ${props => props.theme.colors.white};

  &,
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;

const LadderDesc = styled.p`
  font-size: 14px;
  margin: 10px 0;
  padding-left: 35px;
  width: 175px;

  &:nth-of-last-type(1) {
    width: 0px;
  }
`;
