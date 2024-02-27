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
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

function App() {
  const { authenticated } = useAuth();

  return (
    <Router>
      {/* Render the Navbar component outside of the Routes */}
      <Navbar />

      <Routes>
        {/* Route for auth page */}
        <Route
          path="/auth"
          element={authenticated ? <Navigate to="/documents" /> : <AuthPage />}
        />

        {/* Route for authenticated users */}
        <Route
          path="/documents"
          element={authenticated ? <DocumentsPage /> : <Navigate to="/auth" />}
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
              <Navigate to="/auth" />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
