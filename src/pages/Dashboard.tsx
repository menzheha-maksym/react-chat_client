import React from "react";
import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { gql, useMutation } from "urql";
import { useIsAuth } from "../utils/useIsAuth";

const LogoutMutation = gql`
  mutation Logout {
    logout
  }
`;

const Dashboard: React.FC = () => {
  useIsAuth();

  const [{ fetching }, logout] = useMutation(LogoutMutation);

  const navigate = useNavigate();

  return (
    <>
      <Container className="w-100">
        hello
        <Button
          disabled={fetching}
          variant="primary"
          className="w-100"
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
