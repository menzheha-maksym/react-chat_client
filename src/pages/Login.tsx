import React, { FormEvent, useState } from "react";
import { Button, Form, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useMutation } from "urql";
import { LoginMutaion } from "../graphql/mutations/Login.mutation";

const Login: React.FC = () => {
  const usernameRef = React.createRef<HTMLInputElement>();
  const passwordRef = React.createRef<HTMLInputElement>();

  const [{ fetching }, login] = useMutation(LoginMutaion);

  const [errors, setErrors] = useState<{ field: string; message: string }>();

  const navigate = useNavigate();

  const onLoginSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const input = {
      username: usernameRef.current?.value,
      password: passwordRef.current?.value,
    };
    const response = await login({ input });

    if (response.data.login.errors) {
      setErrors(response.data.login.errors[0]);
    } else if (response.data.login.user) {
      navigate("/d", { replace: true });
    }
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
          <Container className="mt-3 d-flex justify-content-between">
            <Button disabled={fetching} variant="primary" type="submit">
              Login
            </Button>
            <Button
              disabled={fetching}
              variant="primary"
              onClick={() => {
                navigate("/register", { replace: true });
              }}
            >
              Register
            </Button>
          </Container>
        </Form>
      </Container>
    </>
  );
};

export default Login;
