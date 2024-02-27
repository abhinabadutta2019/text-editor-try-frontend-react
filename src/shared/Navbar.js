import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";

const CustomNavbar = () => {
  const { authenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/auth"); // Redirect to the auth page after logout
  };

  // Render nothing if the user is not authenticated
  if (!authenticated) {
    return null;
  }

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand>
          <Link to="/">🧩ScribbleSpace</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            {authenticated && (
              <Nav.Link as={Link} to="/documents">
                Documents
              </Nav.Link>
            )}
          </Nav>
          <Nav>
            {authenticated ? (
              <Nav.Link onClick={handleLogout} style={{ color: "red" }}>
                Logout
              </Nav.Link>
            ) : (
              <Nav.Link as={Link} to="/auth">
                Login
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
