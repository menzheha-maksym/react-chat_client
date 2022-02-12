import React, { FormEvent, useState } from "react";
import { Button, Form, Container } from "react-bootstrap";
import { gql, useMutation } from "urql";

const LoginMutaion = gql`
  mutation Login($input: UserInput!) {
    login(input: $input) {
      user {
        id
        username
      }
      errors {
        field
        message
      }
    }
  }
`;

const Login: React.FC = () => {
  const usernameRef = React.createRef<HTMLInputElement>();
  const passwordRef = React.createRef<HTMLInputElement>();

  const [, executeMutation] = useMutation(LoginMutaion);

  const [errors, setErrors] = useState<{ field: string; message: string }>();

  const onLoginSubmit = (e: FormEvent) => {
    e.preventDefault();

    const input = {
      username: usernameRef.current?.value,
      password: passwordRef.current?.value,
    };
    executeMutation({ input }).then((res) => {
      if (res.data.login.errors[0]) {
        setErrors(res.data.login.errors[0]);
      } else {
        //push user to ...
      }
    });

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
            {errors && errors.field === "username" ? (
              <Form.Text className="text-danger">{errors.message}</Form.Text>
            ) : null}
          </Form.Group>
          <Form.Group className="mt-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="text"
              placeholder="password"
              ref={passwordRef}
            />
            {errors && errors.field === "password" ? (
              <Form.Text className="text-danger">{errors.message}</Form.Text>
            ) : null}
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
