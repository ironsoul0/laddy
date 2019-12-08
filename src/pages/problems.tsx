import React from "react";

import styled from "../utils/styled";
import Problem from "../components/data/Problem";
import Heading from "../components/data/Heading";

interface ProblemsProps {
  range: string;
}

const Problems: React.FC<ProblemsProps> = ({ range }) => {
  return (
    <>
      <Heading>Problems</Heading>
      <RatingRange>{range}</RatingRange>
      <ProblemsHeader>
        <ListItem>Problem name</ListItem>
        <ListItem>Difficulty level</ListItem>
      </ProblemsHeader>
      <Problem
        name="Kekocity"
        difficulty={3}
        solved={true}
        link="https://codeforces.com/contest/1255/problem/E1"
      />
      <Problem
        name="Krauch's Adventure"
        difficulty={4}
        solved={false}
        link="https://codeforces.com/contest/1255/problem/E1"
      />
    </>
  );
};

export default Problems;

const RatingRange = styled.p`
  font-size: 17px;
  color: ${props => props.theme.colors.black};
  margin-top: 10px;
  margin-bottom: 50px;
`;

const ListItem = styled.li`
  font-weight: 400;
  font-size: 16px;
  list-style-type: none;
  width: 175px;

  &:nth-of-last-type(1) {
    width: 0px;
  }
`;

const ProblemsHeader = styled.ul`
  display: flex;
  padding-left: 35px;
`;
