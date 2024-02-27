import { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import io from "socket.io-client";
import "./TextDocument.css";
import { useAuth } from "./AuthContext";
import ShareButton from "./components/ShareButton";
import { FaCopy } from "react-icons/fa";

const TextDocument = () => {
  const { id: roomId } = useParams();
  const [text, setText] = useState("");
  const [socket, setSocket] = useState(null);
  const { authenticated } = useAuth();
  const [copied, setCopied] = useState(false);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const socketIo = io("http://localhost:3003");

    socketIo.emit("joinRoom", {
      roomId,
      userId: localStorage.getItem("userId"),
    });

    socketIo.on("updateText", (data) => {
      setText(data);
    });

    socketIo.on("documentNotFound", () => {
      setNotFound(true);
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
    });
  };

  const handleCopyToClipboard = () => {
    const currentURL = window.location.href;

    navigator.clipboard
      .writeText(currentURL)
      .then(() => {
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, 2000);
      })
      .catch((error) => {
        console.error("Error copying to clipboard:", error);
      });
  };

  if (notFound) {
    return <Navigate to="/404" />;
  }

  return (
    <div className="text-document-container">
      <h2 className="document-title">Text Document</h2>
      <ShareButton />
      <p>Copy to clipboard</p>
      <button className="copy-url-btn" onClick={handleCopyToClipboard}>
        <FaCopy />
      </button>
      {copied && <p className="confirmation-message">URL Copied!</p>}
      <textarea
        className="custom-textarea"
        value={text}
        onChange={handleTextChange}
        disabled={!authenticated}
      />
    </div>
  );
};

export default TextDocument;
