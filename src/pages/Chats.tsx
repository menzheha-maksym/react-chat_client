import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useQuery } from "urql";
import { FindAllChatsByCurrentUserId } from "../graphql/queries/FindAllChatsByCurrentUserId";
import { MeQuery } from "../graphql/queries/Me.query";
import { useIsAuth } from "../utils/useIsAuth";

const Chats: React.FC = () => {
  useIsAuth();
  const [{ data, fetching: meFetching }, findChats] = useQuery({
    query: MeQuery,
  });
  const [{ data: chats, fetching: chatsFetching }] = useQuery({
    query: FindAllChatsByCurrentUserId,
  });

  //const navigate = useNavigate();

  useEffect(() => {
    findChats();
  }, [findChats]);

  // useEffect(() => {
  // fetch participant user id
  // })

  if (meFetching || chatsFetching) {
    return <div>loading...</div>;
  }

  return (
    <>
      <Container className="w-100 d-flex justify-content-between">
        hello from chats page {!meFetching && data.me ? data.me.username : null}
      </Container>
      {!chatsFetching && !chats.findAllChatsByCurrentUserId ? (
        <div>there is no chats</div>
      ) : (
        <div>
          <div>there is chats</div>
          chat with user ID{" "}
          {chats.findAllChatsByCurrentUserId.map((chat: any, i: any) => {
            let ids = chat.usersIds;
            for (let id of ids) {
              if (id !== data.me.id) {
                return id;
              }
            }
          })}
        </div>
      )}
    </>
  );
};

export default Chats;
