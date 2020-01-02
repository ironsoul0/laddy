import { gql } from "apollo-boost";

export const REGISTER = gql`
  mutation Register($email: String!, $password: String!, $handle: String!) {
    register(email: $email, password: $password, handle: $handle)
  }
`;
