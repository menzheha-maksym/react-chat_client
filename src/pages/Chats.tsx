import React from "react";
import { Card, Container } from "react-bootstrap";
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

  //const navigate = useNavigate();

  if (meFetching || chatsFetching) {
    return <div>loading...</div>;
  }

  return (
    <>
      <Container className="w-100 d-flex justify-content-between">
        hello from chats page{" "}
        {!meFetching && data?.me ? data.me.username : null}
      </Container>
      {!chatsFetching && !chats?.findAllChatsByCurrentUserId ? (
        <div>there is no chats</div>
      ) : (
        <Container>
          {chats?.findAllChatsByCurrentUserId?.map((chat: any, i: any) => {
            let ids = chat.usersIds;
            for (let id of ids) {
              if (id !== data?.me?.id) {
                //return id;
                return (
                  <Card className="mb-2" key={i}>
                    <Card.Body>
                      <Card.Title>chat with user (username) {id}</Card.Title>
                      <Card.Text>last message: </Card.Text>
                    </Card.Body>
                  </Card>
                );
              }
            }
            return null;
          })}
        </Container>
      )}
    </>
  );
};

export default Chats;
