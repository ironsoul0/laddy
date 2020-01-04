import { gql } from "apollo-boost";

export const CONFIRM_USER = gql`
  mutation ConfirmUser($token: String!) {
    confirmUser(token: $token)
  }
`;
