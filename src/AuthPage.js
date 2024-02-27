import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const AuthPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isSignUp, setIsSignUp] = useState(false);

  const authType = isSignUp ? "signup" : "login";

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
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

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error);
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.userId);
      login();
      navigate("/documents");
    } catch (error) {
      console.error(error);
      if (error.message.includes("Username or password is too short")) {
        alert("Username or password is too short");
      } else if (error.message.includes("Username already exists")) {
        alert("Username already exists");
      } else if (error.message.includes("Invalid password")) {
        alert("Invalid password");
      } else {
        alert("Signup/Login failed");
      }
    }
  };

  return (
    <div>
      <h2>🧩 ScribbleSpace {isSignUp ? "Sign Up" : "Log In"}</h2>
      <button onClick={() => setIsSignUp(!isSignUp)}>
        {isSignUp
          ? "Already have an account? Log In"
          : "Don't have an account? Sign Up"}
      </button>
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
        <button type="submit">{isSignUp ? "Sign Up" : "Log In"}</button>
      </form>
    </div>
  );
};

export default AuthPage;
