import React, { useState } from "react";
import { useQuery } from "react-apollo";

import Nav from "../components/data/Nav";
import styled from "../utils/styled";
import Heading from "../components/data/Heading";
import Ladder from "../components/data/Ladder";
import HeaderCard from "../components/data/HeaderCard";
import Spinner from "../components/icons/Spinner";
import { GET_LADDERS_INFO } from "../graphql/GetLaddersInfo";
import Centered from "../components/data/Centered";

interface LadderInfo {
  id: number;
  totalUsers: number;
  rating: string;
  totalProblems: number;
  joined: boolean;
}

interface LaddersInfoData {
  laddersInfo: LadderInfo[];
}

const Ladders: React.FC = () => {
  const [isJoined, setJoined] = useState(true);
  const { data } = useQuery<LaddersInfoData>(GET_LADDERS_INFO);

  if (!data) {
    return (
      <Centered>
        <Spinner color="black" size={35} />
      </Centered>
    );
  }

  const laddersInfo = data.laddersInfo;
  const joinedLadders = laddersInfo.filter(ladderInfo => ladderInfo.joined);

  return (
    <>
      <Heading>Ladders</Heading>
      <NavWrapper
        firstTab="Joined"
        secondTab="All"
        firstIsActive={isJoined}
        setFirstActive={setJoined}
      />
      {((isJoined && joinedLadders.length > 0) || !isJoined) && (
        <HeaderCard content={["Rating", "Users", "Problems"]} />
      )}
      {(isJoined ? joinedLadders : laddersInfo).map(ladder => (
        <Ladder
          key={ladder.id}
          rating={ladder.rating}
          ladderID={ladder.id}
          totalUsers={ladder.totalUsers}
          totalProblems={ladder.totalProblems}
        />
      ))}
      {isJoined && joinedLadders.length === 0 && (
        <Info>You didn&apos;t join any ladders yet.</Info>
      )}
    </>
  );
};

export default Ladders;

const NavWrapper = styled(Nav)`
  margin-top: 50px;
  margin-bottom: 20px;
`;

const Info = styled.h2`
  font-weight: normal;
  font-size: 17px;
  margin-top: 30px;
  margin-left: 5px;
`;
