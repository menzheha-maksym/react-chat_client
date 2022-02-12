import React, { FormEvent } from "react";
import { Button, Form, Container } from "react-bootstrap";

const Login: React.FC = () => {
  const usernameRef = React.createRef<HTMLInputElement>();
  const passwordRef = React.createRef<HTMLInputElement>();

  const onLoginSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("username: ", usernameRef.current?.value);
    console.log("password: ", passwordRef.current?.value);
  };

  return (
    <>
      <Container className="w-100">
        <Form onSubmit={onLoginSubmit}>
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="enter username"
              ref={usernameRef}
            />
          </Form.Group>
          <Form.Group className="mt-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="text"
              placeholder="password"
              ref={passwordRef}
            />
          </Form.Group>
          <Button className="mt-3" variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default Login;
