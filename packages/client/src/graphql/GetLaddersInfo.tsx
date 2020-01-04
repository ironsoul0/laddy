import { gql } from "apollo-boost";

export const GET_LADDERS_INFO = gql`
  query getLaddersInfo {
    laddersInfo {
      id
      totalUsers
      rating
      totalProblems
      completed
      joined
    }
  }
`;
