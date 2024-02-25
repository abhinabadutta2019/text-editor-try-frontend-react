// TextDocument.js
import React, { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import io from "socket.io-client";
import "./TextDocument.css";

const TextDocument = () => {
  const { id: roomId } = useParams();
  const [text, setText] = useState("");
  const [socket, setSocket] = useState(null);
  const [userId, setUserId] = useState(""); // New state to hold user ID
  const [documentExists, setDocumentExists] = useState(true); // State to track if the document exists

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/documents/${roomId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          // If the document exists, set documentExists to true
          setDocumentExists(true);
          const data = await response.json();
          setText(data.content);
        } else {
          // If the document doesn't exist, set documentExists to false
          setDocumentExists(false);
          console.error("Document not found");
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      }
    };

    fetchDocument();
  }, [roomId]);

  useEffect(() => {
    if (documentExists) {
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
    }
  }, [roomId, documentExists]);

  // If the document doesn't exist, navigate to the 404 page
  if (!documentExists) {
    return <Navigate to="/404" />;
  }

  const handleTextChange = (event) => {
    setText(event.target.value);
    socket.emit("textChange", {
      roomId,
      newText: event.target.value,
      userId,
    }); // Send user ID along with text change
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
