import { gql } from "apollo-boost";

export const GET_PROFILE = gql`
  query getProfile {
    profile {
      email
      handle
    }
  }
`;
