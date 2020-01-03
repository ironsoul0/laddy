import React from "react";
import { useQuery, useMutation } from "react-apollo";
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
import { TOGGLE_LADDER } from "../graphql/ToggleLadder";
import Centered from "../components/data/Centered";
import Spinner from "../components/icons/Spinner";
import { GET_LADDERS_INFO } from "../graphql/GetLaddersInfo";
import { LaddersInfoData } from "./ladders";

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
  const { data: ladderProblemsData, error: ladderProblemsError } = useQuery<
    LadderProblemsData,
    LadderProblemsVars
  >(GET_LADDER_PROBLEMS, {
    variables: {
      ladderID: id
    }
  });

  const [toggleLadder] = useMutation(TOGGLE_LADDER, {
    update(cache, { data }) {
      props.showSuccess(data.toggleLadder ? "Joined!" : "Disjoined!");

      try {
        const cachedData: LaddersInfoData | null = cache.readQuery({
          query: GET_LADDERS_INFO
        });
        if (cachedData) {
          const ladders = cachedData.laddersInfo;
          const toUpdate = ladders.filter(ladder => ladder.id === id);
          toUpdate[0].joined = data.toggleLadder;
          cache.writeQuery({
            query: GET_LADDERS_INFO,
            data: { laddersInfo: ladders }
          });
        }
      } catch {
        console.log("No data in cache");
      }

      const getLadderQuery = {
        query: GET_LADDER_PROBLEMS,
        variables: {
          ladderID: id
        }
      };

      const problemsData = cache.readQuery(
        getLadderQuery
      ) as LadderProblemsData;

      cache.writeQuery({
        ...getLadderQuery,
        data: {
          ladderProblems: {
            ...problemsData.ladderProblems,
            joined: data.toggleLadder
          }
        }
      });
    },
    onError() {
      props.showError();
    }
  });

  if (ladderProblemsError) {
    return <Redirect to="/" />;
  }

  if (!ladderProblemsData) {
    return (
      <Centered>
        <Spinner color="black" size={35} />
      </Centered>
    );
  }

  const {
    ladderProblems: { rating, joined, problems }
  } = ladderProblemsData;

  const handleClick = async () => {
    props.showLoading();
    await toggleLadder({ variables: { ladderID: id, join: !joined } });
  };

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
      <FloatingButton joined={joined} onClick={handleClick} />
    </>
  );
};

export default withNotification(withRouter(Problems));

const RatingRange = styled.p`
  font-size: 17px;
  color: ${props => props.theme.colors.black};
  margin-toppx;
  margin-bottom: 30px;
`;
