import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import TextDocument from "./TextDocument";
import { v4 as uuidv4 } from "uuid";

function App() {
  return (
    <Router>
      <Routes>
        {/* Route for the root URL */}
        <Route path="/" element={<Navigate to={`/documents/${uuidv4()}`} />} />
        <Route path="/documents/:id" element={<TextDocument />} />
      </Routes>
    </Router>
  );
}

export default App;
