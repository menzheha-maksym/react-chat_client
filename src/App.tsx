import React from "react";
import { Container } from "react-bootstrap";
import { Provider } from "urql";
import Login from "./pages/Login";
import { createUrqlClient } from "./utils/createUrqlClient";

function App() {
  return (
    <Provider value={createUrqlClient}>
      <Container fluid>
        <Login />
      </Container>
    </Provider>
  );
}

export default App;
