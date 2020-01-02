import { gql } from "apollo-boost";

export const GET_LADDER_PROBLEMS = gql`
  query getLadderProblems($ladderID: ID!) {
    ladderProblems(ladderID: $ladderID) {
      joined
      problems {
        url
        solved
        difficulty
      }
    }
  }
`;
