import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import "./TextDocument.css";
import { useAuth } from "./AuthContext"; // Import useAuth hook
import ShareButton from "./components/ShareButton"; // Import the ShareButton component
import { FaCopy } from "react-icons/fa"; // Import the copy icon from react-icons

const TextDocument = () => {
  const { id: roomId } = useParams();
  const [text, setText] = useState("");
  const [socket, setSocket] = useState(null);
  const { authenticated } = useAuth(); // Get authenticated user information
  const [copied, setCopied] = useState(false); // State to track if URL is copied

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

  const handleCopyToClipboard = () => {
    const currentURL = window.location.href;

    // Use the Clipboard API to copy the current URL to the clipboard
    navigator.clipboard
      .writeText(currentURL)
      .then(() => {
        console.log("URL copied to clipboard");
        setCopied(true); // Update state to indicate URL is copied
        setTimeout(() => {
          setCopied(false); // Reset state after 2 seconds
        }, 2000); // Reset after 2 seconds
      })
      .catch((error) => {
        console.error("Error copying to clipboard:", error);
      });
  };

  return (
    <div className="text-document-container">
      <h2 className="document-title">Text Document</h2>
      <ShareButton /> {/* Render the ShareButton component */}
      <p>Copy to clip board</p>
      <button className="copy-url-btn" onClick={handleCopyToClipboard}>
        <FaCopy />
      </button>
      {copied && <p className="confirmation-message">URL Copied!</p>}
      <textarea
        className="custom-textarea"
        value={text}
        onChange={handleTextChange}
        disabled={!authenticated} // Disable textarea if the user is not authenticated
      />
    </div>
  );
};

export default TextDocument;
