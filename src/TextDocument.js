import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import "./TextDocument.css";

const TextDocument = () => {
  const { id: roomId } = useParams(); // Use 'id' as the parameter name instead of 'roomId'
  const [text, setText] = useState("");
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socketIo = io("http://localhost:3003");
    socketIo.emit("joinRoom", roomId);

    socketIo.on("updateText", (data) => {
      setText(data);
    });

    setSocket(socketIo);

    return () => {
      socketIo.disconnect();
    };
  }, [roomId]); // Add roomId as a dependency to useEffect

  const handleTextChange = (event) => {
    setText(event.target.value);
    socket.emit("textChange", { roomId, newText: event.target.value });
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
