import React from "react";
import { Container } from "react-bootstrap";
import { useQuery } from "urql";
import { MeQuery } from "../graphql/queries/Me.query";
import { useIsAuth } from "../utils/useIsAuth";

const Dashboard: React.FC = () => {
  // 2 me queries in a row... will fix it later... or not,
  // it looks like its cached
  useIsAuth();
  const [{ data, fetching: meFetching }] = useQuery({
    query: MeQuery,
  });

  if (meFetching) {
    return <div>loading...</div>;
  }

  return (
    <>
      <Container className="w-100 d-flex justify-content-between">
        hello {!meFetching && data.me ? data.me.username : null}
      </Container>
    </>
  );
};

export default Dashboard;
