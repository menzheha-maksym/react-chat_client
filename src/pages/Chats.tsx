import React, { FormEvent } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { ChatCard } from "../components/ChatCard";
import {
  useFindAllChatsByCurrentUserIdQuery,
  useMeQuery,
} from "../generated/graphql";
import { useIsAuth } from "../utils/useIsAuth";

const Chats: React.FC = () => {
  useIsAuth();
  const usernameRef = React.createRef<HTMLInputElement>();

  const [{ data, fetching: meFetching }] = useMeQuery();
  const [{ data: chats, fetching: chatsFetching }] =
    useFindAllChatsByCurrentUserIdQuery();
  //const navigate = useNavigate();

  if (meFetching || chatsFetching) {
    return <Container>loading...</Container>;
  }
  return (
    <>
      <Container className="w-100 d-flex justify-content-between">
        hello from chats page{" "}
        {!meFetching && data?.me ? data.me.username : null}
      </Container>
      <Container className="mt-3 mb-3">
        <Form
          className="d-flex"
          onSubmit={(event: FormEvent) => {
            event.preventDefault();
            console.log(usernameRef.current?.value);
          }}
        >
          <Form.Control
            type="search"
            className="me-3"
            placeholder="Find user"
            aria-label="Find User"
            ref={usernameRef}
          />
          <Button type="submit" variant="outline-success">
            Search
          </Button>
        </Form>
      </Container>
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
