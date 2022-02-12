import React from "react";
import { Container } from "react-bootstrap";
import { useIsAuth } from "../utils/useIsAuth";

const Dashboard: React.FC = () => {
  useIsAuth();
  return (
    <>
      <Container className="w-100">hello</Container>
    </>
  );
};

export default Dashboard;
