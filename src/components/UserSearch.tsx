import React, { FormEvent, useEffect, useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useGetUserByUsernameQuery } from "../generated/graphql";

export const UserSearch: React.FC = () => {
  const usernameRef = React.createRef<HTMLInputElement>();

  const [username, setUsername] = useState<string>();
  const [isSearch, setIsSearch] = useState(false);

  const [{ data, fetching }] = useGetUserByUsernameQuery({
    pause: !isSearch,
    variables: {
      username: username!,
    },
  });

  useEffect(() => {
    console.log(data);
  }, [data]);

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (usernameRef.current!.value.length > 3) {
      setUsername(usernameRef.current?.value);
      setIsSearch(true);
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
    </Container>
  );
};
