import { gql } from "urql";

export const MeQuery = gql`
  query Me {
    me {
      id
      username
    }
  }
`;
