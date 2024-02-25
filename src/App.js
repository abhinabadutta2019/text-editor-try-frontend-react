// App.js

import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import TextDocument from "./TextDocument";
import AuthPage from "./AuthPage";
import DocumentsPage from "./DocumentsPage"; // Import the DocumentsPage component
import { v4 as uuidv4 } from "uuid";

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [documentId, setDocumentId] = useState("");

  // Check if the user is authenticated on component mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuthenticated(true);
      let storedDocumentId = localStorage.getItem("documentId");
      if (!storedDocumentId) {
        storedDocumentId = uuidv4();
        localStorage.setItem("documentId", storedDocumentId);
      }
      setDocumentId(storedDocumentId);
    }
  }, []);

  return (
    <Router>
      <Routes>
        {/* Redirect to login page if not authenticated */}
        {!authenticated && (
          <Route path="/" element={<Navigate to="/login" />} />
        )}

        {/* Route for login page */}
        <Route
          path="/login"
          element={
            <AuthPage authType="login" setAuthenticated={setAuthenticated} />
          }
        />

        {/* Route for signup page */}
        <Route
          path="/signup"
          element={
            <AuthPage authType="signup" setAuthenticated={setAuthenticated} />
          }
        />

        {/* Route for document */}
        {authenticated && (
          <>
            <Route path="/" element={<Navigate to="/documents" />} />{" "}
            {/* Redirect to DocumentsPage */}
            <Route path="/documents" element={<DocumentsPage />} />{" "}
            {/* Route for DocumentsPage */}
            <Route path="/documents/:id" element={<TextDocument />} />{" "}
            {/* Route for individual document */}
          </>
        )}

        {/* Route for 404 page */}
        <Route path="*" element={<h1>404 - Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
