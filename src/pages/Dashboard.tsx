import React from "react";
import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useMutation } from "urql";
import { LogoutMutation } from "../graphql/mutations/Logout.mutation";
import { useIsAuth } from "../utils/useIsAuth";

const Dashboard: React.FC = () => {
  useIsAuth();

  const [{ fetching }, logout] = useMutation(LogoutMutation);

  const navigate = useNavigate();

  return (
    <>
      <Container className="w-100 d-flex justify-content-between">
        hello
        <Button
          disabled={fetching}
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
