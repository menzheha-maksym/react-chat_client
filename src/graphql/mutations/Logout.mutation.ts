import { gql } from "urql";

export const LogoutMutation = gql`
  mutation Logout {
    logout
  }
`;
