import React from "react";
import { Container } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import { Provider } from "urql";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { createUrqlClient } from "./utils/createUrqlClient";

function App() {
  return (
    <Provider value={createUrqlClient}>
      <Container fluid>
        <Routes>
          <Route path="/d" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Container>
    </Provider>
  );
}

export default App;
