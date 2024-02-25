import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import "./TextDocument.css";
import { useAuth } from "./AuthContext"; // Import useAuth hook

const TextDocument = () => {
  const { id: roomId } = useParams();
  const [text, setText] = useState("");
  const [socket, setSocket] = useState(null);
  const { authenticated } = useAuth(); // Get authenticated user information

  useEffect(() => {
    const socketIo = io("http://localhost:3003");

    socketIo.emit("joinRoom", {
      roomId,
      userId: localStorage.getItem("userId"),
    }); // Pass user ID to the server

    socketIo.on("updateText", (data) => {
      setText(data);
    });

    setSocket(socketIo);

    return () => {
      socketIo.disconnect();
    };
  }, [roomId]);

  const handleTextChange = (event) => {
    const newText = event.target.value;
    setText(newText);
    socket.emit("textChange", {
      roomId,
      newText,
      userId: localStorage.getItem("userId"),
    }); // Pass user ID to the server
  };

  return (
    <div className="text-document-container">
      <h2 className="document-title">Text Document</h2>
      <textarea
        className="custom-textarea"
        value={text}
        onChange={handleTextChange}
        disabled={!authenticated} // Disable textarea if user is not authenticated
      />
    </div>
  );
};

export default TextDocument;
