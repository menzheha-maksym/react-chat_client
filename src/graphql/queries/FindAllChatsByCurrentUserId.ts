import { gql } from "urql";

export const FindAllChatsByCurrentUserId = gql`
  query FindAllChatsByCurrentUserId {
    findAllChatsByCurrentUserId {
      chatId
      usersIds
    }
  }
`;
