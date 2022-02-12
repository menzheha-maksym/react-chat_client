import { gql } from "urql";

export const RegisterMutaion = gql`
  mutation Register($input: UserInput!) {
    register(input: $input) {
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
