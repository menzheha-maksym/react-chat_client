import { gql } from "urql";

export const MessagesByChatId = gql`
  query MessagesByChatId($id: Int!) {
    messagesByChatId(chatId: $id) {
      messageId
      text
      senderId
      chatId
    }
  }
`;
