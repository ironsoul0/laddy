import React, { useState } from "react";
import { useQuery } from "react-apollo";
import { withRouter, RouteComponentProps, Redirect } from "react-router";

import styled from "../utils/styled";
import HeaderCard from "../components/data/HeaderCard";
import Problem from "../components/data/Problem";
import Heading from "../components/data/Heading";
import FloatingButton from "../components/data/FloatingButton";
import withNotification, {
  WithNotificationProps
} from "../components/hocs/withNotification";
import { GET_LADDER_PROBLEMS } from "../graphql/GetLadderProblems";
import Centered from "../components/data/Centered";
import Spinner from "../components/icons/Spinner";

interface RouteParams {
  id: string;
}

interface LadderProblem {
  id: number;
  url: string;
  solved: boolean;
  difficulty: number;
  name: string;
}

interface LadderProblemsInfo {
  rating: string;
  joined: boolean;
  problems: LadderProblem[];
}

interface LadderProblemsData {
  ladderProblems: LadderProblemsInfo;
}

interface LadderProblemsVars {
  ladderID: string;
}

type AllProps = WithNotificationProps & RouteComponentProps<RouteParams>;

const Problems: React.FC<AllProps> = props => {
  const { id } = props.match.params;
  const { data, error } = useQuery<LadderProblemsData, LadderProblemsVars>(
    GET_LADDER_PROBLEMS,
    {
      variables: {
        ladderID: id
      }
    }
  );
  const [isJoined, setJoined] = useState(false);

  if (error) {
    return <Redirect to="/" />;
  }

  if (!data) {
    return (
      <Centered>
        <Spinner color="black" size={35} />
      </Centered>
    );
  }

  const handleClick = () => {
    props.showLoading();
  };

  const {
    ladderProblems: { rating, joined, problems }
  } = data;

  if (joined && !isJoined) {
    setJoined(true);
  }

  return (
    <>
      <Heading>Problems</Heading>
      <RatingRange>{rating}</RatingRange>
      <HeaderCard content={["Problem", "Difficulty level"]} />
      {problems.map(({ id, name, difficulty, solved, url }) => (
        <Problem
          key={id}
          name={name}
          difficulty={difficulty}
          solved={solved}
          url={url}
        />
      ))}
      <FloatingButton joined={isJoined} onClick={handleClick} />
    </>
  );
};

export default withNotification(withRouter(Problems));

const RatingRange = styled.p`
  font-size: 17px;
  color: ${props => props.theme.colors.black};
  margin-top: 10px;
  margin-bottom: 30px;
`;
