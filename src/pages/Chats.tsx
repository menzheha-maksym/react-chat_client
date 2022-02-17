import React, { useEffect, useState } from "react";
import { Button, Card, Container } from "react-bootstrap";
import { ChatCard } from "../components/ChatCard";
import { UserSearch } from "../components/UserSearch";
import {
  useFindAllChatsByCurrentUserIdQuery,
  useFindChatWithTwoUsersByUserIdsQuery,
  useMeQuery,
  UserType,
} from "../generated/graphql";
import { useIsAuth } from "../utils/useIsAuth";

const Chats: React.FC = () => {
  useIsAuth();

  const [foundUser, setFoundUser] = useState<UserType | null>(null);
  const [foundUserId, setFoundUserId] = useState<string>();
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
        userId2: foundUserId!,
      },
    });

  const updateFoundUser = (user: UserType | null): void => {
    setFoundUser(user);
    setMeId(data?.me?.id);
  };

  useEffect(() => {
    if (foundUser) {
      setIsFound(true);
      setFoundUserId(foundUser.id);
    }
  }, [foundUser]);

  if (meFetching || chatsFetching) {
    return <Container>loading...</Container>;
  }

  return (
    <>
      <Container className="w-100 d-flex justify-content-between">
        hello from chats page{" "}
        {!meFetching && data?.me ? data.me.username : null}
      </Container>
      <UserSearch foundUser={updateFoundUser} />
      {!foundChatFetching &&
      foundChat?.findChatWithTwoUsersByUserIds?.chatId &&
      foundUser ? (
        <Container>
          <ChatCard
            userId={foundUser!.id}
            chatId={foundChat.findChatWithTwoUsersByUserIds.chatId.toString()}
          />
        </Container>
      ) : !foundChatFetching &&
        !foundChat?.findChatWithTwoUsersByUserIds &&
        foundUser ? (
        <Container>
          <Card>
            <Card.Body className="d-flex justify-content-between">
              <div>
                <Card.Title>{foundUser.username}</Card.Title>
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
