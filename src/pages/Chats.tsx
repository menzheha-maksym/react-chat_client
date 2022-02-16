import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { ChatCard } from "../components/ChatCard";
import { UserSearch } from "../components/UserSearch";
import {
  useFindAllChatsByCurrentUserIdQuery,
  useFindChatWithTwoUsersByUserIdsQuery,
  useMeQuery,
} from "../generated/graphql";
import { useIsAuth } from "../utils/useIsAuth";

const Chats: React.FC = () => {
  useIsAuth();

  const [foundId, setFoundId] = useState<string>();
  const [isFound, setIsFound] = useState(false);
  const [meId, setMeId] = useState<string>();

  const [{ data, fetching: meFetching }] = useMeQuery();
  const [{ data: chats, fetching: chatsFetching }] =
    useFindAllChatsByCurrentUserIdQuery();
  const [{ data: foundChat }] = useFindChatWithTwoUsersByUserIdsQuery({
    pause: !isFound,
    variables: {
      userId1: meId!,
      userId2: foundId!,
    },
  });

  const updateFoundId = (username: string): void => {
    setFoundId(username);
  };

  useEffect(() => {
    if (foundId) {
      setIsFound(true);
      console.log(foundChat);
    }
  }, [foundId, foundChat]);

  useEffect(() => {
    if (data?.me?.id) {
      setMeId(data.me.id);
    }
  }, [data?.me?.id]);

  if (meFetching || chatsFetching) {
    return <Container>loading...</Container>;
  }

  return (
    <>
      <Container className="w-100 d-flex justify-content-between">
        hello from chats page{" "}
        {!meFetching && data?.me ? data.me.username : null}
      </Container>
      <UserSearch foundId={updateFoundId} />
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
