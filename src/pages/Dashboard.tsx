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

  return (
    <>
      <Container className="w-100 d-flex justify-content-between">
        hello {!meFetching ? data.me.username : null}
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
      </Container>
    </>
  );
};

export default Dashboard;
