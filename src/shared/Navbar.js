// Navbar.js
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

const Navbar = () => {
  const { authenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/auth"); // Redirect to the auth page after logout
  };

  // Only render the Navbar if the user is authenticated
  if (!authenticated) {
    return null;
  }

  return (
    <nav>
      <h1>
        <Link to="/">GloryDocs</Link> {/* App name linked to home route */}
      </h1>
      <ul>
        <li>
          <Link to="/documents">Documents</Link>
        </li>
        <li>
          <button onClick={handleLogout}>Logout</button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
