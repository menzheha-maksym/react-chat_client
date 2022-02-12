import React, { FormEvent, useState } from "react";
import { Button, Form, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { gql, useMutation } from "urql";

const RegisterMutaion = gql`
  mutation Register($input: UserInput!) {
    register(input: $input) {
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

const Register: React.FC = () => {
  const usernameRef = React.createRef<HTMLInputElement>();
  const passwordRef = React.createRef<HTMLInputElement>();

  const [{ fetching }, register] = useMutation(RegisterMutaion);

  const [errors, setErrors] = useState<{ field: string; message: string }>();

  const navigate = useNavigate();

  const onRegisterSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const input = {
      username: usernameRef.current?.value,
      password: passwordRef.current?.value,
    };
    const response = await register({ input });

    if (response.data.register.errors) {
      setErrors(response.data.register.errors[0]);
    } else if (response.data.register.user) {
      navigate("/d", { replace: true });
    }
  };

  return (
    <>
      <Container className="w-100">
        <Form onSubmit={onRegisterSubmit}>
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
              Register
            </Button>
            <Button
              disabled={fetching}
              variant="primary"
              onClick={() => {
                navigate("/Login", { replace: true });
              }}
            >
              Login
            </Button>
          </Container>
        </Form>
      </Container>
    </>
  );
};

export default Register;
