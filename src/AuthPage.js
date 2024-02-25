import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthPage = ({ authType, setAuthenticated }) => {
  const navigate = useNavigate(); // Use the useNavigate hook to get the navigate function

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/auth/${authType}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      }
    );
    const data = await response.json();
    if (response.ok) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.userId); // Set user ID in localStorage
      setAuthenticated(true); // Set authentication state to true
      navigate("/documents"); // Redirect to the DocumentsPage
    } else {
      console.error(data.error);
      // Handle error (e.g., display error message)
    }
  };

  return (
    <div>
      <h2>{authType === "signup" ? "Sign Up" : "Log In"}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">
          {authType === "signup" ? "Sign Up" : "Log In"}
        </button>
      </form>
    </div>
  );
};

export default AuthPage;
