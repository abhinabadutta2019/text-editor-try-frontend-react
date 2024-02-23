import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import "./TextDocument.css"; // Import CSS file for styling

const TextDocument = () => {
  const { id: roomId } = useParams(); // Get the roomId from URL params
  const [text, setText] = useState(""); // State to hold the text content of the document
  const [socket, setSocket] = useState(null); // State to hold the socket connection

  useEffect(() => {
    // Establish socket connection
    const socketIo = io("http://localhost:3003");

    // Emit 'joinRoom' event with roomId when component mounts
    socketIo.emit("joinRoom", roomId);

    // Listen for 'updateText' event and update the text state
    socketIo.on("updateText", (data) => {
      setText(data);
    });

    // Set the socket state
    setSocket(socketIo);

    // Clean up socket connection on component unmount
    return () => {
      socketIo.disconnect();
    };
  }, [roomId]); // Dependency array ensures this effect runs only when roomId changes

  // Function to handle text changes and emit 'textChange' event to the server
  const handleTextChange = (event) => {
    setText(event.target.value); // Update text state
    socket.emit("textChange", { roomId, newText: event.target.value }); // Emit 'textChange' event
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
