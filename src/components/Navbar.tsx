import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";

export const NavBar: React.FC = () => {
  const [{ data, fetching: meFetching }] = useMeQuery();

  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();

  const navigate = useNavigate();

  let body = null;

  if (meFetching) {
  } else if (!data?.me) {
  } else {
    body = (
      <>
        <Button
          disabled={logoutFetching}
          variant="primary"
          className=""
          onClick={async () => {
            await logout();
            data.me = null; //////////////////////////////// todo: invalidate cache
            navigate("/login", { replace: true });
          }}
        >
          Logout
        </Button>
      </>
    );
  }

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/d">React</Navbar.Brand>
        <Nav>{body}</Nav>
      </Container>
    </Navbar>
  );
};
