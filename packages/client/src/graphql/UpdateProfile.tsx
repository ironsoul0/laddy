import { gql } from "apollo-boost";

export const UPDATE_PROFILE = gql`
  mutation Update($password: String!, $newPassword: String!, $handle: String!) {
    updateProfile(
      password: $password
      newPassword: $newPassword
      handle: $handle
    )
  }
`;
