import React from "react";
import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "urql";
import { LogoutMutation } from "../graphql/mutations/Logout.mutation";
import { MeQuery } from "../graphql/queries/Me.query";
import { useIsAuth } from "../utils/useIsAuth";

const Dashboard: React.FC = () => {
  // 2 me queries in a row... will fix it later... or not,
  // it looks like its cached
  useIsAuth();
  const [{ data, fetching: meFetching }] = useQuery({
    query: MeQuery,
  });

  const [{ fetching: logoutFetching }, logout] = useMutation(LogoutMutation);

  const navigate = useNavigate();

  if (meFetching || logoutFetching) {
    return <div>loading...</div>;
  }

  return (
    <>
      <Container className="mt-2 w-100 d-flex justify-content-between">
        hello {!meFetching && data.me ? data.me.username : null}
        <div>
          <Button
            disabled={logoutFetching}
            variant="danger"
            className="mx-4"
            onClick={async () => {
              navigate("/chats", { replace: true });
            }}
          >
            Chats
          </Button>
          <Button
            disabled={logoutFetching}
            variant="primary"
            className=""
            onClick={async () => {
              await logout();
              navigate("/login", { replace: true });
            }}
          >
            Logout
          </Button>
        </div>
      </Container>
    </>
  );
};

export default Dashboard;
