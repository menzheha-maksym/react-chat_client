import React, { FormEvent, useEffect, useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { useGetUserByUsernameQuery, UserType } from "../generated/graphql";

interface UserSearchProps {
  foundUser: (user: UserType | null) => void;
}

export const UserSearch: React.FC<UserSearchProps> = ({ foundUser }) => {
  const usernameRef = React.createRef<HTMLInputElement>();

  const [username, setUsername] = useState<string>();
  const [isSearch, setIsSearch] = useState(false);
  const [error, setError] = useState<string>();

  const [{ data, fetching }] = useGetUserByUsernameQuery({
    pause: !isSearch,
    variables: {
      username: username!,
    },
  });

  useEffect(() => {
    if (data?.getUserByUsername === null) {
      setError("user does not exist");
      foundUser(null);
    } else if (data?.getUserByUsername) {
      setError("");
      foundUser(data.getUserByUsername);
    }
  }, [data, foundUser]);

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (usernameRef.current!.value.length > 3) {
      setUsername(usernameRef.current?.value);
      setIsSearch(true);
    } else {
      setError("");
    }
  };

  return (
    <Container className="mt-3 mb-3">
      <Form className="d-flex" onSubmit={onSubmit}>
        <Form.Control
          type="search"
          className="me-3"
          placeholder="Find user"
          aria-label="Find User"
          ref={usernameRef}
        />
        <Button disabled={fetching} type="submit" variant="outline-success">
          Search
        </Button>
      </Form>
      {error ? (
        <Alert className="mt-3" variant="danger">
          {error}
        </Alert>
      ) : null}
    </Container>
  );
};
