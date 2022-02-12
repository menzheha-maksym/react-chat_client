import { gql } from "urql";

export const LoginMutaion = gql`
  mutation Login($input: UserInput!) {
    login(input: $input) {
      user {
        id
        username
      }
      errors {
        field
        message
      }
    }
  }
`;
