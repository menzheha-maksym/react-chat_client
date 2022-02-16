import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { ChatCard } from "../components/ChatCard";
import { UserSearch } from "../components/UserSearch";
import {
  useFindAllChatsByCurrentUserIdQuery,
  useMeQuery,
} from "../generated/graphql";
import { useIsAuth } from "../utils/useIsAuth";

const Chats: React.FC = () => {
  useIsAuth();

  const [{ data, fetching: meFetching }] = useMeQuery();
  const [{ data: chats, fetching: chatsFetching }] =
    useFindAllChatsByCurrentUserIdQuery();

  const [foundUsername, setFoundUsername] = useState<string>();

  const updateFoundUsername = (username: string): void => {
    setFoundUsername(username);
  };

  if (meFetching || chatsFetching) {
    return <Container>loading...</Container>;
  }
  return (
    <>
      <Container className="w-100 d-flex justify-content-between">
        hello from chats page{" "}
        {!meFetching && data?.me ? data.me.username : null}
      </Container>
      <UserSearch foundUsername={updateFoundUsername} />
      {!chatsFetching && !chats?.findAllChatsByCurrentUserId ? (
        <div>there is no chats</div>
      ) : (
        <Container>
          {chats?.findAllChatsByCurrentUserId?.map(
            (chat: any, index: number) => {
              for (let id of chat.usersIds) {
                if (data?.me?.id.localeCompare(id)) {
                  return (
                    <ChatCard key={index} userId={id} chatId={chat.chatId} />
                  );
                }
              }
              return null;
            }
          )}
        </Container>
      )}
    </>
  );
};

export default Chats;
