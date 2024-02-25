// App.js

import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import TextDocument from "./TextDocument";
import AuthPage from "./AuthPage";
import DocumentsPage from "./DocumentsPage";
import NotFound from "./NotFound";
import { useAuth } from "./AuthContext";
import Navbar from "./shared/Navbar"; // Import the Navbar component

function App() {
  const { authenticated } = useAuth();

  return (
    <Router>
      {/* Render the Navbar component outside of the Routes */}
      <Navbar />

      <Routes>
        {/* Route for login page */}
        <Route path="/login" element={<AuthPage authType="login" />} />

        {/* Route for signup page */}
        <Route path="/signup" element={<AuthPage authType="signup" />} />

        {/* Routes for authenticated users */}
        <Route
          path="/"
          element={
            authenticated ? (
              <Navigate to="/documents" />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/documents" element={<DocumentsPage />} />
        <Route path="/documents/:id" element={<TextDocument />} />

        {/* Route for 404 page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
