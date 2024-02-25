import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import "./TextDocument.css";

const TextDocument = () => {
  const { id: roomId } = useParams();
  const [text, setText] = useState("");
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socketIo = io("http://localhost:3003");

    socketIo.emit("joinRoom", roomId); // Join the room for the document ID

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
    socket.emit("textChange", { roomId, newText });
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
