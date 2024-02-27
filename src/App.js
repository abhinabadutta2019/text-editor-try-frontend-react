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
        <Route
          path="/login"
          element={
            authenticated ? (
              <Navigate to="/documents" />
            ) : (
              <AuthPage authType="login" />
            )
          }
        />

        {/* Route for signup page */}
        <Route
          path="/signup"
          element={
            authenticated ? (
              <Navigate to="/documents" />
            ) : (
              <AuthPage authType="signup" />
            )
          }
        />

        {/* Route for authenticated users */}
        <Route
          path="/documents"
          element={authenticated ? <DocumentsPage /> : <Navigate to="/login" />}
        />
        <Route path="/documents/:id" element={<TextDocument />} />

        {/* Route for 404 page */}
        <Route path="*" element={<NotFound />} />

        {/* Route for home page */}
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
      </Routes>
    </Router>
  );
}

export default App;
