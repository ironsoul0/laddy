import React from "react";
import styled from "../../utils/styled";

interface ProblemProps {
  name: string;
  difficulty: number;
  solved: boolean;
  link: string;
}

const Problem: React.FC<ProblemProps> = ({
  name,
  difficulty,
  solved,
  link
}) => {
  const openProblem = (): void => {
    window.open(link, "_blank");
  };

  return (
    <Container solved={solved} onClick={openProblem}>
      <ProblemDesc>{name}</ProblemDesc>
      <ProblemDesc>{difficulty}</ProblemDesc>
    </Container>
  );
};

export default Problem;

interface ContainerProps {
  solved: boolean;
}

const Container = styled.div<ContainerProps>`
  width: 100%;
  display: flex;
  border-radius: 10px;
  margin-bottom: 10px;
  box-shadow: ${props =>
    props.solved ? "0px 10px 40px rgba(183, 255, 157, 0.4)" : ""};
  background-color: ${props =>
    props.solved ? props.theme.colors.green : props.theme.colors.white};

  &:hover {
    cursor: pointer;
  }
`;

const ProblemDesc = styled.p`
  font-size: 14px;
  margin: 10px 0;
  padding-left: 35px;

  &:nth-of-type(1) {
    width: 175px;
  }
`;