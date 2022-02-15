import React from "react";
import { Container } from "react-bootstrap";
import { Navigate, Route, Routes } from "react-router-dom";
import { Provider } from "urql";
import { NavBar } from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { createUrqlClient } from "./utils/createUrqlClient";

function App() {
  return (
    <Provider value={createUrqlClient}>
      <Container fluid>
        <NavBar />
        <Routes>
          <Route path="/" element={<Navigate to="/d" />} />
          <Route path="/d" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Container>
    </Provider>
  );
}

export default App;
