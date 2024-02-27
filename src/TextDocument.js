import { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import io from "socket.io-client";
import { useAuth } from "./AuthContext";
import ShareButton from "./components/ShareButton";

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
    <div className="container mt-5 bg-light p-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h2 className="document-title text-center mb-4 mt-0">
            Scribble Text
          </h2>
          <ShareButton
            handleCopyToClipboard={handleCopyToClipboard}
            copied={copied}
          />
          <textarea
            className="form-control mt-4"
            value={text}
            onChange={handleTextChange}
            disabled={!authenticated}
            style={{
              width: "100%",
              height: "600px", // Adjusted height to be similar to Google Docs
              maxWidth: "8.26in",
              maxHeight: "11.69in",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default TextDocument;
