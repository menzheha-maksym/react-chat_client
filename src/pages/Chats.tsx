import React, { useEffect, useState } from "react";
import { Button, Card, Container } from "react-bootstrap";
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
  const [foundUsername, setFoundUsername] = useState<string>();
  const [isFound, setIsFound] = useState(false);
  const [meId, setMeId] = useState<string>();

  const [{ data, fetching: meFetching }] = useMeQuery();
  const [{ data: chats, fetching: chatsFetching }] =
    useFindAllChatsByCurrentUserIdQuery();
  const [{ data: foundChat, fetching: foundChatFetching }] =
    useFindChatWithTwoUsersByUserIdsQuery({
      pause: !isFound,
      variables: {
        userId1: meId!,
        userId2: foundId!,
      },
    });

  const updateFoundId = (id: string): void => {
    setFoundId(id);
  };
  const updateFoundUsername = (username: string): void => {
    setFoundUsername(username);
  };

  useEffect(() => {
    if (foundId) {
      setIsFound(true);
    }
  }, [foundId]);

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
      <UserSearch foundId={updateFoundId} foundUsername={updateFoundUsername} />
      {!foundChatFetching &&
      foundChat?.findChatWithTwoUsersByUserIds?.chatId ? (
        <Container>
          <ChatCard
            userId={foundId!}
            chatId={foundChat.findChatWithTwoUsersByUserIds.chatId.toString()}
          />
        </Container>
      ) : !foundChatFetching &&
        !foundChat?.findChatWithTwoUsersByUserIds &&
        foundId ? (
        <Container>
          <Card>
            <Card.Body className="d-flex justify-content-between">
              <div>
                <Card.Title>{foundUsername}</Card.Title>
                <Card.Text>you do not have chat with this user</Card.Text>
              </div>
              <Button>Start new Chat</Button>
            </Card.Body>
          </Card>
        </Container>
      ) : !chatsFetching && !chats?.findAllChatsByCurrentUserId ? (
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
