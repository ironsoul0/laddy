import { gql } from "apollo-boost";

export const TOGGLE_LADDER = gql`
  mutation ToggleLadder($ladderID: ID!, $join: Boolean!) {
    toggleLadder(ladderID: $ladderID, join: $join)
  }
`;
