import React, { useState } from "react";

import Nav from "../components/data/Nav";
import styled from "../utils/styled";
import Heading from "../components/data/Heading";
import Ladder from "../components/data/Ladder";
import HeaderCard from "../components/data/HeaderCard";

const Ladders: React.FC = () => {
  const [isJoined, setJoined] = useState(true);

  return (
    <>
      <Heading>Ladders</Heading>
      <NavWrapper
        firstTab="Joined"
        secondTab="All"
        firstIsActive={isJoined}
        setFirstActive={setJoined}
      />
      <HeaderCard content={["Rating", "Users", "Problems"]} />
      <Ladder range="< 1300" users={10901} problems={2413} ladderID={1} />
      <Ladder range="[1400, 1499]" users={10901} problems={2413} ladderID={1} />
      <Ladder range="[1500, 1599]" users={10901} problems={2413} ladderID={1} />
    </>
  );
};

export default Ladders;

const NavWrapper = styled(Nav)`
  margin-top: 50px;
  margin-bottom: 20px;
`;
