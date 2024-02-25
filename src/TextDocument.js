// TextDocument.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import "./TextDocument.css";

const TextDocument = () => {
  const { id: roomId } = useParams();
  const [text, setText] = useState("");
  const [socket, setSocket] = useState(null);
  const [userId, setUserId] = useState(""); // New state to hold user ID
  useEffect(() => {
    const socketIo = io("http://localhost:3003");
    const userId = localStorage.getItem("userId"); // Get user ID from local storage
    setUserId(userId);

    socketIo.emit("joinRoom", roomId, userId); // Pass userId to the backend

    socketIo.on("updateText", (data) => {
      setText(data);
    });

    setSocket(socketIo);

    return () => {
      socketIo.disconnect();
    };
  }, [roomId]);

  const handleTextChange = (event) => {
    setText(event.target.value);
    socket.emit("textChange", { roomId, newText: event.target.value, userId }); // Send user ID along with text change
  };

  return (
    <div className="text-document-container">
      <h2 className="document-title">Text Document</h2>
      <textarea
        className="custom-textarea"
        value={text}
        onChange={handleTextChange}
      />
    </div>
  );
};

export default TextDocument;
